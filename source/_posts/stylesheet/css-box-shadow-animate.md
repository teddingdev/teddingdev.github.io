---
title: CSS box-shadow 动画
date: 2023-06-28 14:08:29
tags:
    - 前端
    - css
    - animate
categories:
    - 前端
    - css
    - animate
---

偶然看到效果不错使用 `box-shadow` 的 `css` 动画。
点此在 <a href="/skip_render/css-animate/box-shadow.html" target="blank">[新页面预览]</a>
<!-- more -->
### 效果预览
<iframe title="box shadow animate" width="300" height="300" style="border: none; width: 100%" src="/skip_render/css-animate/box-shadow.html">
</iframe>

### 代码
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shadow</title>
    <style>
        .box {
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            position: relative;
            position: absolute;
            margin-top: -100px;
            margin-left: -100px;
        }

        .box:after,
        .box:before {
            content: "";
            border-radius: 66%;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            -webkit-transform-origin: center center;
            -ms-transform-origin: center center;
            transform-origin: center center;
        }

        .box:after {
            box-shadow: inset 0 23.33333333px 0 rgba(250, 250, 0, 0.6),
                inset 23.33333333px 0 0 rgba(250, 200, 0, 0.6),
                inset 0 -23.33333333px 0 rgba(250, 150, 0, 0.6),
                inset -23.33333333px 0 0 rgba(250, 100, 0, 0.6);
            -webkit-animation: rotar 2s -0.5s linear infinite;
            animation: rotar 2s -0.5s linear infinite;
        }

        .box:before {
            box-shadow: inset 0 23.33333333px 0 rgba(0, 250, 250, 0.6),
                inset 23.33333333px 0 0 rgba(0, 200, 200, 0.6),
                inset 0 -23.33333333px 0 rgba(0, 150, 200, 0.6),
                inset -23.33333333px 0 0 rgba(0, 200, 250, 0.6);
            -webkit-animation: rotarIz 2s -0.5s linear infinite;
            animation: rotarIz 2s -0.5s linear infinite;
        }

        @-webkit-keyframes rotar {
            0% {
                -webkit-transform: rotateZ(0deg) scaleX(1) scaleY(1);
                transform: rotateZ(0deg) scaleX(1) scaleY(1);
            }

            50% {
                -webkit-transform: rotateZ(180deg) scaleX(0.82) scaleY(0.95);
                transform: rotateZ(180deg) scaleX(0.82) scaleY(0.95);
            }

            100% {
                -webkit-transform: rotateZ(360deg) scaleX(1) scaleY(1);
                transform: rotateZ(360deg) scaleX(1) scaleY(1);
            }
        }

        @keyframes rotar {
            0% {
                -webkit-transform: rotateZ(0deg) scaleX(1) scaleY(1);
                transform: rotateZ(0deg) scaleX(1) scaleY(1);
            }

            50% {
                -webkit-transform: rotateZ(180deg) scaleX(0.82) scaleY(0.95);
                transform: rotateZ(180deg) scaleX(0.82) scaleY(0.95);
            }

            100% {
                -webkit-transform: rotateZ(360deg) scaleX(1) scaleY(1);
                transform: rotateZ(360deg) scaleX(1) scaleY(1);
            }
        }

        @-webkit-keyframes rotarIz {
            0% {
                -webkit-transform: rotateZ(0deg) scaleX(1) scaleY(1);
                transform: rotateZ(0deg) scaleX(1) scaleY(1);
            }

            50% {
                -webkit-transform: rotateZ(-180deg) scaleX(0.95) scaleY(0.85);
                transform: rotateZ(-180deg) scaleX(0.95) scaleY(0.85);
            }

            100% {
                -webkit-transform: rotateZ(-360deg) scaleX(1) scaleY(1);
                transform: rotateZ(-360deg) scaleX(1) scaleY(1);
            }
        }

        @keyframes rotarIz {
            0% {
                -webkit-transform: rotateZ(0deg) scaleX(1) scaleY(1);
                transform: rotateZ(0deg) scaleX(1) scaleY(1);
            }

            50% {
                -webkit-transform: rotateZ(-180deg) scaleX(0.95) scaleY(0.85);
                transform: rotateZ(-180deg) scaleX(0.95) scaleY(0.85);
            }

            100% {
                -webkit-transform: rotateZ(-360deg) scaleX(1) scaleY(1);
                transform: rotateZ(-360deg) scaleX(1) scaleY(1);
            }
        }
    </style>
</head>

<body>
    <div class="box">
    </div>
</body>

</html>
```
