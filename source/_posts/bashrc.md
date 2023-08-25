---
title: 当前 Linux 使用的 bashrc 文件 备份
date: 2023-08-25 15:08:47
tags:
categories:
---

备份一下当前终端使用的配置文件
<!-- more -->
```bash
# Sample .bashrc for SUSE Linux
# Copyright (c) SUSE Software Solutions Germany GmbH

# There are 3 different types of shells in bash: the login shell, normal shell
# and interactive shell. Login shells read ~/.profile and interactive shells
# read ~/.bashrc; in our setup, /etc/profile sources ~/.bashrc - thus all
# settings made here will also take effect in a login shell.
#
# NOTE: It is recommended to make language settings in ~/.profile rather than
# here, since multilingual X sessions would not work properly if LANG is over-
# ridden in every subshell.

test -s ~/.alias && . ~/.alias || true

##################################################

# ---------- read product_family begin ----------
read -r product_family </sys/class/dmi/id/product_family
product_name="$(hostname -s)"
if [ "${product_family}" = "ThinkPad T14 Gen 1" ]
then
    product_name="ThinkPad-T14"
elif [ "${product_family}" = "ThinkPad neo 14" ]
then
    product_name="ThinkPad-Neo14"
fi
# ---------- read product_family end ----------

##################################################

alias proxyon='export http_proxy=http://127.0.0.1:7890; export https_proxy=http://127.0.0.1:7890;echo proxy is on!'
alias proxyoff='unset http_proxy; unset https_proxy;echo proxy is off!'
alias tedding.dev='cd ~/Documents/Github/tedding.dev'

#PATH begin
export GO="$HOME/.local/bin/go"
export V2RAY="$HOME/.local/bin/v2ray"
export JETBRAINS="/opt/jetbrains"
export FLUTTER="$HOME/.local/bin/flutter"
export MACROCURA="$HOME/.local/Documents/Macrocura"
export NWJSSDK_V0_40_2="$HOME/.local/bin/nwjs-sdk-v0.40.2-linux-x64/"
export GRADLE="$HOME/.local/bin/gradle"
export MITMPROXY="$HOME/.local/bin/mitmproxy"

export IDEA="$JETBRAINS/Idea"
export CLION="$JETBRAINS/Clion"
export RIDER="$JETBRAINS/Rider"
export GOLAND="$JETBRAINS/GoLand"
export WEBSTORM="$JETBRAINS/WebStorm"
export BREW="/home/linuxbrew/.linuxbrew"

export PATH="$MACROCURA:$HOME/.local/bin:$V2RAY:$IDEA/bin:$CLION/bin:$RIDER/bin:$GOLAND/bin:$WEBSTORM/bin:$FLUTTER/bin:$GO/bin:$NWJSSDK_V0_40_2:$GRADLE/bin:$BREW/bin:$MITMPROXY:$PATH"
#PATH end

# load nvm begin
# export NVM_DIR="$HOME/.local/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# load nvm end

# load volta begin
 export VOLTA_HOME="$HOME/.volta"
 export PATH="$VOLTA_HOME/bin:$PATH"
# load volta end

# load cargo begin
. "$HOME/.cargo/env"
# load cargo end

# Setting the LG_WEBOS_TV_SDK_HOME variable to the parent directory of CLI
export LG_WEBOS_TV_SDK_HOME="$HOME/.local/bin/webOS_TV_SDK"

if [ -d "$LG_WEBOS_TV_SDK_HOME/CLI/bin" ]; then
  # Setting the WEBOS_CLI_TV variable to the bin directory of CLI
  export WEBOS_CLI_TV="$LG_WEBOS_TV_SDK_HOME/CLI/bin"
  # Adding the bin directory of CLI to the PATH variable
  export PATH="$PATH:$WEBOS_CLI_TV"
fi

###############################################################################

# Configure color-scheme
COLOR_SCHEME=dark # dark/light

alias sudo='sudo '

# --------------------------------- ALIASES -----------------------------------
alias ..='cd ..'
alias cp='cp -v'
alias rm='rm -I'
alias mv='mv -iv'
alias ln='ln -sriv'
alias xclip='xclip -selection c'
command -v vim > /dev/null && alias vi='vim'

### Colorize commands
alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias diff='diff --color=auto'
alias ip='ip --color=auto'
alias pacman='pacman --color=auto'

### LS & TREE
alias ll='ls -la'
alias la='ls -A'
alias l='ls -F'
command -v lsd > /dev/null && alias ls='lsd --group-dirs first' && \
	alias tree='lsd --tree'
command -v colorls > /dev/null && alias ls='colorls --sd --gs' && \
	alias tree='colorls --tree'

### CAT & LESS
command -v bat > /dev/null && \
	alias bat='bat --theme=ansi' && \
	alias cat='bat --pager=never' && \
	alias less='bat'
# in debian the command is batcat
command -v batcat > /dev/null && \
	alias batcat='batcat --theme=ansi' && \
	alias cat='batcat --pager=never' && \
	alias less='batcat'

### TOP
command -v htop > /dev/null && alias top='htop'
command -v gotop > /dev/null && alias top='gotop -p $([ "$COLOR_SCHEME" = "light" ] && echo "-c default-dark")'
command -v ytop > /dev/null && alias top='ytop -p $([ "$COLOR_SCHEME" = "light" ] && echo "-c default-dark")'
command -v btm > /dev/null && alias top='btm $([ "$COLOR_SCHEME" = "light" ] && echo "--color default-light")'
# themes for light/dark color-schemes inside ~/.config/bashtop; Press ESC to open the menu and change the theme
command -v bashtop > /dev/null && alias top='bashtop'
command -v bpytop > /dev/null && alias top='bpytop'

# --------------------------------- SETTINGS ----------------------------------
shopt -s globstar
shopt -s histappend
shopt -s checkwinsize

HISTCONTROL=ignoreboth
HISTSIZE=5000
HISTFILESIZE=5000
HISTFILE=~/.bash_history

# Bash Completion
if [ -f /usr/share/bash-completion/bash_completion ]
then
	source /usr/share/bash-completion/bash_completion
elif [ -f /etc/bash_completion ]
then
	source /etc/bash_completion
fi

# Add new line before prompt
PROMPT_COMMAND="PROMPT_COMMAND=echo"

# Prompt
#PS1='\[\033[;32m\]┌──(\[\033[1;34m\]\u@\h\[\033[;32m\])-[\[\033[0;1m\]\w\[\033[;32m\]]\n\[\033[;32m\]└─\[\033[1;34m\]\$\[\033[0m\] '
PS1='\[\033[;32m\]┌──(\[\033[1;34m\]\u@${product_name}\[\033[;32m\])-[\[\033[0;1m\]\w\[\033[;32m\]]\n\[\033[;32m\]└─\[\033[1;34m\]\$\[\033[0m\] '

# ----------------------------------- MISC -----------------------------------
export VISUAL=vim
export EDITOR=$VISUAL

# enable terminal linewrap
setterm -linewrap on 2> /dev/null

# colorize man pages
export LESS_TERMCAP_mb=$'\e[1;32m'
export LESS_TERMCAP_md=$'\e[1;32m'
export LESS_TERMCAP_me=$'\e[0m'
export LESS_TERMCAP_se=$'\e[0m'
export LESS_TERMCAP_so=$'\e[01;33m'
export LESS_TERMCAP_ue=$'\e[0m'
export LESS_TERMCAP_us=$'\e[1;4;31m'
export LESSHISTFILE=-

# colorize ls
[ -x /usr/bin/dircolors ] && eval "$(dircolors -b)"

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*|Eterm|aterm|kterm|gnome*|alacritty)
	PS1="\[\e]0;\u@\h: \w\a\]$PS1"
	;;
esac

# -------------------------------- FUNCTIONS ---------------------------------
lazygit() {
	USAGE="
lazygit [OPTION]... <msg>

    GIT but lazy

    Options:
        --fixup <commit>        runs 'git commit --fixup <commit> [...]'
        --amend                 runs 'git commit --amend --no-edit [...]'
        -f, --force             runs 'git push --force-with-lease [...]'
        -h, --help              show this help text
"
	while [ $# -gt 0 ]
	do
		key="$1"

		case $key in
			--fixup)
				COMMIT="$2"
				shift # past argument
				shift # past value
				;;
			--amend)
				AMEND=true
				shift # past argument
				;;
			-f|--force)
				FORCE=true
				shift # past argument
				;;
			-h|--help)
				echo "$USAGE"
				EXIT=true
				;;
			*)
				MESSAGE="$1"
				shift # past argument
				;;
		esac
	done
	unset key
	if [ -z "$EXIT" ]
	then
		git status .
		git add .
		if [ -n "$AMEND" ]
		then
			git commit --amend --no-edit
		elif [ -n "$COMMIT" ]
		then
			git commit --fixup "$COMMIT"
			GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash "$COMMIT"^
		else
			git commit -m "$MESSAGE"
		fi
		git push origin HEAD $([ -n "$FORCE" ] && echo '--force-with-lease')
	fi
	unset USAGE COMMIT MESSAGE AMEND FORCE
}

glog() {
	setterm -linewrap off 2> /dev/null

	git --no-pager log --all --color=always --graph --abbrev-commit --decorate --date-order \
		--format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' "$@" \
		| sed -E \
			-e 's/\|(\x1b\[[0-9;]*m)+\\(\x1b\[[0-9;]*m)+ /├\1─╮\2/' \
			-e 's/(\x1b\[[0-9;]+m)\|\x1b\[m\1\/\x1b\[m /\1├─╯\x1b\[m/' \
			-e 's/\|(\x1b\[[0-9;]*m)+\\(\x1b\[[0-9;]*m)+/├\1╮\2/' \
			-e 's/(\x1b\[[0-9;]+m)\|\x1b\[m\1\/\x1b\[m/\1├╯\x1b\[m/' \
			-e 's/╮(\x1b\[[0-9;]*m)+\\/╮\1╰╮/' \
			-e 's/╯(\x1b\[[0-9;]*m)+\//╯\1╭╯/' \
			-e 's/(\||\\)\x1b\[m   (\x1b\[[0-9;]*m)/╰╮\2/' \
			-e 's/(\x1b\[[0-9;]*m)\\/\1╮/g' \
			-e 's/(\x1b\[[0-9;]*m)\//\1╯/g' \
			-e 's/^\*|(\x1b\[m )\*/\1⎬/g' \
			-e 's/(\x1b\[[0-9;]*m)\|/\1│/g' \
		| command less -r $([ $# -eq 0 ] && echo "+/[^/]HEAD")

	setterm -linewrap on 2> /dev/null
}

find() {
	if [ $# = 1 ]
	then
		command find . -iname "*$@*"
	else
		command find "$@"
	fi
}

```