function save_setting() {
    const local = localStorage;
    const user_name = document.getElementById("floatingInput").value;
    const user_animation = document.getElementById("animation-type").value;
    const text_animation = document.getElementById("animation-text").value;

    local.setItem("user-name", user_name);
    local.setItem("user-animation", user_animation);
    local.setItem('animation-text', text_animation)

    for (let i = 0; i < 6; i++) {
        local.setItem(`${i}`, document.getElementById(`${i + 1}`).value)
    }
}