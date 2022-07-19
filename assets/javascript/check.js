// onload
if (localStorage.getItem('shortcut-bar') === 'false') {
    document.getElementById('shortcut-bar').checked = false;
    document.getElementById('toolbar-mother').style.display = 'none';
}

if (localStorage.getItem('weather-check') === 'false') {
    document.getElementById('weather-check').checked = false;
    document.getElementById('weather').style.display = 'none';
}

if (localStorage.getItem('search-bar') === 'false') {
    document.getElementById('search-bar').checked = false;
    document.getElementById('search-time').style.display = 'none';
}

if (localStorage.getItem('search-bar') === 'false') {
    document.getElementById('search-bar').checked = false;
    document.getElementById('search-time').style.display = 'none';
}

if (localStorage.getItem('Text') === 'false') {
    document.getElementById('Text').checked = false;
    document.getElementById('Header-name').style.display = 'none';
}

// functions
function role_toggle(value) {
    console.log('This function called')
    if (!document.getElementById(value).checked) localStorage.setItem(value, 'false');
    else localStorage.setItem(value, 'true');
}
