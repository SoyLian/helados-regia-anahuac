const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

document.getElementById('year').textContent = new Date().getFullYear();

const slides = [
  { img:'img/yogen.jpg', tag:'Yogen', title:'Yogen con más de 12 ingredientes', text:'Ideal para combinar fruta, galletas y sabores frescos.' },
  { img:'img/paleta-fresa.jpg', tag:'Paleta', title:'Vainilla rellena con fresa', text:'Una paleta cremosa, frutal y muy antojable.' },
  { img:'img/esquimal.jpg', tag:'Esquimal', title:'Chocolate, nuez y tradición', text:'El clásico esquimal para los amantes del chocolate.' },
  { img:'img/logo.jpg', tag:'Regia', title:'Desde 1959', text:'Tradición Helados Regia en una sucursal en la colonia anahuac en San Nicolás de los Garza.' }
];
let current = 0;
const slideImage = document.getElementById('slideImage');
const slideTag = document.getElementById('slideTag');
const slideTitle = document.getElementById('slideTitle');
const slideText = document.getElementById('slideText');
const dots = document.getElementById('dots');

function renderDots(){
  dots.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === current ? ' active' : '');
    dot.addEventListener('click', () => showSlide(i));
    dots.appendChild(dot);
  });
}
function showSlide(index){
  current = (index + slides.length) % slides.length;
  const s = slides[current];
  slideImage.style.opacity = .25;
  setTimeout(() => {
    slideImage.src = s.img;
    slideTag.textContent = s.tag;
    slideTitle.textContent = s.title;
    slideText.textContent = s.text;
    slideImage.style.opacity = 1;
    renderDots();
  }, 180);
}
document.getElementById('prevBtn').addEventListener('click', () => showSlide(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => showSlide(current + 1));
renderDots();
setInterval(() => showSlide(current + 1), 6000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{ threshold:.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
