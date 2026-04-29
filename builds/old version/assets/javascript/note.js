function save() {
    localStorage.setItem("note", document.getElementById('note-text').value);
    console.log('Project Saved!')
}
function load() {
    document.getElementById('note-text').value = localStorage.getItem("note");
    console.log('Project Loaded!')
}