let welcomeElement = document.getElementById("Header-name");
const hour = new Date().getHours();
const username = localStorage.getItem("user-name");
const animation = localStorage.getItem("user-animation") || "typing-animation";
const job = localStorage.getItem("animation-text") || "normal";
let relatedMessages;

function joinArrays(time) {
	const defaultValues = headerNames.normal;
	if (job === "normal") return defaultValues[time];

	return headerNames[job][time].concat(defaultValues[time]);
}

if (hour > 6 && hour < 12) {
	relatedMessages = joinArrays("morning");
} else if (hour > 6 && hour < 18) {
	relatedMessages = joinArrays("afternoon");
} else if (hour > 6 && hour < 21) {
	relatedMessages = joinArrays("evening");
} else {
	relatedMessages = joinArrays("night");
}

const randomMessage = relatedMessages[Math.floor(Math.random() * relatedMessages.length)];
const text = randomMessage.replaceAll("{username}", username);

for (let i = 0; i < text.length; i++) {
	welcomeElement.innerHTML += `<pre class="${animation} float-start" style="animation-delay: ${
		i * 50
	}ms">${text[i]}</pre>`;
}

