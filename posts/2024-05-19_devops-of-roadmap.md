---
title: DevOps of Roadmap
publish_date: 2024-05-19
tags: [tech, DevOps, roadmaps.sh]
---

[roadmaps.sh](https://roadmaps.sh)の[DevOps](https://roadmaps.sh/devops)消化記録

## Learn a Programming Language

### TypeScript(Deno)

DevOpsたるもの何かしら言語は学べということで、リストにはないけどTypeScriptは勉強しているからここはスキップ。  
あとシェルスクリプトもほどほどに書けるはずなのでいいでしょう。いいはず。

## Operating system

### RHEL

数少ない現場経験としては本番環境にRHEL以外のディストリビューション導入しているところにあたったことがないのでRHEL選定。  
CentOSが死んで久しいけど、個人利用は無償ライセンスが払い出せるので嬉しい。

### FreeBSD

Unix一切触ったことないけどFreeBSDで触っておいたほうがいいのか。  
ドキュメントが充実しているようなのでGetting Start程度はやってみようかな。

- [FreeBSD Handbook](https://docs.freebsd.org/en/books/handbook/)

## Learn to live in Terminal

### Process Monitoring

#### ps

手癖の`ps aux`。

|オプション|意味|
|-|-|
|`a`|全ユーザーのプロセスを表示|
|`u`|CPUやメモリの使用率、プロセスの稼働日など詳細情報を表示|
|`x`|ユーザー起動のプロセスだけではなく、デーモンなど全てを表示|

|項目|意味|
|-|-|
|%CPU|CPU使用率|
|%MEM|メモリ使用率|
|VSZ|仮想メモリ使用量|
|RSS|物理メモリ使用量、ただしスワップ分は除く|
|TTY|プロセスが紐づくターミナル|
|STAT|ステータス|

malloc()でメモリ割り当てを行った場合、実際にはVTZが増加するだけで、writeされるまではRSSは増えない。CoWの仕組み。

STATについては以下の通り。

|項目|意味|
|-|-|
|S|スリープ状態|
|s|セッションリーダー|
|R|実行中、実行待ち、実行可能状態|
|D|ディスクIO待ちなどによる割り込み不可のスリープ|
|I|カーネルスレッド専用のアイドル状態|
|+|フォアグラウンドプロセスグループに属している|
|T|シグナルなどによる停止状態|

#### top

`1`を押せばCPU全コア確認できることしか知らない。

|項目|意味|
|-|-|
|PR||
|NI||
|VIRT||
|RES|物理メモリ使用量|
|SHR|物理メモリ使用量のうち、他プロセスと共有している量|
|S||

TODO: RSの種類調査

#### lsof

プロセスがopenしているあらゆるファイルのリストを出力する。一番使うのは`lsof -i:<port>`。Webサーバ動いてるか？という時によく使う。

htopとかatopとか便利そうだけど必須かと言われたらそうでもないので割愛。

### Performance Monitoring

#### nmon

初見。オシャレなTUIモニタリングツール。デフォルトで入っていそうにないので、学習は余裕のある時にやる。

#### iostat

I/Oモニタリングツール。デバイス毎のread/write量が確認できる。

#### sar

#### vmstat

リソースモニタリングツール。

|項目|意味|
|-|-|
|bi|ブロックデバイスからの入力ブロック数|
|bo|ブロックデバイスへの出力ブロック数|
|in|割り込みの数|
|cs|コンテキストスイッチの数|
|us|ユーザープロセスのCPU使用率|
|sy|カーネルプロセスのCPU使用率|
|id|アイドル状態|
|wa|IO待ち|
|st|盗まれたCPU使用率。ホスト内で稼働している仮想マシンによってCPU時間が奪われた場合に記録される|

### Networking Tools




### Text Manipulation

#### nl

テキストに行番号を付与して表示する。知らなかった。

#### fmt


#### cut

### Bash Scripting

Bashによるシェルスクリプトは忘れたころに書いているのでセーフ。

### Vim/Nano/Emacs

Vim使い始めて12年くらい経つはずだけどあの頃からほぼ成長していない。

## Version Control Systems

### Git

## VCS Hosting

### GitHub

## What is and how to setup a ______?

