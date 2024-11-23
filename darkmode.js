let switcher = document.querySelector('.switcher');
let header = document.querySelector('body');
let icon = 'moon'

const setDarkMode = (isDarkMode) => {
    if (isDarkMode) {
        header.classList.add('darkMode');
        switcher.classList.add('darkMode');
        icon = 'sun';
    } else {
        header.classList.remove('darkMode');
        switcher.classList.remove('darkMode');
        icon = 'moon';
    }
    switcher.firstElementChild.classList = `fa-regular fa-${icon}`

}

const savedDarkMode = localStorage.getItem('darkMode') === 'true';
setDarkMode(savedDarkMode)

switcher.addEventListener('click', () => {
    const isDarkMode = header.classList.toggle('darkMode')
    switcher.classList.toggle('darkMode')
    icon = isDarkMode ? 'sun' : 'moon';
    switcher.firstElementChild.classList = `fa-regular fa-${icon}`
    localStorage.setItem('darkMode', isDarkMode)
});