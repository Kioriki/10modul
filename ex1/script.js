document.addEventListener("DOMContentLoaded", function(event) {

const btn = document.querySelector('.j-btn-test');
const circle = document.querySelector('.bi-arrow-down-left-circle');
const circleFill = document.querySelector('.bi-arrow-down-left-circle-fill');

btn.addEventListener('click', function(){
  circle.classList.toggle('hide');
  circleFill.classList.toggle('hide');
});
})