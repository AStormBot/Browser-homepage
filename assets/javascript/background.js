const body = $('#body');
const backgrounds = ['1.jpg', '2.png', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.png', '8.jpg', '9.jpg','10.png', '11.jpg'];
console.log('bro')
body.html(`<img src="./assets/Images/${backgrounds[Math.floor(Math.random() * backgrounds.length)]}" alt="">`)