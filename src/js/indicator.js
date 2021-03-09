const scrollIndicator = document.querySelector('.scroll-indicator')

window.addEventListener('scroll', () => {
  let windowHeight = window.innerHeight
  let maxScrollHeight = document.documentElement.scrollHeight - windowHeight

  scrollIndicator.style.width = `${(window.scrollY / maxScrollHeight) * 100}%`
})
