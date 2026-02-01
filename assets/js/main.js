/*=============== HOME SPLIT TEXT ===============*/
// Simplified text animation that works with standard anime.js
const professional1 = document.querySelector('.home__professional-1');
const professional2 = document.querySelector('.home__professional-2');

if (professional1 && professional2) {
  // Split text into individual characters manually
  const text1 = professional1.textContent;
  const text2 = professional2.textContent;
  
  professional1.innerHTML = '';
  professional2.innerHTML = '';
  
  // Wrap each character in a span for animation
  text1.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    professional1.appendChild(span);
  });
  
  text2.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    professional2.appendChild(span);
  });
  
  // Animate the characters
  const chars1 = professional1.querySelectorAll('span');
  const chars2 = professional2.querySelectorAll('span');
  
  anime.timeline({loop: true})
    .add({
      targets: chars1,
      translateY: ['100%', '0%'],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 900,
      delay: anime.stagger(80)
    })
    .add({
      targets: chars1,
      translateY: [0, '-100%'],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 900,
      delay: anime.stagger(80, {start: 4000})
    });
  
  anime.timeline({loop: true})
    .add({
      targets: chars2,
      translateY: ['100%', '0%'],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 900,
      delay: anime.stagger(80)
    })
    .add({
      targets: chars2,
      translateY: [0, '-100%'],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 900,
      delay: anime.stagger(80, {start: 4000})
    });
}

/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,
  
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
  tab.addEventListener('click', () =>{
    const targetSelector = tab.dataset.target,
          targetContent = document.querySelector(targetSelector)

          //Disable all content and active tabs
    tabContents.forEach((content)=>content.classList.remove('work-active'))
    tabs.forEach((t)=>t.classList.remove('work-active'))

    //Activate target content and tab
    targetContent.classList.add('work-active')
    tab.classList.add('work-active')
  })
})


/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button')

servicesButtons.forEach(button =>{
  const heightInfo = document.querySelector('.services__info')
  if (heightInfo) {
    heightInfo.style.height = heightInfo.scrollHeight + "px"
  }
  
  button.addEventListener('click', () =>{
    const servicesCards = document.querySelectorAll('.services__card'),
          currentCard = button.parentNode,
          currentInfo = currentCard.querySelector('.services__info'),
          isCardOpen = currentCard.classList.contains('services-open')

    servicesCards.forEach(card =>{
      card.classList.replace('services-open', 'services-close')

      const info = card.querySelector('.services__info')
      if (info) {
        info.style.height = '0'
      }
    })

    if(!isCardOpen){
      currentCard.classList.replace('services-close', 'services-open')
      if (currentInfo) {
        currentInfo.style.height = currentInfo.scrollHeight + "px"
      }
    }
  })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/


/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
      copyEmailElement = document.getElementById('contact-email')

if (copyBtn && copyEmailElement) {
  const copyEmail = copyEmailElement.textContent

  copyBtn.addEventListener('click', ()=> {
    navigator.clipboard.writeText(copyEmail).then(() =>{
      copyBtn.innerHTML = 'Email Copied <i class="ri-check-line"></i>'

      setTimeout(() => {
        copyBtn.innerHTML = 'Copy Email <i class="ri-file-copy-line"></i>'
      }, 2000)
    }).catch(err => {
      console.error('Failed to copy email:', err)
    })
  })
}


/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.querySelector('.footer-year'),
    currentYear = new Date().getFullYear()

if(textYear) {
  textYear.textContent = currentYear
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id,
        top = section.offsetTop - 50,
        height = section.offsetHeight,
        link = document.querySelector('.nav__menu a[href*=' + id + ']')

    if(!link) return

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
  })
}

window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
if (cursor) {
  let mouseX = 0, mouseY = 0

  const cursorMove = () => {
    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`
    cursor.style.transform = 'translate(-50%, -50%)'

    requestAnimationFrame(cursorMove)
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  cursorMove()
  
  /* Hide custom cursor on links */
  const links = document.querySelectorAll('a')

  links.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hide-cursor')
    })
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hide-cursor')
    })
  })
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
    // reset: true,
  })

  sr.reveal('.home__image, .projects__container, .work__container')
  sr.reveal('.home__data', {delay: 900, origin: 'bottom'})
  sr.reveal('.home__info', {delay: 1200, origin: 'bottom'})
  sr.reveal('.home__social, .home__cv', {delay: 1500, origin: 'bottom'})
  sr.reveal('.about__data', {origin: 'left'})
  sr.reveal('.about__image', {origin: 'right'})
  sr.reveal('.services__card', {interval: 100})
}