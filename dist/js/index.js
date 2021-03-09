const burger = document.getElementById('burger')
const menu = document.getElementById('menu')

// const scrollIndicator = document.querySelector('.scroll-indicator')
const scrollBtn = document.querySelector('.scroll-btn')




window.addEventListener('scroll', () => {
  if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = 'block'
  }else {
    scrollBtn.style.display = 'none'
  }

  // let windowHeight = window.innerHeight
  // let maxScrollHeight = document.documentElement.scrollHeight - windowHeight

  // if(scrollIndicator.style.width = null) {
  //   scrollIndicator.style.width = 1 + 'px'
  // }else{
  //   scrollIndicator.style.width = `${window.scrollY / maxScrollHeight * 100}%`
  // }


  
})


scrollBtn.addEventListener('click', () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
})


close()
burger.addEventListener('click', show)
menu.addEventListener('click', close)




function show() {
  menu.style.top = 0
}

function close() {
  menu.style.top = '-150%'
}
