// custom button that keeps track of how many times it is clicked
class ButtonCount extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const actualButton = document.createElement("button");
    actualButton.innerText = "Current click count: 0";
    shadow.appendChild(actualButton);
  }
}

// add custom element to custom elements registry
customElements.define("button-count", ButtonCount);

function initButton() {
  var click_count = 0;
  const buttonCountElem = document.getElementById("my-btn-count");

  buttonCountElem.addEventListener("click", () => {
    click_count++;
    const shadow = buttonCountElem.shadowRoot;
    shadow.firstChild.innerText = "Current click count: " + click_count;
  });
}

document.addEventListener("DOMContentLoaded", initButton);
