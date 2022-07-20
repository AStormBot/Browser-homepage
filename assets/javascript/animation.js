let name12 = document.getElementById("Header-name");
const hour = new Date().getHours();
const name = localStorage.getItem("user-name");
const animation_check = localStorage.getItem("user-animation") || "typing-animation";
const text3 = localStorage.getItem("animation-text") || "normal";
let random;

if (hour > 6 && hour < 12) {
	random = headerNames[text3].morning;
} else if (hour > 6 && hour < 18) {
	random = headerNames[text3].afternoon;
} else if (hour > 6 && hour < 21) {
	random = headerNames[text3].evening;
} else {
	random = headerNames[text3].night;
}

let text = `${random[Math.floor(Math.random() * random.length)]}${name.length ? `, ${name}` : ""}!`;

for (let i = 0; i < text.length; i++) {
	name12.innerHTML += `<pre class="${animation_check} float-start" style="text-align:center ;animation-delay: ${
		i * 50
	}ms">${text[i]}</pre>`;
}

