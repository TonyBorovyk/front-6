"use strict";

const List = document.getElementById("list");
const field = document.querySelector('input[type="text"]');
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const Text = field.value;
  field.value = "";
  Poster(Text);
});

function Poster(Text1) {
  const li = document.createElement("li");
  li.innerHTML = `<em>${Text1}</em>`;

  li.classList.add("class1");
  List.appendChild(li);

  li.classList.add("class1");
}

get("db.json", (data) => JSON.parse(data).forEach(Poster));

function get(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = () => {
    if (xhr.status == 200) {
      callback(xhr.response);
    } else {
      console.log(`Error! ${xhr.status}: ${xhr.statusText}`);
    }
  };
  xhr.send();
}

function post(url, body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState != XMLHttpRequest.DONE) return;
    if (xhr.status == 200) {
      callback(xhr.response);
    } else {
      console.log(`Error! ${xhr.status}: ${xhr.statusText}`);
    }
  };
  xhr.send(body);
}

class AJAX {
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => {
      if (xhr.status == 200) {
        callback(xhr.response);
      } else {
        console.log(`Error! ${xhr.status}: ${xhr.statusText}`);
      }
    };
    xhr.send();
  }

  post(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onload = () => {
      if (xhr.status == 200) {
        callback(xhr.response);
      } else {
        console.log(`Error! ${xhr.status}: ${xhr.statusText}`);
      }
    };
    xhr.send();
  }
}
const myAjax = new AJAX();
myAjax.get("./db.json", (response) => {
  renderPosts(JSON.parse(response).posts);
});
