---
title: DenoでGitリポジトリ管理とワークディレクトリ管理ができるCLIツールを作った
publish_date: 2022-12-08
tags: [Deno, advent_calendar]
---

これは[Deno Advent Calendar 2022](https://qiita.com/advent-calendar/2022/deno) 8日目の記事です。

[x-motemen/ghq](https://github.com/x-motemen/ghq)をご存知でしょうか。コマンドライン上でリポジトリを管理できるとても便利なCLIツールです。

私も長らくお世話になっていまして、[junegunn/fzf](https://github.com/junegunn/fzf)や[junegunn/fzf.vim](https://github.com/junegunn/fzf.vim)と組み合わせて快適なCLIライフを満喫していました。

`ghq`になんの不満もない私ですが、ちょうどDenoで何か簡単なCLIツールを作りたいと思っていて、基本的な機能をそなえた`ghq`クローンである[ryoo14/patty](https://github.com/ryoo14/patty)を作ってみたので簡単にご紹介したいと思います。

## インストールと初期設定

`patty`をインストールして、PATHを通します。

```sh
$ deno install --allow-read --allow-write --allow-env --allow-run https://deno.land/x/patty@0.4.1/patty.ts
✅ Successfully installed patty
/home/user/.deno/bin/patty
ℹ️  Add /home/user/.deno/bin to PATH
    export PATH="/home/user/.deno/bin:$PATH"

$ export PATH="/home/user/.deno/bin:$PATH"  
```

PATHを通せたら`patty`を実行してみます。引数なしで`help`が表示されます。

```sh
$ patty

  Usage:   patty
  Version: 0.4.1

  Description:

    a CLI tool for managing git and working directories written in Deno.

  Options:

    -h, --help     - Show this help.                            
    -V, --version  - Show the version number for this program.  

  Commands:

    create  <dir>      - Create a working but non-git managed directory.      
    get     <url>      - Get a git repository from remote repository services.
    list               - Print git and working directories.                   
    root               - Print root path on patty's configuration.            
    help    [command]  - Show this help or the help of a sub-command.         
```

`patty`はデフォルトで`$HOME/patty`が管理用のルートディレクトリとなります。  
デフォルトから変更したい場合、`$PATTY_ROOT`変数をセットすると、そちらが優先されます。  

管理用のルートディレクトリがどう設定されているかは、`patty root`で確認できます。

```sh
$ patty root
/home/user/patty
```

## リモートリポジトリからcloneしてみる

`patty list`で管理対象を一覧表示でき、`patty get`でリモートのリポジトリサービスからcloneできます。

```sh
$ mkdir patty # ルートディレクトリ作成
$ patty list  # この時点では空
$ patty get -q github.com/ryoo14/patty
$ patty list
github.com/ryoo14/patty
```

Denoで`git`を操作する際、モジュールがないか探したのですが開発が続いていそうなモジュールがなく、仕方なく`Deno.run`で`git clone`を実行しています。

いいモジュールや実装方法があれば教えていただきたいです。

## ワークディレクトリを作成する

`ghq`と全く同じだと面白くないので、Gitで管理するほどではないけど`patty list`でリストには表示できるワークディレクトリを作成する`patty create`があります。  
逆に`patty create`ではGitリポジトリを現状作成できないので、今後の課題とします。

```sh
$ patty create work/memo
$ patty list
work/memo
github.com/ryoo14/patty
```

`patty create`は指定されたPATHの直下に`.patty`ディレクトリを作成します。`patty list`は`.git`か`.patty`があるディレクトリを管理対象として表示するようになっています。

```sh
$ ls -a patty/work/memo
.  ..  .patty
```

## `fzf`と組み合わせて快適コマンドライン生活

`fzf`と組み合わせれば便利です。  
`C-]`で管理下のリストが出るので、選択するだけで`cd`できます。

```bash
fzf_patty() {
  local project_name=$(patty list | sort | $(__fzfcmd))
  if [[ -n "$project_name" ]]; then
    local project_full_path=$(patty root)/$project_name
    local project_relative_path="~/$(realpath --relative-to=$HOME $project_full_path)"
    READLINE_LINE="cd $project_relative_path"
    READLINE_POINT=${#READLINE_LINE}
  fi
}

bind -x '"\C-]": fzf_patty'
```

`fzf.vim`と組み合わせて、vim内でもすぐに`cd`できます。

```vim
command! -nargs=0 Fq call fzf#run({
\ 'source': 'patty list --full-path',
\ 'down': 20,
\ 'sink': 'cd'
\ })

nnoremap <Space>fq :Fq<CR>
```

## 終わりに

DenoでCLIツールを作るときは[deno-cliffy](https://cliffy.io)がめちゃくちゃ便利です。  
また何かCLIツールと、Freshを使ってWebアプリも書いてみたいなと思います。
