const html_outputs = {
    timer: `<div class="timer rounded-4" style="height: 200px; margin-top: 200px; transform: translateY(-50%)">
                        <div class="input-group">
                            <input type="number" class="form-control text-light bg-dark border-0"
                                   placeholder="Min" min="0" id="min">
                            <span class="input-group-text fw-bold bg-gray text-light border-0">:</span>
                            <input type="number" class="form-control text-light bg-dark border-0 disabled"
                                   placeholder="Sec" min="1" max="60" id="sec">
                        </div>
                        <div class="row justify-content-center my-5">
                            <div class="col-3">
                                <button class="btn btn-dark text-light px-3 py-2" id="submit-timer" onclick="start()">Start</button>
                            </div>
                        </div>
                    </div>`,
    calendar: '<iframe src="./assets/iframe/calendar.html" style="border-radius: 12px;height: 500px;"></iframe>',
    todo:`<iframe src="./assets/iframe/todo/todo.html" style="height: 450px; border-radius: 12px;" frameborder="0"></iframe>`,
    note: "<textarea id='note-text' placeholder='Enter your text here' style='height: 400px; margin-top: 50%; transform: translateY(-50%)' class='text-light border-0 rounded-3 textarea'></textarea>"
}

let close = {
    timer: true,
    calendar: false,
    weather: true,
    todo: false
}
let note_showing = false
// window
const target = $('#target');
$('#timer').click(() => {
    target.slideUp();
    
    target.html(html_outputs.timer);
    
    target.slideDown();
})
$('#calendar').click(() => {
    target.slideUp();

    target.html(html_outputs.calendar);

    target.slideDown();
})
$('#to-do').click(() => {
    target.slideUp();

    target.html(html_outputs.todo);

    target.slideDown();
})
$('#note').click(() => {
    target.slideUp();
    target.html(html_outputs.note);
    if (!note_showing) {
        save();
    }else {
        load();
    }
    target.slideDown();
    note_showing = !note_showing;
})
$('#close').click( () => {
    target.slideUp();
    save();
})

