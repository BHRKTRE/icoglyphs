const modes = JSON.parse(localStorage.getItem('modes'));
const themeValue = modes ? modes.colorMode : 'grey';

document.body.setAttribute('data-color-mode', themeValue);
