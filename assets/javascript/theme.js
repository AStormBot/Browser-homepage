const local = localStorage;
const theme = local.getItem('Theme');
const Theme = document.getElementById("Theme").value;


if (theme === "Light") {
    document.body.classList += " Light";
    document.getElementById("Theme").value = "Light";
}else if (theme === "Dark") {
    document.getElementById("Theme").value = "Dark";
}