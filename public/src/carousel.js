const carouselScetion = document.querySelector('.sectioin-carousel');
const carouselSwitch = document.querySelector('.carousel-switch-all');
let carouselArray = [];
let nextSlide = 0;
let currentSlide = -1;
const initialSlide = 0;
const shiftPerTurn = 1;
let intervalID;
const playInterval = 5000;

function getCarouselData() {
  const url = 'https://api.appworks-school.tw/api/1.0/marketing/campaigns';
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      carouselArray = data.data;
      renderCarousel();
    })
    .then(() => {
      activateCarousel();
    });
}

function renderCarousel() {
  let contentHTML = '';
  let switchHTML = '';
  const campaignCount = carouselArray.length;

  for (let i = 0; i < campaignCount; i++) {
    const story = carouselArray[i].story.split(/[\n]/);
    const ref = story.pop();
    const quote = story.join('<br>');

    contentHTML += `
      <div class="carousel-content carousel-hidden">
        <a href="./product?id=${carouselArray[i].product_id}">
          <div class="carousel-img-container">
            <img src="${carouselArray[i].picture}" alt="carousel" class="carousel">
          </div>
          <div class="quote">
            <p class="quote-text">
              ${quote}
            </p>
            <p class="quote-ref">
              ${ref}
            </p>
          </div>
        </a>
      </div>`;

    switchHTML += `<div class="carousel-switch"></div>`;
  }

  carouselScetion.insertAdjacentHTML('afterbegin', contentHTML);
  carouselSwitch.insertAdjacentHTML('beforeend', switchHTML);
}

function showCarousel() {
  const campaigns = document.querySelectorAll('.carousel-content');
  const switchs = document.querySelectorAll('.carousel-switch');
  if (currentSlide >= initialSlide) {
    campaigns[currentSlide].classList.toggle('carousel-hidden');
    switchs[currentSlide].classList.toggle('carousel-chosen');
  }
  campaigns[nextSlide].classList.toggle('carousel-hidden');
  switchs[nextSlide].classList.toggle('carousel-chosen');
  currentSlide = nextSlide;
  nextSlide = (nextSlide + shiftPerTurn) % carouselArray.length;
}

function clickCarousel() {
  const switchs = document.querySelectorAll('.carousel-switch');

  switchs.forEach((e, index) => {
    e.addEventListener('click', () => {
      clearInterval(intervalID);
      nextSlide = index;
      showCarousel();
      intervalID = setInterval(() => showCarousel(), playInterval);
    });
  });
}

function activateCarousel() {
  showCarousel();
  intervalID = setInterval(() => showCarousel(), playInterval);
  clickCarousel();
}

getCarouselData();
