const html_outputs = {
	timer: `<div class="timer rounded-4" style="height: 200px; margin-top: 200px; transform: translateY(-50%)">
                        <div class="input-group">
                            <input type="number" class="form-control text-light bg-dark border-0"
                                   placeholder="Minute" min="0" id="min">
                            <span class="input-group-text fw-bold bg-gray text-light border-0">:</span>
                            <input type="number" class="form-control text-light bg-dark border-0 disabled"
                                   placeholder="Second" min="1" max="60" id="sec">
                        </div>
                        <div class="row justify-content-center my-5">
                            <div class="col-3">
                                <button class="btn btn-dark text-light px-3 py-2" id="submit-timer" onclick="start()">Start</button>
                            </div>
                        </div>
                    </div>`,
	calendar:
		'<iframe src="./assets/iframes/calendar.html" style="border-radius: 12px;height: 500px;"></iframe>',
	todo: `<iframe src="./assets/iframes/todo/todo.html" style="height: 450px; border-radius: 12px;" frameborder="0"></iframe>`,
	note: "<textarea id='note-text' placeholder='Type your text in this section...' style='height: 400px; margin-top: 50%; transform: translateY(-50%)' class='text-light border-0 rounded-3 textarea'></textarea>",
};

let timer_showing = false;
let todo_showing = false;
let calendar_showing = false;
let note_showing = false;

// window
const target = $("#target");
target.slideDown();
target.slideUp();
$("#timer").click(() => {
	if (timer_showing) {
		target.slideUp();
	} else {
		target.html(html_outputs.timer);
		target.slideDown();
	}
	timer_showing = !timer_showing;
});
$("#calendar").click(() => {
	if (calendar_showing) {
		target.slideUp();
	} else {
		target.html(html_outputs.calendar);
		target.slideDown();
	}
	calendar_showing = !calendar_showing;
});
$("#to-do").click(() => {
	if (todo_showing) {
		target.slideUp();
	} else {
		target.html(html_outputs.todo);
		target.slideDown();
	}
	todo_showing = !todo_showing;
});
$("#note").click(() => {
	if (note_showing) {
		target.slideUp();
		save();
	} else {
		target.html(html_outputs.note);
		load();
		target.slideDown();
	}
	note_showing = !note_showing;
});
$("#close").click(() => {
	target.slideUp();
	if (note_showing) {
		save();
	}
	timer_showing = false;
	note_showing = false;
	todo_showing = false;
	calendar_showing = false;
});

