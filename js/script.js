"use strict";

// ELEMENTS
const main = document.getElementById("main");
const cardsContainer = document.getElementById("cards-container");
const boardContainer = document.getElementById("board-container")

const sidebar = document.getElementById("sidebar");
const sidebarLists = document.getElementById("sidebar-lists");

const addCard = document.getElementById("enter-list-input");
const addCardText = document.getElementById("add-card-text");
const addListButton = document.getElementById("add-list");

const inputTitleValue = document.getElementById("input-title-value");
const setTitleValue = document.getElementById("set-title-value");

const deleteButton = document.getElementById("delete-button");

const boardEmpty = document.getElementById("board-title-empty");

const e_title = document.getElementById("title");

let autoSaveInternalId = setInterval(function () {
  saveData();
}, 1000);

let appData = {
  boards: [],
  currentBoard: 0,
  identifier: 0,
};

function currentCards() {
  return appData.boards[appData.currentBoard].cards;
}

function currentBoard() {
  return appData.boards[appData.currentBoard];
}

// Utility functions
function uniqueID() {
  appData.identifier += 1;
  return "b" + appData.identifier;
}

function getItemFromElement(element) {
  for (let card of currentCards()) {
    for (let item of card.items) {
      if (item.id === element.id) {
        return item;
      }
    }
  }
}

function getCardFromElement(element) {
  return currentCards().find((e) => e.id === element.id);
}

function getBoardFromId(id) {
  return appData.boards.find((b) => b.id === id);
}

function listBoards() {

  sidebarLists.innerHTML = '';
  for (let board of appData.boards) {
    let boardTitle = document.createElement("li");
    boardTitle.innerText = board.name;
    boardTitle.id = board.id;
    if (board.id === currentBoard().id){
      boardTitle.classList.add("is-active");
    }
    boardTitle.addEventListener("click", () => {
      renderBoard(board);
      listBoards();
    });
    sidebarLists.appendChild(boardTitle);
  }
}

function renderBoard(board) {
  appData.currentBoard = appData.boards.indexOf(board);
  e_title.innerText = currentBoard().name;

  renderAllCards();
}

function renderAllCards() {
  for (let card of cardsContainer.querySelectorAll(".main-card")) {
    card.remove();
  }

  for (let card of currentCards()) {
    let generated = card.generateElement();
    cardsContainer.insertBefore(
      generated,
      cardsContainer.insertBefore(generated, cardsContainer.childNodes[cardsContainer.childNodes.length - 4])
    );
    card.update();
  }

}

function renderCard(cardID) {
  let card = currentCards().find((e) => e.id === cardID);

  if (!card) {
    let currentCardElement = document.getElementById(cardID);
    currentCardElement.parentNode.removeChild(currentCardElement);
    return;
  }

  let currentCardElement = document.getElementById(card.id);
  if (currentCardElement != null) {
    let generated = card.generateElement();
    currentCardElement.parentNode.replaceChild(generated, currentCardElement);
  } else {
    let generated = card.generateElement(); 
    cardsContainer.insertBefore(
      generated,
      cardsContainer.childNodes[cardsContainer.childNodes.length - 4]
    );
  }

  card.update();
}

console.log(cardsContainer.childNodes);


function addBoard() {
  let boardTitle = inputTitleValue.value;
  inputTitleValue.value = ''

  if(!boardTitle) {
    boardEmpty.innerText = "Type board title*";
    return;
  }

  if(secondDD.classList.contains("openDD")){
    secondDD.classList.remove("openDD")
    secondDD.classList.add("closeDD")
  }

  let newBoard = new Board(boardTitle, uniqueID());
  appData.boards.push(newBoard);
  listBoards();
}

// CLASSES
class Item {
  constructor(title, description = null, id, parentCardId) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.parentCardId = parentCardId;
  }

  getParentCard() {
    return document.getElementById(this.parentCardId);
  }
  check(chk = true) {
    this.isDone = chk;
    if (chk) {

      document.getElementById(this.id).style.textDecoration = "line-through";
    } else {

      document.getElementById(this.id).style.textDecoration = "none";
    }
  }

  update() {

  }
}

