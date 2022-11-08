const createBtn = document.querySelector(".create-btn");
const dropdown = document.querySelector(".create-dropdown");
const xImage = document.querySelector(".x-image");
const xImage2 = document.querySelector(".x-image2");
const createBoardH4 = document.getElementById("create-board-h4");
const secondDD = document.querySelector(".create-board-dropdown");

function openCreateBtnDD() {
  if (dropdown.classList.contains("closeDD")) {
    dropdown.classList.add("openDD");
    dropdown.classList.remove("closeDD");
  } 
  else {
    dropdown.classList.add("closeDD");
    dropdown.classList.remove("openDD");
  }
}

function openH4Board() {
  if (dropdown.classList.contains("openDD")) {
    dropdown.classList.remove("openDD");
    dropdown.classList.add("closeDD")
    secondDD.classList.add("openDD");
    secondDD.classList.remove("closeDD");
  }
  else {
    secondDD.classList.remove("openDD")
    secondDD.classList.add("closeDD")
  }
}

createBtn.addEventListener("click", openCreateBtnDD);
xImage.addEventListener("click", openCreateBtnDD);
xImage2.addEventListener("click", openH4Board);
createBoardH4.addEventListener("click", openH4Board);
