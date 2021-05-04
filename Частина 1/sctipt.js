document.getElementById("add-record").addEventListener("click", newrecord);
document
  .getElementById("delete-record")
  .addEventListener("click", deleterecord);

var recordsArray = [];

const updateDate = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return (
    day + "." + month + "." + date.getFullYear() + " " + hours + ":" + minutes
  );
};

function lockInputs() {
  document.getElementById("record-name").disabled = true;
  document.getElementById("delete-record").disabled = true;
  document.getElementById("record-text").disabled = true;
  return true;
}

function unlockInputs() {
  document.getElementById("record-name").disabled = false;
  document.getElementById("delete-record").disabled = false;
  document.getElementById("record-text").disabled = false;
  return true;
}

function createrecord(x, y) {
  let recordName = document.createElement("p");
  let recordText = document.createElement("p");
  let recordDate = document.createElement("p");
  recordName.id = "record-name-preview";
  recordText.id = "record-text-preview";
  recordDate.id = "record-date";
  recordDate.textContent = x;
  let recordElement = document.createElement("li");
  recordElement.classList.add("record-chosen", "record-single");
  recordElement.id = y;
  recordElement.appendChild(recordName);
  recordElement.appendChild(recordText);
  recordElement.appendChild(recordDate);
  document
    .querySelector(".record-list")
    .insertBefore(
      recordElement,
      document.querySelector(".record-list").firstChild
    );
  document.getElementById("record-name").value = "";
  document.getElementById("record-text").value = "";
}

function newrecord() {
  let newrecord = {
    id: generateID(),
    name: "",
    body: "",
    date: updateDate(),
    selected: true,
  };
  unselectCurrentrecord();
  recordsArray.unshift(newrecord);
  unlockInputs();
  createrecord(newrecord.date, newrecord.id);
  location.hash = newrecord.id;
  localStorage.setItem("storedrecords", JSON.stringify(recordsArray));
}

function recordDelete() {
  let selectedrecord = document.querySelector(".record-chosen");
  for (let i = 0; i < recordsArray.length; i++) {
    if (selectedrecord.id === recordsArray[i].id) {
      recordsArray.splice(i, 1);
      document
        .querySelector(".record-list")
        .removeChild(document.querySelector(".record-list").children[i]);
      break;
    }
  }
}

function deleterecord() {
  recordDelete();
  document.getElementById("record-name").value = "";
  document.getElementById("record-text").value = "";
  location.hash = "";
  lockInputs();
  localStorage.setItem("storedrecords", JSON.stringify(recordsArray));
}

function editRecordName() {
  if (recordsArray[0].selected === false) {
    sortrecordMenu();
  }
  document.querySelector(
    ".record-chosen"
  ).children[0].textContent = document.getElementById("record-name").value;
  document.querySelector(
    ".record-chosen"
  ).children[2].textContent = updateDate();
}

function editRecordText() {
  if (recordsArray[0].selected === false) {
    sortrecordMenu();
  }
  document.querySelector(
    ".record-chosen"
  ).children[1].textContent = document.getElementById("record-text").value;
  document.querySelector(
    ".record-chosen"
  ).children[2].textContent = updateDate();
}

function unselectCurrentrecord() {
  let chosenrecord = document.querySelector(".record-chosen");
  if (chosenrecord != null) {
    chosenrecord.classList.remove("record-chosen");
  }
  for (let i = 0; i < recordsArray.length; i++) {
    if (recordsArray[i].selected) {
      recordsArray[i].selected = false;
      break;
    }
  }
}

document.querySelector(".record-list").onclick = function (event) {
  let target;
  if (event.target.tagName === "UL") {
    return;
  }
  if (event.target.tagName != "LI") {
    target = event.target.parentNode;
  } else {
    target = event.target;
  }
  unselectCurrentrecord();
  selectRecord(target);
};

function selectRecord(x) {
  let selectedrecord;
  for (let i = 0; i < recordsArray.length; i++) {
    if (x.id === recordsArray[i].id) {
      selectedrecord = recordsArray[i];
      break;
    }
  }
  x.classList.remove("record-single");
  x.classList.add("record-chosen", "record-single");
  document.getElementById("record-name").value = selectedrecord.name;
  document.getElementById("record-text").value = selectedrecord.body;
  selectedrecord.selected = true;
  location.hash = selectedrecord.id;
  unlockInputs();
}

function generateID() {
  return `url${(Math.random() * 200000).toString()}`;
}

