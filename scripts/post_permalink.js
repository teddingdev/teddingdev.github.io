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
