// custom button that keeps track of how many times it is clicked
class ButtonCount extends HTMLElement {
  constructor() {
    super();

    // keeps track of how many times the button has been clicked
    this.clickCount = 0;

    // create actual HTML button that keeps track of how many times it is clicked
    const shadow = this.attachShadow({ mode: "open" });
    const actualButton = document.createElement("button");
    actualButton.innerText = "Times Clicked: 0";
    shadow.appendChild(actualButton);
  }

  // update the button's text to reflect the updated click count
  incrementCount() {
    this.shadowRoot.firstChild.innerText = "Times Clicked: " + ++this.clickCount;
  }
}

// add custom element to custom elements registry
customElements.define("button-count", ButtonCount);

// initializes the onclick listener for the button-count element
function initButton() {
  const buttonCountElem = document.getElementById("my-btn-count");
  buttonCountElem.onclick = () => {
    buttonCountElem.incrementCount();
  };
}

// only initialize on click listeners after the DOM is loaded
document.addEventListener("DOMContentLoaded", initButton);
