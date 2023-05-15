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

document.querySelectorAll('.slide-arrow_next').forEach((item) => {
  item.addEventListener('click', (evt) => {
    const slidesContainer = evt.target.parentNode.parentNode.querySelector('.slides-container');
    const slide = slidesContainer.querySelector(".slide");

    const slideWidth = slide.offsetWidth;
    const slidesGap = parseInt(getComputedStyle(slidesContainer).gap, 10);

    slidesContainer.scrollLeft += (slideWidth + slidesGap);

    if (slidesContainer.scrollLeft >= (slidesContainer.scrollWidth - slidesContainer.offsetWidth - (slideWidth + slidesGap))) {
      item.classList.remove('slide-arrow_active');
    }

      item.previousElementSibling.classList.add('slide-arrow_active');
  })
})

document.querySelectorAll('.slide-arrow_prev').forEach((item) => {
  item.addEventListener('click', (evt) => {
    item.nextElementSibling.classList.add('slide-arrow_active');
    const slidesContainer = evt.target.parentNode.parentNode.querySelector('.slides-container');
    const slide = slidesContainer.querySelector(".slide");

    const slideWidth = slide.offsetWidth;
    const slidesGap = parseInt(getComputedStyle(slidesContainer).gap, 10);
    slidesContainer.scrollLeft -= (slideWidth + slidesGap);

    if (slidesContainer.scrollLeft < (slideWidth + slidesGap)) {
      item.classList.remove('slide-arrow_active');
    }
  })
})

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
