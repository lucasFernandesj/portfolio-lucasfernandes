function reveal(element) {
  var all = document.getElementsByTagName('*')
  var num = element.className.charAt(1)
  for (var i = 0; i < all.length; i++) {
    if (all[i].classList.contains(`a${num}`)) {
      all[i].classList.toggle('visible')
    }
  }
}
