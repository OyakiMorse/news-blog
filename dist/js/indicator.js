const scrollIndicator = document.querySelector('.scroll-indicator')

window.addEventListener('scroll', () => {
    
    let windowHeight = window.innerHeight
    let maxScrollHeight = document.documentElement.scrollHeight - windowHeight
  
    if(scrollIndicator.style.width = null) {
      scrollIndicator.style.width = 1 + 'px'
    }else{
      scrollIndicator.style.width = `${window.scrollY / maxScrollHeight * 100}%`
    }
  
  
    
  })
  