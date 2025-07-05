---
title: ラズパイラックにKubernetesをインストールしてみる
publish_date: 2025-06-28
tags: [tech k8s]
draft: false
bsky_url: 
---

## 概要

引っ越しと同時に眠りについていた[夏休みの工作で作ったラズパイラック](/posts/2024-08-13_raspi-rack.md)を復活させたので、本来の目的であったKubernetesのインストールをやっていきます。

↓の参考記事の通りにやるだけなので、手順を確認したい方はオリジナルの記事を参照しましょう。

[3台のRaspberry Piで始める自宅Kubernetesクラスタの構築](https://qiita.com/adelie_pf/items/9321cd715771aeafe3ae)

[\[メモ\]k8sをraspberry pi 4にインストール\(2024/9月版\)](https://qiita.com/yoshiki9636/items/ee590ddf9096baa2fb71)

## 構築

### コンテナランタイムとKubernetesの導入

swapを無効化したり、必要なパッケージをインストールした後、`kubeadm init`で失敗してしまいます。

```bash
$ sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --cri-socket=unix:///var/run/crio/crio.sock --apiserver-advertise-address=192.168.50.1 --control-plane-endpoint=behemoth.local

error execution phase preflight: [preflight] Some fatal errors occurred:
    [ERROR SystemVerification]: missing required cgroups: memory
[preflight] If you know what you are doing, you can make a check non-fatal with --ignore-preflight-errors=...
To see the stack trace of this error execute with --v=5 or higher
```

Claude先生に質問した結果、`/boot/firmware/cmdline.txt`に`cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory`を追加して再起動せよとのこと。

結果、無事起動しなくなりました。あれー？

`cgroup_enable=cpuset`だけ削除してあげたら無事起動して、`kubeadm init`も成功しました。

再現性を持たせたかったのでここまでAnsibleで頑張っていましたが、stdout有効にしてなかったのでtokenなどが確認できず…ここから手動でトライ&エラーが始まります。

```bash
$ sudo kubeadm token list
$ openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex
```

workerノードで`kubeadm join`を実行します。

```bash
$ sudo kubeadm join behemoth.local:6443 --token xxxx --discovery-token-ca-cert-hash xxxxxxxxx
[preflight] Running pre-flight checks
    [WARNING Swap]: swap is supported for cgroup v2 only. The kubelet must be properly configured to use swap. Please refer to https://kubernetes.io/docs/concepts/architecture/nodes/#swap-memory, or disable swap on the node
    [WARNING SystemVerification]: missing optional cgroups: hugetlb
error execution phase preflight: couldn't validate the identity of the API Server: failed to request the cluster-info ConfigMap: Get "https://behemoth.local:6443/api/v1/namespaces/kube-public/configmaps/cluster-info?timeout=10s": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
To see the stack trace of this error execute with --v=5 or higher
```

Playbookの中でswapoffしていたはずが、うまく動いてなかったぽいので修正して再度実行。今度は名前解決できないようで失敗…

各ノードの`/etc/nsswitch.conf`の`hosts`行が`dns`に到達しないようになっていたのでそこを修正して再度実行。今度こそ成功。

一度`kubeadm join`を失敗した後は中途半端に生成されるファイルやディレクトリが原因で失敗し続けるので、`kubeadm reset`や`rm -rf /var/lib/kubelet`などを実行してから再度実行しました。本当にトライ&エラーばっかりだったので、結局何が効果があったのか不明のまま…痛恨です。

masterでkubectl get nodeしてもエラー

```bash
$ sudo kubectl get nodes
E0629 18:20:38.394636    7947 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server could not find the requested resource"
E0629 18:20:38.399868    7947 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server could not find the requested resource"
E0629 18:20:38.406190    7947 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server could not find the requested resource"
E0629 18:20:38.411674    7947 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server could not find the requested resource"
E0629 18:20:38.441069    7947 memcache.go:265] "Unhandled Error" err="couldn't get current server API group list: the server could not find the requested resource"
Error from server (NotFound): the server could not find the requested resource
```

一般ユーザにadmin.confコピーしたら↓

```bash
$ kubectl get node
NAME             STATUS     ROLES           AGE    VERSION
behemoth.local   NotReady   control-plane   151m   v1.33.2
box.local        NotReady   <none>          64m    v1.33.2
cyber.local      NotReady   <none>          86m    v1.33.2
```

ずっと`NotReady`のままなので`flannel`を導入します。

```bash
$ kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
```

box.localだけ永遠にstatusがnotreadyのままだったので、flannelのpodを再起動

```bash
$ kubectl get node
NAME             STATUS   ROLES           AGE    VERSION
behemoth.local   Ready    control-plane   3h7m   v1.33.2
box.local        Ready    <none>          100m   v1.33.2
cyber.local      Ready    <none>          122m   v1.33.2
```

workerノードにラベルをつけてクラスタの完成！

```bash
$ kubectl label node box.local node-role.kubernetes.io/worker=
node/box.local labeled
$ kubectl label node cyber.local node-role.kubernetes.io/worker=
node/cyber.local labeled
$ kubectl get node
NAME             STATUS   ROLES           AGE     VERSION
behemoth.local   Ready    control-plane   3h10m   v1.33.2
box.local        Ready    worker          103m    v1.33.2
cyber.local      Ready    worker          125m    v1.33.2
```

## テスト

### Kubernetes Dashboardのデプロイ

クラスタができあがったのでテストがてら[dashboard](https://github.com/kubernetes/dashboard)をデプロイしてみます。

リモートから操作したいのでkubeconfigをローカルのmacbookにコピーしてから以下を実行します。

```bash
$ export KUBECONFIG=/path/to/your/kubeconfig
$ brew install helm
$ helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
$ helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace kubernetes-dashboard
$ kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443
```

`port-forward`ってリモートから実行したら実行元のポートでアクセスできるようになるのすごい。

[サンプル](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)をみながら認証用のユーザーを作成します。

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin
  namespace: kubernetes-dashboard
```

適用してtokenを取得します。

```bash
$ kubectl apply -f admin-for-dashboard.yaml
$ kubectl create token admin -n kubernetes-dashboard
hogehoge
```

tokenの永続化のためのSecretも作成できます。

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
  annotations:
    kubernetes.io/service-account.name: "admin-user"
type: kubernetes.io/service-account-token
```

```bash
$ kubectl -f admin-secret-for-dashboard.yaml
$ kubectl get secret admin -n kubernetes-dashboard -o jsonpath='{.data.token}' | base64 -d
```

### Nginx Podのデプロイ

どの例を見ても必ず出てくるNginxのPodもデプロイしてみます。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: ryoo-example
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 4
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.29.0
        ports:
        - containerPort: 80
```

```bash
$ k get deployment -n ryoo-example
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   4/4     4            4           56s
$ k get replicaset -n ryoo-example
NAME                         DESIRED   CURRENT   READY   AGE
nginx-deployment-fbbd4cb64   4         4         4       66s
$ k get pod -n ryoo-example
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-fbbd4cb64-6pkjg   1/1     Running   0          75s
nginx-deployment-fbbd4cb64-bm424   1/1     Running   0          75s
nginx-deployment-fbbd4cb64-swmzp   1/1     Running   0          75s
nginx-deployment-fbbd4cb64-xh9wl   1/1     Running   0          75s
```

```bash
$ k -n ryoo-example port-forward pod/nginx-deployment-fbbd4cb64-6pkjg 8080:80
```

ブラウザで`http://localhost:8080`にアクセスしてNginxのデフォルトページが表示されます。

## 次回

`port-forward`でアクセスできるのは便利ですが、外部からアクセスする場合の推奨はIngressを使うことらしいのでIngressのお試しをやってみます。

あと入れるだけいれて無視している`flannnel`も試してみます。