function sortrecordMenu() {
  for (let i = 0; i < recordsArray.length; i++) {
    if (recordsArray[i].selected === true) {
      let tempArrayEl = recordsArray[i];
      recordsArray.splice(i, 1);
      recordsArray.unshift(tempArrayEl);
      let temprecordEl = document.querySelector(".record-chosen");
      document
        .querySelector(".record-list")
        .removeChild(document.querySelector(".record-list").children[i]);
      document
        .querySelector(".record-list")
        .insertBefore(
          temprecordEl,
          document.querySelector(".record-list").firstChild
        );
      break;
    }
  }
}

window.addEventListener("hashchange", () => {
  for (let i = 0; i < recordsArray.length; i++) {
    if (location.hash === "#" + recordsArray[i].id) {
      let record = document.getElementById(recordsArray[i].id);
      unselectCurrentrecord();
      record.classList.remove("record-single");
      record.classList.add("record-chosen", "record-single");
      recordsArray[i].selected = true;
      document.getElementById("record-name").value = recordsArray[i].name;
      document.getElementById("record-text").value = recordsArray[i].body;
      unlockInputs();
      return;
    }
  }
  location.hash = "";
  lockInputs();
  document.getElementById("record-name").value = "";
  document.getElementById("record-text").value = "";
  unselectCurrentrecord();
});

window.onload = () => {
  lockInputs();
  document.getElementById("record-name").value = "";
  document.getElementById("record-text").value = "";
  if (JSON.parse(localStorage.getItem("storedrecords")) === null) {
    return;
  }
  getData();
  createRec();
};

function getData() {
  recordsArray = JSON.parse(localStorage.getItem("storedrecords"));
  for (let i = 0; i < recordsArray.length; i++) {
    let recordName = document.createElement("p");
    let recordText = document.createElement("p");
    let recordDate = document.createElement("p");
    recordName.id = "record-name-preview";
    recordText.id = "record-text-preview";
    recordDate.id = "record-date";
    recordName.textContent = recordsArray[i].name;
    recordText.textContent = recordsArray[i].body;
    recordDate.textContent = recordsArray[i].date;
    let recordElement = document.createElement("li");
    recordElement.classList.add("record-single");
    recordElement.id = recordsArray[i].id;
    recordElement.appendChild(recordName);
    recordElement.appendChild(recordText);
    recordElement.appendChild(recordDate);
    document.querySelector(".record-list").appendChild(recordElement);
  }
}

function createRec() {
  if (location.hash != "") {
    let found;
    for (let i = 0; i < recordsArray.length; i++) {
      if (location.hash === "#" + recordsArray[i].id) {
        found = true;
        let lastrecord = document.getElementById(recordsArray[i].id);
        lastrecord.classList.remove("record-single");
        lastrecord.classList.add("record-chosen", "record-single");
        recordsArray[i].selected = true;
        document.getElementById("record-name").value = recordsArray[i].name;
        document.getElementById("record-text").value = recordsArray[i].body;
        unlockInputs();
        break;
      }
    }
    if (!found) {
      location.hash = "";
    }
  }
}

window.onbeforeunload = () => {
  for (let i = 0; i < recordsArray.length; i++) {
    if (recordsArray[i].selected === true) {
      recordsArray[i].name = document.getElementById("record-name").value;
      recordsArray[i].body = document.getElementById("record-text").value;
      recordsArray[i].date = document.querySelector(
        ".record-chosen"
      ).children[2].textContent;
      break;
    }
  }
  unselectCurrentrecord();
  localStorage.setItem("storedrecords", JSON.stringify(recordsArray));
};

function setLSName() {
  for (let i = 0; i < recordsArray.length; i++) {
    if (recordsArray[i].selected === true) {
      recordsArray[i].name = document.getElementById("record-name").value;
      recordsArray[i].date = document.querySelector(
        ".record-chosen"
      ).children[2].textContent;
      break;
    }
  }
  localStorage.setItem("storedrecords", JSON.stringify(recordsArray));
}

function setLSText() {
  for (let i = 0; i < recordsArray.length; i++) {
    if (recordsArray[i].selected === true) {
      recordsArray[i].body = document.getElementById("record-text").value;
      recordsArray[i].date = document.querySelector(
        ".record-chosen"
      ).children[2].textContent;
      break;
    }
  }
  localStorage.setItem("storedrecords", JSON.stringify(recordsArray));
}

document.getElementById("record-name").oninput = editRecordName;
document.getElementById("record-text").oninput = editRecordText;
document.getElementById("record-name").onchange = setLSName;
document.getElementById("record-text").onchange = setLSText;

var elem = document.querySelector("#clock");

//Выведем классы
console.log(elem.classList); //DOMTokenList ["example", "for", "you"]

//Добавим классы
elem.classList.add("ok", "understand");
console.log(elem.classList);
