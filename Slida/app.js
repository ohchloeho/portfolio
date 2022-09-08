//making prev and next btns work
const slidaBtns = document.querySelectorAll(".slider-btns");
const sliderContainer = document.querySelector(".slide-cont");
const slides = document.querySelectorAll(".slide-cont > img");

let lastSlideId = slides.length - 1;
let firstSlideID = slides.length - (slides.length - 1);
console.log(lastSlideId, firstSlideID);

let currentSlide = firstSlideID;
const imgWidth = sliderContainer.offsetWidth; //width of img
sliderContainer.style.transform = `translateX(-${currentSlide * imgWidth}px)`;

//function for next slide
const nextSlide = () => {
  currentSlide++;
  sliderContainer.style.transition = "200ms ease";
  sliderContainer.style.transform = `translateX(-${currentSlide * imgWidth}px)`;
};
//function for prev slide
const prevSlide = () => {
  currentSlide--;
  sliderContainer.style.transition = "200ms ease";
  sliderContainer.style.transform = `translateX(${
    -1 * currentSlide * imgWidth
  }px)`;
};

//set slide transition time
const timerSelector = document.querySelector("#timerset");
const timerBtn = document.querySelector("#timersetform > button");
let timeInput = 5000;
timerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  timeInput = timerSelector.value * 1000;
});

//transition auto loop
const slideTransition = () => {
  nextSlide();
  window.setTimeout(slideTransition, timeInput);
};
//delay above function for 5 secs so slide starts at firstSlideId
setTimeout(slideTransition, 5000);

//btns action prev, next
slidaBtns.forEach((btn, id) => {
  btn.addEventListener("click", () => {
    if (id === 0) {
      //*code for prev btn
      prevSlide();
    } else if (id === 1) {
      //*code for next btn
      nextSlide();
    }
  });
});

//slider loop both ways
sliderContainer.addEventListener("transitionend", () => {
  if (currentSlide >= lastSlideId - 1) {
    currentSlide = firstSlideID - 1;
    console.log(currentSlide);
    sliderContainer.style.transition = "none";
    sliderContainer.style.transform = `translateX(-${
      currentSlide * imgWidth
    }px)`;
  } else if (currentSlide <= firstSlideID - 1) {
    currentSlide = lastSlideId - 1;
    console.log(currentSlide);
    sliderContainer.style.transition = "none";
    sliderContainer.style.transform = `translateX(-${
      currentSlide * imgWidth
    }px)`;
  }
});

//dynamic img //! extra feature
const imgInput = document.querySelector("#upload > input");
const uploadForm = document.querySelector("#upload");
const onUpload = () => {
  console.log(imgInput.value);
  const imgOutput = document.createElement("img");
  imgOutput.setAttribute("src",imgInput.value)
  uploadForm.append(imgOutput)
};
