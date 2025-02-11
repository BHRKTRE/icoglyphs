const themeValue = JSON.parse(localStorage.getItem('colorMode'));
const defaultColorMode = 'grey';

document.body.setAttribute('data-color-mode', themeValue ?? defaultColorMode);
