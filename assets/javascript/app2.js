// document.getElementById('suggest').style.height = `${screen.height / 2}px`;
document.querySelector(':root').style.setProperty('--my-height', `${screen.height / 2}px`)
document.getElementById("floatingInput").value = localStorage.getItem("user-name") || "AStorm";
document.getElementById("animation-type").value = localStorage.getItem("user-animation") || "come-in-text-up";
document.getElementById("animation-text").value = localStorage.getItem("animation-text") || "gamer";
console.log(localStorage);

const toggles = ["weather-check", "clock-check", "Bing", "shortcut-bar", "search-bar", "Text"];

toggles.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("change", () => role_toggle(id));
    }
});

const saveBtn = document.querySelector("button.btn.btn-primary.w-100.mt-4");
if (saveBtn) {
    saveBtn.addEventListener("click", save_setting);
}