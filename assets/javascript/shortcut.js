const toolbar = document.getElementById('toolbar');
for (let i = 0; i < 6; i++) {
    let local = localStorage.getItem(`${i}`)
    document.getElementById(`${i + 1}`).value = localStorage.getItem(`${i}`)
    toolbar.innerHTML += `        <div class="col-1" onclick="window.open(${local}, '_self')">
          <img src="https://www.google.com/s2/favicons?domain=${local}" alt="" />
        </div>`;
}
