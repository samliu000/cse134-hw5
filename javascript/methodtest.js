// get html elements
const formElement = document.getElementById("method_test_form");
const outputElement = document.getElementById("response");
const postBtn = document.getElementById("postBtn");
const dateField = document.getElementById("date_time");
const fetchRequestType = document.getElementById("fetch_radio");
const xhrRequestType = document.getElementById("xhr_radio");

// use fetch or xhr api to make request
function sendNetworkRequest(type) {
  // use fetch api
  if (fetchRequestType.checked) {
    fetch(getRequestUrl(type), getFetchOptions(type))
      .then((response) => response.json())
      .then((data) => populateOutput(data))
      .catch((error) => console.error(error));
  }
  // use XMLHttpRequest api
  else if (xhrRequestType.checked) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          populateOutput(JSON.parse(this.responseText));
        } else {
          console.log("XHR Request Error: " + this.statusText);
        }
      }
    };
    xhr.open(type, getRequestUrl(type));
    if (type != "get") {
      xhr.send(getFormData());
    } else {
      xhr.send();
    }
  }
}

// populates output field with the returned json data
function populateOutput(data) {
  outputElement.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`;
}

// gets the request url, for get requests, the form data is added to the url
function getRequestUrl(type) {
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

// create fetch options. for get, there are no options
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
  // insert current date
  dateField.value = new Date();

  // grab all fields of the form
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

// initialize buttons
initButtons();
