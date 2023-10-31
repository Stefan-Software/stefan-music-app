const homeScreen = document.getElementById('homeScreen')
const userPage = document.getElementById('userPage')
const addSong = document.getElementById('addSong')
const removePage = document.getElementById('removePage')
const langPage = document.getElementById('langPage')

const home = {
    ico: document.getElementById('home-ico'),
    text: document.getElementById('home-text'),
}

home.ico.classList.add('active')
home.text.classList.add('active')

const user = {
    ico: document.getElementById('usr-ico'),
    text: document.getElementById('usr-text'),
}

const add = {
    ico: document.getElementById('add-ico'),
    text: document.getElementById('add-text'),
}

const remove = {
    ico: document.getElementById('remove-ico'),
    text: document.getElementById('remove-text'),
}

const lang = {
    ico: document.getElementById('lang-ico'),
    text: document.getElementById('lang-text')
}

function navigateTo(page) {
    event.preventDefault()

    homeScreen.style.display = 'none'
    userPage.style.display = 'none'
    addSong.style.display = 'none'
    removePage.style.display = 'none'
    langPage.style.display = 'none'

    home.ico.classList.remove('active')
    home.text.classList.remove('active')
    user.ico.classList.remove('active')
    user.text.classList.remove('active')
    add.ico.classList.remove('active')
    add.text.classList.remove('active')
    remove.ico.classList.remove('active')
    remove.text.classList.remove('active')
    lang.ico.classList.remove('active')
    lang.text.classList.remove('active')

    switch (page) {
        case 'home':
            setTimeout(() => {
                homeScreen.style.display = 'block'
                home.ico.classList.add('active')
                home.text.classList.add('active')
            }, 100)
            break

        case 'user':
            setTimeout(() => {
                user.ico.classList.add('active')
                user.text.classList.add('active')
                userPage.style.display = 'block'
            }, 100)
            break

        case 'add':
            setTimeout(() => {
                add.ico.classList.add('active')
                add.text.classList.add('active')
                addSong.style.display = 'block'
            }, 100)
            break

        case ('remove'):
            setTimeout(() => {
                remove.ico.classList.add('active')
                remove.text.classList.add('active')
                removePage.style.display = 'block'
            }, 100)
            break

        case ('lang'):
            setTimeout(() => {
                lang.ico.classList.add('active')
                lang.text.classList.add('active')
                langPage.style.display = 'block'
            }, 100)
            break

        default:
            break
    }
}
