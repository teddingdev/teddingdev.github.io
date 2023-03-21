---
title: bash_profile 备份
date: 2020-03-04 22:45:00
tags:
- backup
- profile
categories:
- bash
- profile
---

``bash_profile`` 常用配置备份
<!-- more -->
```bash
#enables colorin the terminal bash shell export
export CLICOLOR=1

#setsup thecolor scheme for list export
export LSCOLORS=gxfxcxdxbxegedabagacad

#sets up theprompt color (currently a green similar to linux terminal)
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;36m\]\w\[\033[00m\]\$ '
#enables colorfor iTerm
export TERM=xterm-256color

alias grep='grep --color'
alias la='ls -al'
alias ll='ls -l'
alias cls=clear

alias proxyon='export http_proxy=http://127.0.0.1:1087; export https_proxy=http://127.0.0.1:1087;echo proxy is on!'
alias proxyoff='unset http_proxy; unset https_proxy;echo proxy is off!'

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export workspace="$HOME/Documents/workspace"

#shorcuts
alias doc="cd $HOME/Documents"
alias dod="cd $HOME/Downloads"
alias dop="cd $HOME/Desktop"
alias app="cd $HOME/Applications"
alias pic="cd $HOME/Pictures"
alias mov="cd $HOME/Movies"
alias mus="cd $HOME/Music"

#workspace
alias ws="cd $workspace"
alias wsg="cd $workspace/github"

#npm
alias ns="npm run start"
alias nb="npm run build"

#gits


# mitmproxy
# SSLKEYLOGFILE="$PWD/.mitmproxy/sslkeylogfile.txt" mitmproxy


# hexo 
alias hexogs="hexo g && hexo s"
```