---
title: 夏休みの宿題(工作) ~ Raspberry Piクラスタ制作 ~
publish_date: 2024-08-31
tags: [tech]
---

夏休みはないけど宿題としてずっとやりたかったRaspbery Piでクラスタ組む。  
ラックも自分で設計する。

## 参考資料

- [私もk8sクラスタ用にRaspberry PiとTP-Linkをまとめられるケースを作りたい](https://zenn.dev/asataka/scraps/671f08eea68e82)
- [How to build a Raspberry Pi cluster](https://www.raspberrypi.com/tutorials/cluster-raspberry-pi-tutorial/)
- [How to network boot Pi4](https://github.com/garyexplains/examples/blob/master/How%20to%20network%20boot%20a%20Pi%204.md)
- [Linuxにおける新たなパケットフィルタリングツール「nftables」入門](https://knowledge.sakura.ad.jp/22636/)

## 必要なもの

|       もの          |個数|
|---------------------|---|
|Raspberry Pi         |2|
|Raspberry Pi PoE+ HAT|2|
|PoE対応ハブ          |1|
|LANケーブル          |2|
|SATA SSD 500GB       |1|
|SATA-USBCケーブル    |1|
|クラスタ収容ラック   |1|
|Adobe Illustrator    |1|

こじんまりとした可愛い見た目にしたいので、Raspberry Piは3, 4台のつもりで考える。とはいえ価格が底辺サラリーマンには厳しいため、いきなり予定枚数購入せずに家にある4B x 1と3B+ x 1の計2台でPoCをする。PoCって言いたいだけ。

ラックに必要なアクリル加工の発注とかネジ類の購入はのぞいて、必要なものの購入はまとめてやった。ある程度想定していたけど総額めちゃくちゃ高い。

## ラック作成

本命のクラスタ構築を何故か後回しにしてラック作成から着手。こういう図描いて組み立ててするのが個人的に好きすぎてめちゃくちゃ楽しかった。

Raspberry Piがまだ2Bとかそのあたりの世代だったころ、同じようにラック自作を試したことがある。アクリル板を買ってきてドリルで穴開けて…と頑張ったが、残念ながらその時はアクリル板が欠けたり割れたり散々だったため諦めた。今回もアクリル版で作るのは同じだけど、加工は業者に任せることにした。

### 業者選定

いくつか業者を探してみたところ、サイトもわかりやすいし注文しやすかったので[Anymanyさん](https://anymany.net)にお願いした。結果的に、データが意図しなさそうな描画になっていることを教えてくれたり、私の不注意で行ったミスデータの注文をキャンセルしてくれたり。ご迷惑をおかけしてしまった。柔軟に対応してくださって最高の業者だった。

### 平面図作成

[Anymanyさん](https://anymany.net)はAdobe IllustratorとInkspaceで作成したAIデータかPDFデータであれば即見積もり+注文が可能。Illustratorを契約していないのでAffinity Designerの無料期間でなんとかならんかと四苦八苦してみたがダメ。よくよく調べるとIllustratorにも30日間の無料期間があったのでそれで決着をつけることを決意した。

正確な寸法で図面を描くため[Raspberry Pi自体の図面](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)をインポートして平面図を描いていく。SATA SSDを底に配置、Raspberry Piたちはその上につみかさね、PoEスイッチは立てて横に配置する想定だったけど、図面の下書きを一切せずガンガン描いていた結果、めちゃくちゃ手戻りが発生した。

- Raspberry Piの寸法だけ気にして図面を描き切った結果、スペーサーが邪魔でSSDが配置できない
- Illustratorわからなさすぎて無駄にアウトライン生成しまくった結果、線が2重になっていた
- Raspberry Pi自体の図面を使っているはずなのにネジ穴の位置が微妙にずれていく現象が発生した

PoEスイッチの収まりはきっちりしていたほうが見た目良さそうかなと思ってギリギリを攻めて設計したけど、微調整しているうちに隙間が大きくなった気がする。あと途中で面倒くさくなって左右対称にはなってない。発注用のデータにかなり隙間ができたので、適当に自分のアイコンを配置してアクリル化することにした。絶対にいらない。

![平面図](https://d3toh8on7lf5va.cloudfront.net/raspi-rack-floor.jpg)

一回描き切った後に気付くを繰り返していて、既存の図を良い感じに修正する方法がわからず1から描き直すということを3回繰り返したので私のiPadの電池はもう死にそう。下書き大事。途中確認大事。仕事と一緒ですね。

### 正面図作成

平面図が描けたらネジとかスペーサーの長さを正確に決めるために正面図も描いていく。高さ足りずにSSDやRaspberry Piが入らないという自体が最悪なのである程度慎重になり、下書きもちゃんとした。

Illustratorで描き始めると、平面図が微妙にずれていることもわかったりしたので正面図描いたのは我ながら良かった気がする。これで必要なネジとかスペーサーの種類・長さ・本数がはっきりした。

![正面図](https://d3toh8on7lf5va.cloudfront.net/raspi-rack-front.jpg)

### ネジ購入

ネジや工具といえばホームセンターということでクソ暑い中自転車で近所のコーナンに買いに行ったものの、欲しいサイズのスペーサーがなかったため[モノタロウ](https://www.monotaro.com)で購入することに。

UIが微妙でめちゃくちゃ探しにくかったけどさすがの品揃えで欲しいものが全て注文できた。ネジ類だけで1万円弱になって泣きそう。

### 完成

中段のスペーサーだけ到着が遅くなったが無事ラック完成し、搭載も完了。PoEスイッチが綺麗に収まってくれてとても嬉しい。スイッチ背面を支えてるくの字アクリルも頑丈でとてもいい出来。最高。

正面の写真  
![正面写真](https://d3toh8on7lf5va.cloudfront.net/raspi-rack-front-real.jpg)

背面の写真  
![背面写真](https://d3toh8on7lf5va.cloudfront.net/raspi-rack-back.jpg)

## Raspberry Pi設定

ラック作成は失敗ばかりだったが、今回の件を思いついた時点でRaspberry Piをノータイムで注文せず、まずは今ある資源でなんとかしようとしたのは成長だと感じた。が、Raspberry Piの起動確認してみたら3B+が起動しなくて泣いた。結局4Bを追加で1枚購入した。

### システム構成

2台あるRaspberry Piをそれぞれmaster, slaveとして役割を持たせる。

- master
  - おうちのブロードバンドルーターと無線接続して外部NWとのゲートウェイ
  - slaveをネットワークブートさせるためのDHCPサーバ, TFTPサーバ
  - SATA SSD直結してslaveのシステムパーティションとデータストアをホストさせる
  - DNS/NTP/SNMPなど運用系に必要な機能も持たせたい
- slave
  - 起動も監視もmasterに依存するworkerノード
  - サービスを動かすだけ。何を動かすとかは一切決めてない
  - 外部NWに抜ける場合はmasterを経由させるため、無線LANアダプターは無効にする

全台PoEハットを被せてRJ45ケーブルから電力を受けるようにしてケーブル本数を減らす。正直ラック搭載出来た時点で完成したまであるのでできるところまでやる。

### 構築

- OSインストール
  - https://www.raspberrypi.com/software/
  - 外との繋ぎになるwlan0用にSSIDなど情報入力しておく
  - sshは鍵認証にしたいので公開鍵を転送
  - とりあえず`sudo apt update & sudo apt upgrade`
- IPアドレスの固定はdhcp側でやれとのドキュメント
  - https://www.raspberrypi.com/documentation/computers/configuration.html#assign-a-static-ip-address
- eth0用のNetwork Manager Connection名がWired connection 1みたいな死にそうな名前なのでeth0に変更
  - `sudo nmcli mod 'Wired connection 1' connection.id eth0`
- dhcp serverのセットアップ
  - クラスタ内ネットワークのアドレス帯を定義(192.168.50.0/24)
- SATA SSD
  - ext4でフォーマットして適当なディレクトリにマウントするように`/etc/fstab`に記載
- nfs serverのセットアップ
  - SATA SSD内にディレクトリを作成して`/etc/exports`に記載
- tftp serverのセットアップ
  - Raspberry Pi公式の通りにやると上手くいかないので注意
  - boot imageの作成
    - bootmntのコピー先はシリアル番号のフォルダではないかとおもう
    - あとexportsにエントリ追加しないとクライアントがマウント出来ない
  - dhcpのconfigをslave用に修正。tftpルートの指定など
- が、だめ
  - 電力不足？か何かでslave起動途中にmasterがSATA SSDを見失ってしまう
  - masterの電源をPoEスイッチとは別のところからUSB-Cに供給して安定させるとslaveの起動に成功
  - ケーブル本数減らしてミニマルに仕上げたいためのネットワークブートなのに電源ケーブル一本増えるのは個人的に許せず
  - 仕方ないのでslaveに起動用のSDカード挿入することにした

#### snatなど

slaveがmasterを経由してインターネットと通信できるようにする。masterのwlan0についているアドレスとは別にslaveの変換用に新しくアドレスを設定する。所謂IPマスカレードではなくSNAT。

```
$ nmcli con mod preconfigured +ipv4.addresses 192.168.11.211/24
$ sudo systemctl restart NetworkManager
```

RHELがnftablesを採用して久しいので、せっかくなのでnftablesを使う。Raspberry Pi OSにもデフォルトでインストールされていた。

```
$ sudo nft add table nat
$ sudo nft add chain nat postrouting { type nat hook postrouting priority 100 \; }
$ sudo nft add rule nat postrouting oif "wlan0" ip saddr 192.168.11.211 snat to 192.168.50.11
```

#### dns

dnsmasqでmasterの`/etc/hosts`を名前解決に使いつつ、エントリとして載っていないものはforwardしたい。

```
$ sudo apt install dnsmasq
$ sudo vi /etc/dnsmasq.conf
addn-hosts=/etc/hosts
server=192.168.11.1
$ sudo systemctl restart dnsmasq
```

#### ntp

chronyで時刻同期させる。

```
$ sudo apt install chrony
$ sudo vi /etc/chrony/chrony.conf
pool ntp.nict.jp iburst trust # master
server 192.168.50.1 iburst trust # slave
...
logdir /mnt/usb/log
$ sudo systemctl restart chronyd
```

## かかった総額

今回Raspberry Pi クラスタラックを作成するにあたって必要だったものとかかった費用一覧。大人の夏休み工作と考えてもいい値段がしている。が、楽しかったし有意義なお金の使い方だったとして忘れることにする。

|       もの          |個数|価格(円)|備考|
|---------------------|---|---:|---|
|Raspberry Pi 4B 8GB  |2|13,160|うち1台は以前購入したものなので価格に計上せず|
|Raspberry Pi PoE+ HAT|2|8.560||
|PoE対応ハブ          |1|5,400||
|LANケーブル          |2|944||
|SATA SSD 500GB       |1|5,152||
|SATA-USBCケーブル    |1|999||
|Adobe Illustrator    |1|0|無償期間|
|アクリル(加工費込み) |1|7,370||
|M3 スペーサー(ステンレス) 28mm|20|4,580||
|M3 スペーサー(ステンレス) 10mm|10|1,890||
|M3 ナベ小ネジ(ステンレス) 6mm|25|409||
|M3 袋ナット(ステンレス)|10|429||
|M2.6 スペーサー(黄銅) 5mm|50|1,590||
|M2.6 ナベ小ネジ(黄銅) 4mm|8|0|PoE+ HATに付属していたものを流用|
|ゴム足 TK型|6|108||
|総額||**50,591**||

## 総括

従来のちゃんと確認しない病のせいで色々失敗ばっかりだけど図描いたりするのやっぱり楽しかった。色々遊ぶのに使いたいと思う。k8sそろそろやりたい。
