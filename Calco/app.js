console.log("this is calco the calculator");
//output values
const output = document.querySelector(".output > p");

const updateOutput = (outputValue) => {
  output.textContent = outputValue;
};

let value = "";

//button numbers
const inputBtns = document.querySelectorAll("button");
inputBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    //use switch case properly
    switch (btn.textContent) {
      case "AC":
        value = "";
        break;
      case "=":
        value = eval(value);
        break;
      case "x":
        value = "*";
        break;
      case "÷":
        value = "/";
        break;
      default:
        value += btn.textContent;
    }
    updateOutput(value);
  });
});
