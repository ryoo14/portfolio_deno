---
title: Monthly Report Jan 2024
publish_date: 2024-01-31
tags: [monthly_report]
---

2024年1月の生存報告。

## 📚 学んだこととかやったこと

### [ポートフォリオサイト作った](https://ryoo.cc)

放置してる[自分のページ](https://ryoo.cc)を置き換えようと思い立ってポートフォリオサイトを作った。ポートフォリオサイトっていう言葉を聞いたことがあるだけで何かわかってないから合ってるかは知らない。  
色々写真撮ったりロゴ書いたりして楽しかった。オシャレな感じに仕上がった気がしないでもない。

無駄にHono + Cloudflare Workersで動いている。

<br />

### [ブルーベリー本](https://amzn.to/490ydqR)の写経

6章の高度な型から8章の非同期処理までやった。9章はtsconfigの簡単な紹介なので、これにてブルーベリー本の写経は終了。  
通算2回読んだことになるけど、結局実際コード書いたり読んだりしないとわからんということがわかった。

<br />

### [月次生存報告の自動化](https://github.com/ryoo14/ryoo_generate_contents_consumption)

AmazonのPA-APIについて調べたら、売り上げ発生してないと使えないということがわかった。  
アフィリエイトの売り上げなんかいらないからAPIだけ使わせてほしいんだけども、Amazonからしたら売り上げに繋がらない客なんていらんだろうなと納得。

APIが使えないのは仕方ないのでSeleniumでブラウザ操作自動化した。  
Selenium使うのもDenoでnpmパッケージ使うのも初めてだったから楽しかった。

丁度ブルーベリー本の写経で非同期についてやったばかりなので直列で商品検索してる処理を非同期で並列実行できないかと模索してみたものの、商品ごとにWebDriverのインスタンスを生成しないとダメなようで、そうなると唯一手動で対応しているログインを商品分やらないといけなさそうだったので頓挫。WebDriver間でセッションを共有する方法はわからなかった。セキュリティ的にダメっぽい雰囲気は感じた。

<br />

### [Linuxnのしくみ](https://amzn.to/49bdRub)

2024年は積読消化年間になるはずなので読み始めた。

<br />

### [AtCoder ProblemのTraining埋め](https://kenkoooo.com/atcoder/#/training/Boot%20camp%20for%20Beginners)

今年は入緑することを目標にしたので、Training埋めもMediumやっていきたい。全くやってないけど。

<br />

### テック系ニュースのPodcast化

何かの記事に触発されて、あとで読むに放り込んだままの記事を音声化して通勤の時にでも消化できないかと思い始めた。  
Google CloudnのText to Speechとか使って音声にするところまではできてるんだけど、一回の音声化リクエストのサイズ上限が5000バイトらしく、複数変換したあとにバイナリをくっつけなきゃいけないっぽい。来月頑張る。

<br />

## 🧐 おもしろそうだったこと

### 投資の話

新NISAに乗っかるために少し調べた。旧NISAから額がかなり増えてて一般人には十分な額な気がする。  
満額入れると生活できなくなるので、ちょいちょい積立ていく。

あとiDecoの資料も取り寄せた。掛金が全部所得控除になるって知らなかったので、財形貯蓄やるくらいならこっちやってればよかった。  
とはいえあれもこれもやると生活費が枯渇するしiDecoやるなら企業型DCやればいいのでそっちにする予定。

<br />

### [HMX Canglan v2 Linear Switch](https://unikeyboards.com/en-jp/products/hmx-canglan-v2-linear-switch-factory-lubed-edition-10pcs)

HMXのリニアキースイッチ。[HMX Macaron](https://unikeyboards.com/en-jp/products/hmx-macaron-switch-factory-lubed-edition-10pcs)と比べれば若干低音。それでもまだ高音の部類。打鍵音自体は小さくないはずだけど、若干低音に寄ったことでうるさくは感じない気がする。  
打鍵感はとってもスムーズ。最初戻りが弱いかな？と思ったけどすぐに慣れた。

HMXのキースイッチは本当にカサつく音とかが一切しなくて、どのキーに使っても綺麗な音が鳴るので、Durock POM Pianoからこっちに移行した。  
説明に書いてある通り、うるさくないとはいってない。

<br />

## 👾 コンテンツ消費

### [SPY×FAMILY Season 2 #36-37](https://annict.com/works/10253)

豪華客船での死闘回。  
フォージャー家全員がそれぞれ活躍するから原作でも大好きな回なので、動くヨルさんの素晴らしさも相まってとても良かった。

<br />

### [魔のものたちは企てる #1](https://amzn.to/423y6Ib)

色々企てて楽しんでる魔王軍のお話。  
Twitterで原作の方を知って購入。原作の方の絵が好みだったので迷ったけどこちらも可愛いのでおすすめ。

<br />

### [僕のヒーローアカデミア #1-12](https://amzn.to/48QeLwC)

YouTubeショートで何回も女の子可愛いと出てくるので影響され続け、ちょうどKindleまとめ買いポイント還元やってたので12巻まで買った。

各々があらゆる個性を持ち、あらゆる場面でそれを活用する時代、個性を正義のために振るう「ヒーロー」に憧れた無個性の少年が主人公の少年漫画。  
普段爬虫類とか両生類キャラ好きにならないはずが、梅雨ちゃんは何故かツボにはまってしまった。めちゃかわいい。

<br />

## 📷 写真

### キーボードシリーズ

![Neo65](https://d3toh8on7lf5va.cloudfront.net/neo65.jpg)
Neo65 w/ HMX Canglan v2

![Planck EZ](https://d3toh8on7lf5va.cloudfront.net/planckez.jpg)
Plance EZ w/ BSUN Roselle

![Nuphy Air60 v2](https://d3toh8on7lf5va.cloudfront.net/air60v2.jpg)
Nuphy Air60 v2 w/ Nuphy Cowberry
