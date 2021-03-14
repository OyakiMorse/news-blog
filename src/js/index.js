const burger = document.getElementById('burger')
const menu = document.getElementById('menu')
const scrollBtn = document.querySelector('.scroll-btn')

const header = document.getElementById('header')
const headerMenu = document.getElementById('header__menu')



window.addEventListener('scroll', () => {
  if (
    document.body.scrollTop > 150 ||
    document.documentElement.scrollTop > 150
  ) {
    scrollBtn.style.display = 'block'
    header.style.height = 50 + 'px'
    headerMenu.style.height = 30 + 'px'
  } else {
    scrollBtn.style.display = 'none'
    header.style.height = 80 + 'px'
    headerMenu.style.height = 60 + 'px'
  }
})

scrollBtn.addEventListener('click', () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  })
})

burger.addEventListener('click', show)
menu.addEventListener('click', close)

function show() {
  menu.classList.toggle('toggleMenu')
  burger.classList.toggle('burgerToggle')
}

function close() {
  menu.classList.toggle('toggleMenu')
  burger.classList.toggle('burgerToggle')
}
