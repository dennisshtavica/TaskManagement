const inputTitleValue = document.getElementById("input-title-value");
const btn = document.getElementById("set-title-value");
let main = document.querySelector(".board-cards");

btn.addEventListener("click", () => {
  let inputV = inputTitleValue.value;

  if (inputV == "") {
    return alert("please type a title");
  }

  let listTitle = localStorage.getItem("sidebar-lists");
  if (listTitle == null) {
    listObj = [];
  } else {
    listObj = JSON.parse(listTitle);
  }

  let myObj = {
    title: inputV,
  };

  listObj.push(myObj);
  localStorage.setItem("sidebar-lists", JSON.stringify(listObj));

  showLists();
});

// const liPressed = (e) => {
//   main.innerHTML = `
//         <div class="container">
//           <div class="board-header">
//             <div class="left-side-board">
//               <div class="board-title">
//                 <h1>${e.target.innerText}</h1>
//               </div>
//               <div class="flex-edit-fav">
//                 <div>
//                   <input
//                     type="image"
//                     src="./images/editH1titleBtn.svg"
//                     alt=""
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="image"
//                     src="./images/addToFavoritesBtn.svg"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div class="right-side-deleteBoard-btn">
//               <div class="delete-btn">
//                 <button>Delete board</button>
//               </div>
//             </div>
//           </div>
//           <div class="board-lists">
//             <div class="add-another-listBtn">
//               <button>Add another list</button>

//             </div>
//           </div>
//         </div>

//   `;
// };

function showLists() {
  let listTitle = localStorage.getItem("sidebar-lists");
  if (listTitle == null) {
    listObj = [];
  } else {
    listObj = JSON.parse(listTitle);
  }

  let html = "";
  listObj.forEach(function (element, i) {
    html += `
             <li id="list-${element.title}" class="all-lists">${element.title}</li> 
        `;

    console.log(`Object with title: ${element.title}`);
  });

  console.log("length " + listObj.length);

  let lsOutput = document.querySelector(".sidebar-lists");

  if (listObj.length != 0) {
    lsOutput.innerHTML = html;
  }

  // lsOutput.addEventListener("click", liPressed);
}
showLists();

const listTitleInput = document.getElementById("enter-list-input");
const addListBtn = document.getElementById("add-list");
const mainCard = document.querySelector(".main-card");
const enterListH3 = document.querySelector(".card-input-h3");
const enterListTitle = document.querySelector(".enter-list-title");
const boardList = document.querySelector(".board-lists");
const addBtnCtn = document.querySelector(".addBtn-Ctn");

addListBtn.addEventListener("click", () => {
  let listInputV = listTitleInput.value;

  if (listInputV == "") {
    return alert("please type a title");
  }

  let cardTitle = localStorage.getItem("card-lists");
  if (cardTitle == null) {
    cardObj = listInputV;
  } else {
    cardObj = JSON.parse(cardTitle);
  }

  localStorage.setItem("card-lists", JSON.stringify(cardObj));


  

  // if (mainCard.classList.contains("closeDD")) {
  //   mainCard.classList.remove("closeDD");
  //   mainCard.classList.add("openDD");
  //   enterListTitle.classList.remove("openDD");
  //   enterListTitle.classList.add("closeDD");
  // }

  showCard();
});

function showCard() {
  let cardTitle = localStorage.getItem("card-lists");
  if (cardTitle == null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cardTitle);
  }

  let firstTitle = JSON.parse(localStorage.getItem("card-lists"));

  // let html2 = `
  //   <h3 class="card-input-h3">${firstTitle}</h3>
  //   <input type="text" placeholder="Add a card">
  // `;
  // mainCard.innerHTML = html2

  // if (mainCard.classList.contains("closeDD")) {
  //   mainCard.classList.remove("closeDD");
  //   mainCard.classList.add("openDD");
  //   enterListTitle.classList.remove("openDD");
  //   enterListTitle.classList.add("closeDD");
  // }
}

showCard();
