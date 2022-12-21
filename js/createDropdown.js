const createBtn = document.querySelector(".create-btn");
const dropdown = document.querySelector(".create-dropdown");
const xImage = document.querySelector(".x-image");
const xImage2 = document.querySelector(".x-image2");
const createBoardH4 = document.getElementById("create-board-h4");
const secondDD = document.querySelector(".create-board-dropdown");
const addAnotherListBtn = document.querySelector(".add-another-listBtn")
const enterListTitle = document.querySelector(".enter-list-title");

const mainCard = document.querySelector(".main-card");
const addList = document.getElementById("add-list");

const itemInput = document.querySelector(".item-input")
const saveBtn = document.querySelector(".save-btn")

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
    boardEmpty.innerText = ""
  }
  else {
    secondDD.classList.remove("openDD")
    secondDD.classList.add("closeDD")
  }
}

// function openAddAnotherListBtn(){
//   if(enterListTitle.classList.contains("closeDD")){
//     enterListTitle.classList.remove("closeDD")
//     enterListTitle.classList.add("openDD")
//   }
// }

function closeModal(){
  enterListTitle.classList.add("closeDD");
  enterListTitle.classList.remove("openDD");
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && !enterListTitle.classList.contains("closeDD")) {
    closeModal();
  }
});


createBtn.addEventListener("click", openCreateBtnDD);
xImage.addEventListener("click", openCreateBtnDD);
xImage2.addEventListener("click", openH4Board);
createBoardH4.addEventListener("click", openH4Board);
// addAnotherListBtn.addEventListener("click", openAddAnotherListBtn)
