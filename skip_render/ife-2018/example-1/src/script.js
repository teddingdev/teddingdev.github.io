let items = document.getElementsByClassName('menu-item')
let chgClass = document.getElementsByClassName('chg-class')

chgClass[0].addEventListener('click', function() {
  toggleClass(items[0], 'menu-item-active')
})

toggleClass = function(element, className) {
  console.log(element)
  let _className = element.className.split(/\s+/)
  for (let i = 0; i < _className.length; i++) {
    if (_className[i] === className) {
      _className.splice(i, 1)
      console.log(_className)
      element.className = _className.join(' ')
      return
    } else if (i === _className.length - 1) {
      console.log('ok')
      _className.push(className)
      element.className = _className.join(' ')
      return
    }
  }
}
