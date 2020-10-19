
images = document.currentScript.getAttribute('images').split(',');

// // let changeBgImg = () => {document.getElementById('walindwa-hero').setAttribute('data-bg', "https://images.unsplash.com/photo-1557064349-ee394aa8b7ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")}

// let images = [
//   "https://images.unsplash.com/photo-1557064349-ee394aa8b7ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
//   "https://images.unsplash.com/photo-1593339790588-41d518cce145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1609&q=80",
//   "https://images.unsplash.com/photo-1597898255169-077171e40cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
// ];
// let index = 0;
let $hero = $("#walindwa-hero");

// setInterval(() => {
//   $hero.animate({ opacity: 0 }, 500, function () {
//     $hero.css("background-image", "url(" + images[index++] + ")");
//     $hero.animate({ opacity: 1 }, 500, function () {
//       if (index === images.length) index = 0;
//     });
//   });
// }, 6000);

$hero.backstretch(images, {duration: 5000, fade: 750});