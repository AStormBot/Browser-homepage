let name12 = document.getElementById("Header-name");
const hour = new Date().getHours();
const name = localStorage.getItem("user-name");
const animation_check = localStorage.getItem("user-animation") || "typing-animation";
let random;

if (hour > 6 && hour < 12) {
	random = headerNames.morning;
} else if (hour < 18) {
	random = headerNames.afternoon;
} else if (hour < 21) {
	random = headerNames.evening;
} else random = headerNames.night;

let text = `${random[Math.floor(Math.random() * random.length)]}${name.length ? `, ${name}` : ""}!`;

for (let i = 0; i < text.length; i++) {
	name12.innerHTML += `<pre class="${animation_check} float-start" style="animation-delay: ${
		i * 50
	}ms" text-align=center>${text[i]}</pre>`;
}

