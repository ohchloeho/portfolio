console.log("stopcloc");
let interval = null;

//update output
const sec = document.querySelector(".sec");
const min = document.querySelector(".min");
const hr = document.querySelector(".hr");

let secCount = 0;
let minCount = 0;
let hrCount = 0;

const timerFunction = () => {
  secCount++;
  if (secCount / 60 === 1) {
    secCount = 0;
    minCount++;
  } else if (minCount / 60 === 1) {
    minCount = 0;
    hrCount++;
  }

  //connect Count values to output
  secCount < 10
    ? (sec.textContent = "0" + secCount)
    : (sec.textContent = secCount);
  minCount < 10
    ? (min.textContent = "0" + minCount)
    : (min.textContent = minCount);
  hrCount < 10 ? (hr.textContent = "0" + hrCount) : (hr.textContent = hrCount);
};

//btns
const btns = document.querySelectorAll("button");
let startState = false //*btn failsafe (bug fix)
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    switch (btn.textContent) {
      case "start":
        if (!startState) {
          startState = true;
          interval = setInterval(timerFunction, 1000);
        }
        break;
      case "stop":
        clearInterval(interval);
        startState = false;
        break;
      case "reset":
        secCount = 0;
        minCount = 0;
        hrCount = 0;
        sec.textContent = "0" + secCount;
        min.textContent = "0" + minCount;
        hr.textContent = "0" + hrCount;
        break;
      default:
    }
  });
});
