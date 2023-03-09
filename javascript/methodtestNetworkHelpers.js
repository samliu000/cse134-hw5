// get html elements
const formElement = document.getElementById("method_test_form");
const outputElement = document.getElementById("response");
const dateField = document.getElementById("date_time");
const fetchRequestType = document.getElementById("fetch_radio");
const xhrRequestType = document.getElementById("xhr_radio");

// use fetch or xhr api to make request
export function sendNetworkRequest(type) {
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

// populates output field with the returned json data
function populateOutput(data) {
  outputElement.innerHTML = `<h2>Request Response</h2><pre>${JSON.stringify(
    data,
    null,
    4
  )}</pre>`;
}
