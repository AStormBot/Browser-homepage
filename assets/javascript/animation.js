let name12 = document.getElementById("Header-name");
const hour = new Date().getHours();
const name = localStorage.getItem("user-name");
const animation_check = localStorage.getItem("user-animation") || "typing-animation";
const text3 = localStorage.getItem('animation-text') || "normal";
let random;

if (hour > 6 && hour < 12) {
    if (text3 === "normal") {
        random = headerNames.normal.morning;
    }else if (text3 === "boss") {
        random = headerNames.boss.morning;
    }else if (text3 === "gamer") {
        random = headerNames.gamer.morning;
    }else if (text3 === "programmer") {
        random = headerNames.programmer.morning;
    }else if (text3 === "student") {
        random = headerNames.student.morning
    }
} else if (hour < 18) {
    if (text3 === "normal") {
        random = headerNames.normal.afternoon;
    }else if (text3 === "boss") {
        random = headerNames.boss.afternoon;
    }else if (text3 === "gamer") {
        random = headerNames.gamer.afternoon;
    }else if (text3 === "programmer") {
        random = headerNames.programmer.afternoon;
    }else if (text3 === "student") {
        random = headerNames.student.afternoon
    }
} else if (hour < 21) {
    if (text3 === "normal") {
        random = headerNames.normal.evening;
    }else if (text3 === "boss") {
        random = headerNames.boss.evening;
    }else if (text3 === "gamer") {
        random = headerNames.gamer.evening;
    }else if (text3 === "programmer") {
        random = headerNames.programmer.evening;
    }else if (text3 === "student") {
        random = headerNames.student.evening;
    }
} else {
    if (text3 === "normal") {
        random = headerNames.normal.night;
    }else if (text3 === "boss") {
        random = headerNames.boss.night;
    }else if (text3 === "gamer") {
        random = headerNames.gamer.night;
    }else if (text3 === "programmer") {
        random = headerNames.programmer.night;
    }else if (text3 === "student") {
        random = headerNames.student.night;
    }
}

let text = `${random[Math.floor(Math.random() * random.length)]}${name.length ? `, ${name}` : ""}!`;

for (let i = 0; i < text.length; i++) {
    name12.innerHTML += `<pre class="${animation_check} float-start" style="animation-delay: ${
        i * 50
    }ms" text-align=center>${text[i]}</pre>`;
}

