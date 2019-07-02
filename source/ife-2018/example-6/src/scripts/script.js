// window.onload = function() {
let curImgIdx = 0
console.log(curImgIdx)
let _imgs = document.getElementsByClassName('img')
let imgs = []
for (let i = 0; i < _imgs.length; i++) {
  imgs.push(_imgs[i])
}
// console.log(_imgs)
let _thumbnails = document.getElementsByClassName('thumbnail')
let thumbnails = []
for (let i = 0; i < _thumbnails.length; i++) {
  thumbnails.push(_thumbnails[i])
}
// console.log(thumbnails)

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener('click', function show() {
    let className = 'animate' + i
    //迭代
    imgs.forEach((item, j) => {
      let className = 'animate' + j
      removeClass(item, className)
      if (j !== i && j !== curImgIdx) {
        // console.log(imgs[j])
        item.style = 'z-index:0;display:none'
      }
    })
    // 回调主函数
    imgs[curImgIdx].style = 'z-index:1'
    imgs[i].style = 'z-index:99'
    addClass(imgs[i], className)
    curImgIdx = i
    // console.log(curImgIdx)
  })
}
// }

/**
 *
 * @param {object} element HTML元素
 * @param {string} value 类选择器
 * @returns void
 *
 */

toggleClass = function(element, value) {
  console.log(element)
  let className = element.className.split(/\s+/)
  for (let i = 0; i < className.length; i++) {
    if (className[i] === value) {
      className.splice(i, 1)
      console.log(className)
      element.className = className.join(' ')
      return
    } else if (i === className.length - 1) {
      // console.log('ok')
      className.push(value)
      element.className = className.join(' ')
      return
    }
  }
}

removeClass = function(element, value) {
  let className = element.className.split(/\s+/)
  for (let i = 0; i < className.length; i++) {
    if (className[i] === value) {
      className.splice(i, 1)
      // console.log(className)
      element.className = className.join(' ')
    }
  }
}

addClass = function(element, value) {
  let className = element.className.split(/\s+/)
  for (let i = 0; i < className.length; i++) {
    if (className[i] !== value && i == className.length - 1) {
      className.push(value)
      element.className = className.join(' ')
    }
  }
}
