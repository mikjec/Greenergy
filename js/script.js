const heroBtn = document.querySelector('.header__hero-button')
const burgerBtn = document.querySelector('.nav-mobile__burger-btn')
const navMenu = document.querySelector('.nav-mobile__items')
const menuItems = document.querySelectorAll('.nav__item')
const footerYear = document.querySelector('.footer__year')
const slider = $('#reviews-slider')
const contactForm = document.querySelector('#contactForm')

const heroBtnAnimation = () => {
	heroBtn.classList.add('button-animation')

	setTimeout(() => {
		heroBtn.classList.remove('button-animation')
	}, 1000) // Usunięcie klasy po 1 sekundzie
}
const handleDate = () => {
	footerYear.textContent = new Date().getFullYear()
}

const setForm = () => {
	const saved = localStorage.getItem('kontaktFormularz')
	if (!saved) return

	const data = JSON.parse(saved)

	Object.keys(data).forEach(key => {
		const field = contactForm.elements[key]
		if (field.type === 'checkbox') {
			field.checked = data[key]
		} else {
			field.value = data[key]
		}
	})
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

contactForm.addEventListener('submit', e => {
	e.preventDefault()

	const formData = new FormData(e.target)
	const data = {}

	formData.forEach((value, key) => {
		data[key] = value
	})
	localStorage.setItem('kontaktFormularz', JSON.stringify(data))
	alert('Formularz został zapisany!')
})

document.addEventListener('DOMContentLoaded', () => {
	setForm()
	handleDate()
	initReviewsSlider()
	setInterval(heroBtnAnimation, 7000)
})

burgerBtn.addEventListener('click', () => {
	burgerBtn.classList.toggle('is-active')
	navMenu.classList.toggle('nav-mobile__items--active')
})
