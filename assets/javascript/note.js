function save() {
    localStorage.setItem("note", document.getElementById('note-text').value)
}
function load() {
    document.getElementById('note-text').value = localStorage.getItem("note")
}