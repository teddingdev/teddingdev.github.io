---
title: 通过 github actions 部署 github pages
date: 2023-06-13 15:46:41
updated: 2023-06-20 13:23:20
tags:
    - github
    - github-pages
    - github-actions
    - hexo 
categories:
    - github
    - github-pages
    - github-actions
---

这篇文章提供一个思路，利用 `git` 分支实现 `git source` 和 `github pages` 在同一个`repo`。
<!-- more -->
从一开始我的博客 `source` 和 `github pages` 就分别在两个不同的 `repo` 并利用 `git submodule` 来管理，每次发布文章都是通过 `hexo` 自己的部署功能，久而久之有点疲倦，便想着尝试利用 `github actions` 在同一个 `repo` 部署。


#### 首先

github pages 是允许我们选择一个分支来部署静态页面的，

#### 其次

我们只需要新建一个空白分支（eg: github-pages）用来承载静态文件就可以,

#### 最后

当我们 `push` 之后，会通过 `github actions` 触发编译 ，将编译产物 `push` 到我们的空白分支就好了。

#### 补充

创建钉钉群并添加钉钉消息机器人，可以在 `github action` 编译完成之后 给我们的发送群消息通知。建议将钉钉的消息 `token` 以 `github-secrets` 的形式单独存储，防止被恶意利用。 

PS：关于如何新建一个空白分支各位观众可以自行搜索。


#### Action

下面是 `github actions` 的一个实现，其中 `BRANCH_SOURCE` 和 `BRANCH_GITHUB_PAGES` 变量可以替换为自己的分支名称，默认是 `master` 和 `github-pages`。

```yaml
name: Deployment

on:
  push:
    branches: [master]
    paths-ignore: [.github/workflows/**]

env:
  TZ: Asia/Shanghai
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ACTION_BOT_NAME: github-actions[bot]
  ACTION_BOT_EMAIL: github-actions[bot]@users.noreply.github.com
  BRANCH_SOURCE: master
  BRANCH_GITHUB_PAGES: github-pages
  DINGTALK_ROBOT_ACCESS_TOKEN: ${{ secrets.DINGTALK_ROBOT_ACCESS_TOKEN }}

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - name: Checkout ${{ env.BRANCH_SOURCE }}
        uses: actions/checkout@v3
        with:
          path: ${{ env.BRANCH_SOURCE }}

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Build
        run: |
          cd ${{ env.BRANCH_SOURCE }}
          npm install
          npm run build

      - name: Checkout ${{ env.BRANCH_GITHUB_PAGES }}
        uses: actions/checkout@v3
        with:
          ref: ${{ env.BRANCH_GITHUB_PAGES }}
          path: ${{ env.BRANCH_GITHUB_PAGES }}

      - name: Copy Files
        run: |
          cp -r ./${{ env.BRANCH_SOURCE }}/public/* ./${{ env.BRANCH_GITHUB_PAGES }}
          cp ./${{ env.BRANCH_SOURCE }}/.gitignore ./${{ env.BRANCH_GITHUB_PAGES }}
          ls -al ./${{ env.BRANCH_GITHUB_PAGES }}
          date +%Y-%m-%d\ %H:%M:%S\ %z > ./${{ env.BRANCH_GITHUB_PAGES }}/generated.txt
          ls -al ./${{ env.BRANCH_GITHUB_PAGES }}

      - name: Deploy
        run: |
          cd ${{ env.BRANCH_GITHUB_PAGES }}
          git add .
          git config user.name $ACTION_BOT_NAME
          git config user.email $ACTION_BOT_EMAIL
          git commit -m "Site updated: $(date +%Y-%m-%d\ %H:%M:%S\ %z)"
          git push

      - name: DingTalk
        run: |
          cd ${{ env.BRANCH_SOURCE }}
          curl --request POST \
          --url 'https://oapi.dingtalk.com/robot/send?access_token='$DINGTALK_ROBOT_ACCESS_TOKEN \
          --header 'Content-Type: application/json' \
          --data '{
            "msgtype": "text",
            "at": {
              isAtAll: true
              },
            "text": {
              "content": "#### Github-actions[bot] Notification #### \n*项目名称： teddingdev.github.io \n*日期： '"$(date +%Y-%m-%d\ %H:%M:%S\ %z)"' \n*路径： '"$(pwd)"' \n*Git地址： \n'"$(git remote -v)"' \n*分支： '"$(git name-rev --name-only HEAD)"' \n*最后提交： \n'"$(git show -s)"' \n*Build机器信息： \n'"$(uname -a)"' \n*Build机器IP： \n'"$(ip address | grep 'inet' | awk '{print $2}')"' \n\n我就是我, 是颜色不一样的烟火"
              }
            }'
```
