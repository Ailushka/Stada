/* -------------------- */
/*         Popup        */
/* -------------------- */

const requestButtons = document.querySelectorAll('.button_type_request');
const closeButtons = document.querySelectorAll('.button_type_close');
const requestPopup = document.querySelector('.popup_type_request');
const requestForm = document.querySelector('.form_type_request');
const successPopup = document.querySelector('.popup_type_success');
const reviewPopup = document.querySelector('.popup_type_review');
const reviewName = reviewPopup.querySelector('.reviews__name');
const reviewContent = reviewPopup.querySelector('.reviews__text');
const reviewImageName = reviewPopup.querySelector('.reviews__image');
const reviewImageLink = reviewPopup.querySelector('.reviews__image');
const reviews = document.querySelectorAll('.reviews-list__item');
const ESCAPE = 27;

function openPopUp(popup) {
  popup.classList.add('popup_opened');
  popup.classList.add('transition');
  document.querySelector('.page').classList.add('no-scroll');
  document.addEventListener('click', closePopUpByOverlay);
  document.addEventListener('keydown', closePopUpByEsc);

}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  popup.classList.remove('transition');
  document.querySelector('.page').classList.remove('no-scroll');
  document.removeEventListener('click', closePopUpByOverlay);
  document.removeEventListener('keydown', closePopUpByEsc);
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function closePopUpByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopUp(evt.target);
  }
}

function closePopUpByEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.keyCode === ESCAPE) {
    closePopUp(popupOpened);
  }
}

requestButtons.forEach((item) => {
  item.addEventListener('click', () => {
      openPopUp(requestPopup);
  });
});

reviews.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const reviewToOpen = evt.target.closest('.reviews-list__item');
    const openedReviewName = reviewToOpen.querySelector('.reviews__name').textContent;
    const openedReviewContent = reviewToOpen.querySelector('.reviews__text').textContent;
    const openedReviewImageName = reviewToOpen.querySelector('.reviews__image').alt;
    const openedReviewImageLink = reviewToOpen.querySelector('.reviews__image').src;

    reviewName.textContent = openedReviewName;
    reviewContent.textContent = openedReviewContent;
    reviewImageName.alt = openedReviewImageName;
    reviewImageLink.src = openedReviewImageLink;

      openPopUp(reviewPopup);
  });
});

closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
      const popUpToClose = evt.target.closest('.popup');
      closePopUp(popUpToClose);
  });
});

/* -------------------- */
/*    Carousel slider   */
/* -------------------- */

const initSlider = (slider) => {
  const sliderContainer = slider.querySelector('.slider__container');
  const sliderItems = slider.querySelectorAll('.slider__item');
  const next = slider.querySelector('.slide-arrow_next');
  const prev = slider.querySelector('.slide-arrow_prev');
  const slideGap = parseInt(getComputedStyle(sliderContainer).gap, 10);
  let currentSlide = 0;

  sliderItems[currentSlide].classList.add("activeSlide");

  let itemWidth = sliderItems[0].clientWidth;

  const sliderItemsToShow = Math.floor(sliderContainer.clientWidth / itemWidth);

  let resizeTimer;

  function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    currentSlide = 0;
    sliderContainer.style.transform = "translateY(0px)";
    prev.classList.add("slide-arrow_disabled");
    next.classList.remove("slide-arrow_disabled");
    itemWidth = sliderItems[0].clientWidth;
  }, 200);
}

  sliderContainer.style.transform = "translateY(0px)";

  const toggleClass = (condition, elem, className) => {
    condition
      ? elem.classList.add(className)
      : elem.classList.remove(className);
  };

  const handlePrevNextBtn = () => {
    toggleClass(currentSlide === 0, prev, "slide-arrow_disabled");
    toggleClass(currentSlide === sliderItems.length - sliderItemsToShow, next, "slide-arrow_disabled");
  };

  handlePrevNextBtn();

  const handleSlide = (condition, slideElem, event) => {
    const slideTransformValue = slideElem.style.transform;
    const translateXValue = slideTransformValue.replace(/[^\d.]/g, "");

    if (condition && event === "next") {
      currentSlide += 1;

      slideElem.style.transform = `translateX(-${
        +translateXValue + itemWidth + slideGap
      }px)`;
    } else if (condition && event === "prev") {
      currentSlide -= 1;

      slideElem.style.transform = `translateX(-${
        +translateXValue - itemWidth - slideGap
      }px)`;
    }
    sliderItems.forEach((e) => e.classList.remove("activeSlide"));
    sliderItems[currentSlide].classList.add("activeSlide");
  };

  const handleNextClick = () => {
    handleSlide(currentSlide !== sliderItems.length - sliderItemsToShow, sliderContainer, "next");
    handlePrevNextBtn();
  };

  const handlePrevClick = () => {
    handleSlide(currentSlide !== 0, sliderContainer, "prev");
    handlePrevNextBtn();
  };

  next.addEventListener("click", handleNextClick);
  prev.addEventListener("click", handlePrevClick);

  window.addEventListener('resize', handleResize);
};

const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => initSlider(slider));


/* -------------------- */
/*       Accordeon      */
/* -------------------- */

document.querySelectorAll('.accordeon__title').forEach((item) => {
  item.addEventListener('click', (evt) => {
    const content = evt.target.parentNode.querySelector('.accordeon__content');

    if (!item.classList.contains('accordeon__title_active'))
    {
      item.classList.add('accordeon__title_active');
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      item.classList.remove('accordeon__title_active');
      content.style.maxHeight = '';
    }
  })
})
