if (localStorage.getItem('animation-text') === "gamer") {
    $('#timer').html('<i class="bi bi-mouse-fill"></i>')
}


function finished(clicks_count, times, cps) {
    cps.html(clicks_count * 2 / 10);
}

function startUp() {
    let clicks_count = 0;
    let times = 0;
    const clicks = $('#cps-clicks');
    const time = $('#cps-time');
    const cps = $('#cps-cps')

    document.getElementById('cps').addEventListener('click', () => {
        $('#cps #cps-blocked').css('display', 'none');
        $('#cps .brobro').slideDown();
        if (times < 1250) {
            clicks_count++;
        }

        clicks.html(clicks_count);
    });

    const cps_worker = setInterval(() => {
        times++;
        time.html(times / 250);
        if (times >= 1250) {
            clearInterval(cps_worker);
            finished(clicks_count, times, cps);
        }
    }, 1)
}

