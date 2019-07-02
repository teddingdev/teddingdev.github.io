---
title: Windows 10 环境下安装 Python3 和 PyQt  
date: 2017-09-08 02:23:24
tags:
- Windows
- Python
- PyQt
categories: 
- Python
- Windows
---

### 安装简述:
* 安装 **python**
* 安装 **pip**
* 通过 **pip** 安装 **sip**
* 通过 **pip** 安装 **PyQt**  
 
### 具体步骤:
1. 从 https://www.python.org/downloads/ 下载对应的python版本  
2. - 安装 **python3**
   - 检查 **python** 环境
    **``win+x``**打开**Windows PowerShell**(或者CMD)窗口，键入**``python -V``**回车，查看 **python** 版本号，确定**python** 已经正确安装完成  
3. - 安装 **pip**
        1. 获取 **pip** 官方文档中的安装脚本https://bootstrap.pypa.io/get-pip.py
        2. 在脚本所在文件夹打开 **Windows PowerShell** 键入：
``python get-pip.py``
(更多参考https://pip.pypa.io/en/stable/installing/)
4. 安装PyQt
    1. 在 **Windows PowerShell** 键入``pip3 install SIP``安装SIP
    1. 在 **Windows PowerShell** 键入``pip3 install PyQt5``  安装PyQt
[注意]：在安装PyQt模块之前请确保已经正确安装SIP模块。
