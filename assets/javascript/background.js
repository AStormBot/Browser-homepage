if (!localStorage.getItem('0-pic') && !localStorage.getItem('1-pic') && !localStorage.getItem('2-pic')) {
    const body = $('#body');
    const backgrounds = ['1.jpg', '2.png', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.png', '8.jpg', '9.jpg', '10.png', '11.jpg'];
    body.html(`<img src="./assets/Images/background/${backgrounds[Math.floor(Math.random() * backgrounds.length)]}" alt="">`);
} else {
    const local = localStorage;
    const body = $('#body');
    const backgrounds = [local.getItem('0-pic'), local.getItem('1-pic'), local.getItem('2-pic')];

    let random_pic = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    while (!random_pic) {
        random_pic = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }

    const finally_pic = random_pic.split('\\')[2];

    body.html(`<img src="./assets/Images/background/${finally_pic}">`);
}