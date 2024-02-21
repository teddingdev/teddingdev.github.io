---
title: Linux bash 内建命令 getopts
date: 2024-02-21 14:15:06
tags:
    - Linux
    - Bash
    - Shell
categories:
    - Linux
    - Bash
---

{{ title }}
<!-- more -->

下面的例子是假设 test-getopts.sh 文件的内容
```bash
#/bin/bash
getopts "a:b:" opt
echo "$opt: $OPTARG"
getopts "a:b:" opt
echo "$opt: $OPTARG"
```
当执行之后 `bash test-getopts.sh -a 1 -b 2` 会在终端输出
```bash
a: 1
b: 2
```
每次调用 `getopts "a:b:" opt` 都会按照顺序解析传入的参数，所以大部分使用场景都是在一个循环中多次调用

下面是另一个例子 其中 `$OPTARG` 是内置全局变量
```bash
#!/bin/bash

while getopts ":ab:" opt; do
    case $opt in
        a) echo "Option -a" ;;
        b) echo "Option -b with argument '$OPTARG'" ;;
        \?) echo "Invalid option: -$OPTARG" >&2; exit 1 ;;
        :) echo "Option -$OPTARG requires an argument." >&2; exit 1 ;;
    esac
done

# Process non-option arguments, if any
shift $((OPTIND-1))
echo "Remaining arguments: $@"

```

bash shell manpage
>getopts  is  used  by  shell procedures to parse positional parameters.  optstring contains the option
characters to be recognized; if a character is followed by a colon, the option is expected to have  an
argument,  which  should  be separated from it by white space.  The colon and question mark characters
may not be used as option characters.  Each time it is invoked, getopts places the next option in  the
shell  variable name, initializing name if it does not exist, and the index of the next argument to be
processed into the variable OPTIND.  OPTIND is initialized to 1 each time the shell or a shell  script
is  invoked.   When an option requires an argument, getopts places that argument into the variable OP‐
TARG.  The shell does not reset OPTIND automatically; it must be manually reset between multiple calls
to getopts within the same shell invocation if a new set of parameters is to be used.
>
>When the end of options is encountered, getopts exits with a return value greater than  zero.   OPTIND
is set to the index of the first non‐option argument, and name is set to ?.
>
>getopts  normally  parses the positional parameters, but if more arguments are supplied as arg values,
getopts parses those instead.
>
>getopts can report errors in two ways.  If the first character of optstring is a colon,  silent  error
reporting is used.  In normal operation, diagnostic messages are printed when invalid options or miss‐
ing  option  arguments are encountered.  If the variable OPTERR is set to 0, no error messages will be
displayed, even if the first character of optstring is not a colon.
>
>If an invalid option is seen, getopts places ? into name and, if not silent, prints an  error  message
and  unsets OPTARG.  If getopts is silent, the option character found is placed in OPTARG and no diag‐
nostic message is printed.
>
>If a required argument is not found, and getopts is not silent, a question mark (?) is placed in name,
OPTARG is unset, and a diagnostic message is printed.  If getopts is  silent,  then  a  colon  (:)  is
placed in name and OPTARG is set to the option character found.
>
>getopts returns true if an option, specified or unspecified, is found.  It returns false if the end of
options is encountered or an error occurs.
