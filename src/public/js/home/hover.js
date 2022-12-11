const ho = document.getElementsByClassName('ho');
const hov = document.getElementsByClassName('hov');
hov.addEventListener('mouseover', (event) => {
  ho.style.display="block";
});

hov.addEventListener('mouseout', (event) => {
  ho.style.display="none";
});