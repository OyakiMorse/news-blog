const scrollIndicator = document.querySelector('.scroll-indicator')

const lightbox = document.createElement('div')
const images = document.getElementById('article').querySelectorAll('img')

window.addEventListener('scroll', () => {
  let windowHeight = window.innerHeight
  let maxScrollHeight = document.documentElement.scrollHeight - windowHeight

  scrollIndicator.style.width = `${(window.scrollY / maxScrollHeight) * 100}%`
})

lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

images.forEach((image) => {
  image.addEventListener('click', (e) => {
    lightbox.classList.add('active')
    const img = document.createElement('img')
    img.src = image.src
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
  })
})

lightbox.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})
