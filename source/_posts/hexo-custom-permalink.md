---
title: hexo 使用自定义脚本创建永久链接
date: 2023-07-20 19:34:01
updated: 2023-07-21 13:44:10
tags:
    - hexo
    - permalink

categories:
    - hexo
    - permalink
---

在使用自定义脚本之前一直使用 `hexo` 配置的 `年月日 + hash` 的方式生成的永久链接，而且一直是本地生成 + 手动部署的静态文件。
<!-- more -->
起因是换了一台电脑部署之后永久链接都被更新了，经过查阅原来是`hexo`对于文件`hash`的计算使用了文件的`创建时间`，但并不是所有的 操作/文件系统 都有`创建时间`属性，当在 `unix-like` 系统中 `build` 时，便出现了所有的永久链接都重新生成的问题。这个影响会搜索引擎的收录和用户书签，所以创建一个不会被改变的永久链接就迫在眉睫。

>下面的是本站使用的自定义脚本，使用了 md 文件中的 date 字段转换成 unix 时间的16进制。因为这个时间精确到了秒，所以在大部分非极端的情况下这个时间对于每一个 markdown 文件都是唯一的。
```javascript
/**
 * 根据 创建时间 自定义文章永久链接，使用子文件夹管理文章且不改变文章永久链接
 * e.g. "source/_posts/2019/slug.md" => "https://hexo.example/year/month/day/date_hexo.html"
 */
hexo.extend.filter.register('post_permalink', function (post_permalink) {
    const [date, time] = post_permalink.split('|');
    const [year, month, day] = date.split('-')
    const date_path = `${year}/${month}/${day}`;
    const unixTime = new Date(`${date}T${time}.000+08:00`).getTime()
    const date_hex = Number.parseInt(unixTime, 10).toString(16);
    const permalink = `${date_path}/${date_hex}.html`;
    return permalink;
});
```