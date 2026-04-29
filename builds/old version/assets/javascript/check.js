// onload
if (localStorage.getItem('shortcut-bar') === 'false') {
    document.getElementById('shortcut-bar').checked = false;
    document.getElementById('toolbar-mother').style.display = 'none';
}

if (localStorage.getItem('weather-check') === 'false') {
    document.getElementById('weather-check').checked = false;
    document.getElementById('weather').style.display = 'none';
}

if (localStorage.getItem('clock-check') === 'false') {
    document.getElementById('clock-check').checked = false;
    document.getElementById('clock').style.display = 'none';
}

if (localStorage.getItem('search-bar') === 'false') {
    document.getElementById('search-bar').checked = false;
    document.getElementById('search-time').style.display = 'none';
}

if (localStorage.getItem('Text') === 'false') {
    document.getElementById('Text').checked = false;
    document.getElementById('Header-name').style.display = 'none';
}

if (localStorage.getItem('clock_cheAck') === "false") {
    document.getElementById('clock-check').checked = false;
}

if (localStorage.getItem('background-type')) {
    document.getElementById('background-type').value = localStorage.getItem('background-type');
    if (localStorage.getItem('background-type') === 'image') {
        background();
    }
    else if (localStorage.getItem('background-type') === 'motion') {
        motion()

    }
}



// functions
function role_toggle(value) {
    console.log('This function called');
    if (!document.getElementById(value).checked) localStorage.setItem(value, 'false');
    else localStorage.setItem(value, 'true');
}
