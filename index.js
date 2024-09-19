
//* JavaScript for Navbar
const links = document.querySelector('.links')
const hamMenu = document.querySelector('.ham-menu')

hamMenu.addEventListener('click', () => {
    links.classList.toggle('active')
})