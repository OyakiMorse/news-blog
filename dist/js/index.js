const burger = document.getElementById('burger')
const menu = document.getElementById('menu')

burger.addEventListener('click', show)
menu.addEventListener('click', close)

close()

function show() {
  menu.style.top = 0
}

function close() {
  menu.style.top = '-150%'
}
