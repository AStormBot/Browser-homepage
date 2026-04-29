function save_setting() {
    const local = window.localStorage;
    const user_name = document.getElementById("floatingInput").value;
    const user_animation = document.getElementById("animation-type").value;
    const text_animation = document.getElementById("animation-text").value;
    const background_typed = document.getElementById('background-type').value;

    local.setItem('background-type', background_typed);
    local.setItem("user-name", user_name);
    local.setItem("user-animation", user_animation);
    local.setItem('animation-text', text_animation)

    for (let i = 0; i < 6; i++) {
        local.setItem(`${i}`, document.getElementById(`${i + 1}`).value)
    }
    
    for (let i = 0; i < 3; i++) {
        local.setItem(`${i}-pic`, document.getElementById(`${i + 1}-pic`).value)
    }
}