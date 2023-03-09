import { sendNetworkRequest } from "/javascript/methodtestNetworkHelpers.js";

// adds event listeners for all the method buttons
function initButtons() {
  const postBtn = document.getElementById("postBtn");
  postBtn.addEventListener("click", () => {
    sendNetworkRequest("post");
  });

  const getBtn = document.getElementById("getBtn");
  getBtn.addEventListener("click", () => {
    sendNetworkRequest("get");
  });

  const putBtn = document.getElementById("putBtn");
  putBtn.addEventListener("click", () => {
    sendNetworkRequest("put");
  });

  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    sendNetworkRequest("delete");
  });
}

// initialize buttons
initButtons();
