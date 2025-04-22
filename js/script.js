const heroBtn = document.querySelector('.header__hero-button')
const burgerBtn = document.querySelector('.nav-mobile__burger-btn')
const navMenu = document.querySelector('.nav-mobile__items')
const menuItems = document.querySelectorAll('.nav__item')

const heroBtnAnimation = () => {
	heroBtn.classList.add('button-animation')

	setTimeout(() => {
		heroBtn.classList.remove('button-animation')
	}, 1000) // Usunięcie klasy po 1 sekundzie
}


menuItems.forEach(item =>{
	item.addEventListener('click', () => {
		navMenu.classList.remove('nav-mobile__items--active')
	})
})

document.addEventListener('DOMContentLoaded', () => {
	setInterval(heroBtnAnimation, 7000)
})

burgerBtn.addEventListener('click', () => {
	burgerBtn.classList.toggle('is-active')
	navMenu.classList.toggle('nav-mobile__items--active')
})
