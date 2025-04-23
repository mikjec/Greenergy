const heroBtn = document.querySelector('.header__hero-button')
const burgerBtn = document.querySelector('.nav-mobile__burger-btn')
const navMenu = document.querySelector('.nav-mobile__items')
const menuItems = document.querySelectorAll('.nav__item')
const footerYear = document.querySelector('.footer__year')
const slider = $('#reviews-slider')

const heroBtnAnimation = () => {
	heroBtn.classList.add('button-animation')

	setTimeout(() => {
		heroBtn.classList.remove('button-animation')
	}, 1000) // Usunięcie klasy po 1 sekundzie
}
const handleDate = () =>{
	footerYear.textContent=new Date().getFullYear()
}

async function initReviewsSlider() {
	try {
		const res = await fetch('./reviews.json')
		if (!res.ok) throw new Error(`HTTP ${res.status}`)
		const data = await res.json()

		data.forEach(opinion => {
			slider.append(`
          <article class="review">
            <header class="review__header">
              <strong class="review__name">${opinion.name}</strong>
              <span class="review__rating">${'<i class="fa-solid fa-star"></i>'.repeat(opinion.rating)}</span>
            </header>
            <p class="review__text">${opinion.text}</p>
          </article>
        `)
		})
		slider.slick({
			dots: false,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000,
			adaptiveHeight: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{ breakpoint: 1024, settings: { slidesToShow: 2 } },
				{ breakpoint: 640, settings: { slidesToShow: 1 } },
			],
		})
	} catch (err) {
		console.error('Nie udało się zainicjować karuzeli:', err)
	}
}

menuItems.forEach(item => {
	item.addEventListener('click', () => {
		navMenu.classList.remove('nav-mobile__items--active')
	})
})

document.addEventListener('DOMContentLoaded', () => {
	handleDate()
	initReviewsSlider()
	setInterval(heroBtnAnimation, 7000)
})

burgerBtn.addEventListener('click', () => {
	burgerBtn.classList.toggle('is-active')
	navMenu.classList.toggle('nav-mobile__items--active')
})
