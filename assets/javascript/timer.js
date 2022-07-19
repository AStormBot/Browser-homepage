let timing = true;

function get(ID) {
    return document.getElementById(ID);
}

function disabled_toggle(element) {
    element.disabled = !element.disabled;
}

function start() {
    const button = get('submit-timer');
    const min = get('min');
    const sec = get('sec');

    if (timing) {
        timing = false;

        button.innerHTML = 'Stop';

        disabled_toggle(min);
        disabled_toggle(sec);

        if (!min.value) min.value = 0;
        if (!sec.value) sec.value = 1;

        let time_data = {
            min: parseInt(min.value),
            sec: parseInt(sec.value)
        };

        let i = 0;

        const time = setInterval(() => {
            if (!timing) {
                if (time_data.sec === 1 && time_data.min === 0) {
                    timing = true;
                }

                if (time_data.sec === 0) {
                    time_data.sec = 60;
                    time_data.min--;
                }

                time_data.sec--;

                min.value = time_data.min;
                sec.value = time_data.sec;
            } else {
                button.innerHTML = "Start";
                clearInterval(time);
                disabled_toggle(min);
                disabled_toggle(sec);
            }
        }, 1000);
    } else {
        button.innerHTML = 'Start';

        timing = true;

        disabled_toggle(min);
        disabled_toggle(sec);
    }
}
