const formElement = document.getElementById("method_test_form");
const outputElement = document.getElementById("response");
const postBtn = document.getElementById("postBtn");

function sendNetworkRequest(type) {
  fetch(getFetchUrl(type), getFetchOptions(type))
    .then((response) => response.json())
    .then((data) => populateOutput(data))
    .catch((error) => console.error(error));
}

function populateOutput(data) {
  outputElement.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`;
}

function getFetchUrl(type) {
  if (type == "post") {
    return "https://httpbin.org/post";
  } else if (type == "get") {
    return "https://httpbin.org/get?" + getFormData().toString();
  } else if (type == "put") {
    return "https://httpbin.org/put";
  } else if (type == "delete") {
    return "https://httpbin.org/delete";
  }
}

function getFetchOptions(type) {
  if (type == "get") {
    return {};
  } else {
    return {
      method: type,
      body: getFormData(),
    };
  }
}

// grabs all fields of the form and return it as a URLSearchParams object
function getFormData() {
  const data = new URLSearchParams();
  for (const pair of new FormData(formElement)) {
    data.append(pair[0], pair[1]);
  }
  return data;
}

// adds event listeners for all the method buttons
function initButtons() {
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

document.addEventListener("DOMContentLoaded", initButtons);
