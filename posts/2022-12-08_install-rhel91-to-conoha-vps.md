---
title: ConoHaのVPS割引きっぷの割引が12/9までらしいのでVPS契約してRHEL9インストールする
publish_date: 2022-12-08
tags: [ConoHa, advent_calendar]
---

します。

## 概要

これは[「ConoHa Advent Calendar 2022」](https://qiita.com/advent-calendar/2022/conoha)8日目の記事です。

Advent Calendarなんて何年振りに書くかわかりませんが、このはちゃんが可愛いのと参加すると可愛い卓上カレンダーが貰えるらしいので書きます。

ConoHaでは現在[秋の超得キャンペーン](https://www.conoha.jp/campaign/chotoku2022/?btn_id=top--campaign_campaign-chotoku2022)を開催中で、VPSの全プランが最大75%(!)OFFになり、月額277円から契約が可能です。  
有効期間が36ヶ月のきっぷについてはメモリ4GBのプランが通常3608円/月のところ、なんと875円/月(支払額合計31,482円)なのです。安い。

割引終了までもうすぐですし、RHEL 9がリリースされたのにまだ触れてなかったので、VPS契約してRHELインストールまでやってみました。

Red Hat Developer Subscription for Individualsはすでに入手済、isoも入手済の前提で進めていきます。

なお、時間の関係上スクショがなく、少々味気ない感じになりました。

## サーバー追加

[ConoHaのコントロールパネル](https://manage.conoha.jp)にログインして、左上にある「サーバー追加」をクリックします。

VPS割引きっぷを「利用する」、有効期間を「36ヶ月」にすると各プランの料金が表示されます。安いですね。

イメージタイプにはCentOSやRocky Linux、AlmaLinuxなどあるものの、肝心のRHELは存在しません。デフォルトで用意されていないようなので、一旦は適当なOSを選択してVPSを作成します。

作成できたらシャットダウンしておきます。


## ISOダウンロード

どうやらAPIで外部のISOファイルを利用可能なようなので、curlでぽちぽちAPIを叩いていきます。

[ConoHa API Index](https://www.conoha.jp/docs/)があるので、これを参照します。

エンドポイントが色々ありますが、どれもtoken発行が前提なので、まずはtokenを発行します。  
発行にはテナントIDが必要なので、ConoHa コントロールパネルの「API」->「テナント情報」からテナントIDを入手します。

また、APIユーザーも必要になるため、未作成であればパスワードを設定してこれも控えておきます。

token発行だけでなく各APIのエンドポイントURLは「エンドポイント」に記載されているので、確認しておきましょう。

テナントID、ユーザー名/パスワード、エンドポイントURLが入手できたら、以下のようにコマンドを実行してtokenを発行します。

```sh
$ curl -s -X POST -H "Accept: application/json" -d '{"auth":{"passwordCredentials":{"username":"<ユーザー名>","password":"<パスワード>"},"tenantId":"<テナントID>"}}' <Identity ServiceのURL>/tokens | jq

{
  "access": {
    "token": {
      "issued_at": "2022-12-07T06:37:38.598837",
      "expires": "2022-12-08T06:37:38Z",
      "id": "xxxxx",
      "tenant": {
        "domain_id": "gnc",
        "description": "v2",
        "enabled": true,
      ...
}
```

`access` -> `token` -> `id`にある`xxxxx`の部分がtokenになりますので、控えておきます。

tokenが発行できたら、まずは現状のISOファイルのダウンロード状況を確認しておきます。

```sh
$ curl -s -X GET -H "Content-Type: application/json" -H "Accept: application/json" -H "X-Auth-Token: <token>" <Compute ServiceのURL>/iso-images | jq

{
  "iso-images": []
}
```

何もダウンロードしていなければ空のはずです。

では事前に用意したRHELのISOをダウンロードします。  
ConoHa上にISOをダウンロードさせる場合はhttp, https, ftpなどでつつける場所にISOを配置しておく必要があります。私は別で持っているWebサーバ上にISOを配置して対応しました。

```sh

$ curl -i -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "X-Auth-Token: <token>" -d '{"iso-image":{"url":"<ISOを配置しているURL>"}}' <Compute ServiceのURL>/iso-images
```

400番台のエラーコードではなく201が返ってきているようならリクエスト自体は成功しているので、気長に待ちます。  
ダウンロードが完了しますと、以下のようにダウンロード済のISOが表示されます。

```sh

$ curl -s -X GET -H "Content-Type: application/json" -H "Accept: application/json" -H "X-Auth-Token: <token>" <Compute ServiceのURL>/iso-images | jq

{
  "iso-images": [
    {
      "ctime": "Tue Nov 29 00:36:30 2022",
      "name": "rhel-baseos-9.1-x86_64-dvd.iso",
      "path": "<ISOのpath>",
      "size": 9060745216,
      "url": "<ISOを配置しているURL>"
    }
  ]
}
```

`iso-images` -> `path`の`<ISOのpath>`は後ほどISOのマウント時に使用するので、これも控えておきます。


## サーバーインストール

ISOのダウンロードが完了したら、事前に作成しておいたVPSにインストールしていきます。

ISOのマウントもAPIで実行できますので、まずは作成したVPSのサーバーIDを確認します。

```sh
$ curl -s -X GET -H "Content-Type: application/json" -H "Accept: application/json" -H "X-Auth-Token: <token>" <Compute ServiceのURL>/servers | jq

{
  "servers": [
    {
      "id": "xxxxx",
      ...
    }
  ]
}

```

`servers` -> `id`の`xxxxx`がサーバーIDになります。

サーバーIDを確認できたら、ISOをマウントします。

```sh
$ curl -i -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "X-Auth-Token: <token>" -d '{"mountImage": "<ISOのpath>"}' <Compute ServiceのURL>/servers/<サーバーID>/action
```

こちらもエラーがなければマウント成功しているはずですので、VPSを起動します。  
見慣れたインストーラーの画面が出れば成功です。インストールしてしまいましょう。


## ISOアンマウント

インストール完了後、再起動してしばらく放置していたのですが、軽く設定しようと後日VPSを覗いたところ、またRHElのインストーラー画面でした。どうやらISOは自動でアンマウントされないようなので、APIでアンマウントしてしまします。

```sh
$ curl -i -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "X-Auth-Token: <token>" -d '{"unmountImage": ""}' <Compute ServiceのURL>/servers/<サーバーID>/action
```

エラーがなければ成功。再起動してインストールしたRHELが起動してくることを確認します。


## 終わりに
今回、勢いで36ヶ月のきっぷを買ってしまったので、3年間このはちゃんと色々遊ぼうと思います。  
本記事で触れている内容はConoHa公式のドキュメントにも記載があります。コマンドも用意されているので、そちらを使ったほうが圧倒的に楽ですね。

[CLIツールで簡単にISOイメージをマウントする](https://support.conoha.jp/v/clitools/?btn_id=search)

年末年始、ConoHa VPSを使ってサーバーのお勉強などいかがでしょうか。