class Card {
  constructor(name, id, parentBoardId) {
    this.name = name;
    this.items = [];
    this.id = id;
    this.parentBoardId = parentBoardId;
  }

  addItem(item) {
    this.items.push(item);
    renderCard(this.id);
  }

  removeItem(item) {
    this.items = this.items.filter((val) => val !== item);
    renderCard(this.id);
  }

  update() {
    for (let item of this.items) {
      item.update();
    }
  }

  renderItems() {
    let newItemList = document.createElement("ul");
    newItemList.id = this.id + "-ul";
    for (let item of this.items) {
      let newItem = document.createElement("li");
      newItem.id = item.id;

      let newItemTitle = document.createElement("p");
      newItemTitle.innerText = item.title;


      let newItemButtons = document.createElement("span");

      newItem.appendChild(newItemTitle);
      newItemList.appendChild(newItem);
    }

    return newItemList;
  }

  generateElement() {
    let newCardHeader = document.createElement("span");
    let newCardHeaderTitle = document.createElement("h2");

    newCardHeaderTitle.id = this.id + "-h2";
    newCardHeaderTitle.innerText = this.name;
    newCardHeaderTitle.classList.add("text-fix")
    
    let newCard = document.createElement("div")
    newCard.id = this.id;
    newCard.classList.add("main-card");
    newCard.appendChild(newCardHeader)
    newCardHeader.append(newCardHeaderTitle)

    let newInput = document.createElement('textarea')
    newInput.id = this.id + '-input';
    newInput.maxLength = 256;
    // newInput.type = 'text';
    newInput.name = 'add-todo-text';
    newInput.placeholder = 'Add a task';
    newInput.classList.add('item-input')
    newInput.addEventListener('keyup', (e) => {
      if(e.code === "Enter") newButton.click()
    })

    let newButton = document.createElement("button")
    newButton.id = this.id + '-button'
    newButton.classList.add("save-btn", "closeDD")
    newButton.innerText = "Save"
    newButton.addEventListener("click", () => {
      let inputValue = newInput.value;
      let item = new Item(inputValue, null, getBoardFromId(this.parentBoardId).uniqueID(), this.id)
      this.addItem(item)
      newInput.value = '';
      newInput.focus()
    })

    if (this.items) {
      let _newItemList = this.renderItems();

      newCard.appendChild(_newItemList);
    }

    newCard.appendChild(newInput)
    newCard.appendChild(newButton)

    return newCard
  }
}

class Board {
    constructor(name, id, settings, identifier = 0){
        this.name = name;
        this.id = id;
        this.settings = settings;
        this.cards = [];
        this.identifier = identifier;
    }

    uniqueID(){
        this.identifier += 1;
        return 'e' + this.identifier.toString();  
    }

    addCard(){  
        let cardTitle = addCardText.value;
        addCardText.value = '';

        if(!cardTitle){
          return;
        }

        let card = new Card(cardTitle, this.uniqueID(), this.id)
        this.cards.push(card)

        let newCard = card.generateElement();
        cardsContainer.insertBefore(newCard, cardsContainer.childNodes[cardsContainer.childNodes.length - 4])
    }
}

// LOCAL STORAGE
function saveData(){
    window.localStorage.setItem("appData", JSON.stringify(appData))
}

function getDataFromLocalStorage() {
  return window.localStorage.getItem("appData");
}

function loadData(){
    let data = window.localStorage.getItem("appData");

    if(data){
        let _appData = JSON.parse(data)

        appData.currentBoard = _appData.currentBoard;
        appData.identifier = _appData.identifier;

        for(let board of _appData.boards){
            let newBoard = new Board(board.name, board.id, board.identifier)

            for(let card of board.cards){
                let newCard = new Card(card.name, card.id, board.id)
                
                for(let item of card.items){
                    let newItem = new Item(item.title, item.description, item.id, card.id)
                    
                    newCard.items.push(newItem)
                }
                newBoard.cards.push(newCard)
            }

            appData.boards.push(newBoard)
        }
        renderBoard(appData.boards[appData.currentBoard])
    }
    listBoards()

}
loadData();

// EVENTS
addCardText.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        currentBoard().addCard()
    }
})

setTitleValue.addEventListener("click", addBoard)