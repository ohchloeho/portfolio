//generating random hex codes
const hexCharArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
const generateHexCode = () => {
  let randomHexString = "#";
  for (let x = 0; x < 6; x++) {
    let charIndex = Math.floor(Math.random() * 16);
    randomHexString += hexCharArr[charIndex];
  }
  return randomHexString;
};

//function for dynamic card build >> trigger to add a new card
const mainContainer = document.querySelector(".main-container");
function dynamicCardAdd() {
  const dynamicColourCard = document.createElement("div");
  let randomColourCode = generateHexCode();
  dynamicColourCard.style.backgroundColor = randomColourCode;
  dynamicColourCard.classList.add("colour-card");
  const cardContentP = document.createElement("p");
  cardContentP.textContent = randomColourCode;
  const cardContentLock = document.createElement("button");
  cardContentLock.classList.add("lock-btn");
  cardContentLock.textContent = "lock/unlock";
  const cardContentDelete = document.createElement("button");
  cardContentDelete.classList.add("delete");
  cardContentDelete.textContent = "delete";

  dynamicColourCard.append(cardContentP);
  dynamicColourCard.append(cardContentLock);
  dynamicColourCard.append(cardContentDelete);
  mainContainer.append(dynamicColourCard);

  lockBtnAction(cardContentLock);
  deleteBtnAction(cardContentDelete);
}

//function for lock btns
const lockBtnAction = (btn) => {
  btn.addEventListener("click", () => {
    if (!btn.parentElement.classList.contains("locked")) {
      btn.parentElement.classList.add("locked");
    } else {
      btn.parentElement.classList.remove("locked");
    }
    console.log(btn.parentElement);
  });
};

//function for delete btns
const deleteBtnAction = (btn) => {
  btn.addEventListener("click", () => {
    console.log(btn.parentElement);
    btn.parentElement.remove();
  });
};

//dynamically add a new card
const newCardBtn = document.querySelector(".footer-btn");
newCardBtn.addEventListener("click", () => {
  console.log("hello i am add new");
  dynamicCardAdd();
});

//pressing space generates colours in cards
document.addEventListener("keypress", (e) => {
  if (e.code === "Space") {
    const colourCard = document.querySelectorAll(".colour-card");
    colourCard.forEach((card) => {
      if (!card.classList.contains("locked")) {
        let generatedHexCode = generateHexCode();
        card.style.backgroundColor = generatedHexCode;
        card.firstElementChild.textContent = generatedHexCode;
      }
    });
  }
});

//locking colours >> make class 'locked' and include in cards
let lockBtns = document.querySelectorAll(".lock-btn");
lockBtns.forEach((btn) => {
  lockBtnAction(btn);
});

//delete card function
const deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
  deleteBtnAction(btn);
});
