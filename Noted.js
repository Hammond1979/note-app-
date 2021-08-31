const nameList = document.querySelector(".name-list");
const listInput = document.querySelector("#input");
const addListBtn = document.querySelector(".addlistBtn");
let draggables;
let dragSrcEl;
let noteIndex = 1;
let trackEdit = null;
let saveNote = []
let savedNotes= JSON.parse(localStorage.getItem("notes"))
console.log(localStorage.getItem("notes"))
document.addEventListener('DOMContentLoaded', createSavedNote)
addListBtn.addEventListener("click", addList)
function addList() {
    if(listInput.value==""){
        emptyAlert()
    }else if(!listInput.value.replace(/\s/g, "")){
      alert("Hello you can't save an empty note")
    }
    else{
        if(trackEdit){
         newChanges()
        }else {
        //create div
        
        const div = document.createElement('div')
        div.className="notecontent-container" 
        // draggable="true"
        div.setAttribute('draggable', true)
        //create li
        const li = document.createElement('li')
        li.innerText = listInput.value
        li.id = `liContent-${noteIndex}`
        div.append(li)
        div.addEventListener("dragstart", onDragStart, false)
        div.addEventListener("dragover", onDragOver, false)
        div.addEventListener("dragenter", onDragEnter, false)
        div.addEventListener("dragleave", onDragLeave, false)
        div.addEventListener("dragend", onDragEnd, false)
        div.addEventListener("drop", onDrop, false)
        //create edit btn
        const editBtn = document.createElement('button')
        editBtn.innerText = 'Edit'
        editBtn.classList.add('edit-verify')
        editBtn.id = `editBtn-${noteIndex}`
        editBtn.onclick= editFn 
        div.append(editBtn)
    
            
        //create delete btn
        const delBtn = document.createElement('button')
        delBtn.innerText = 'Delete'
        delBtn.classList.add('delete-verify')
        delBtn.id = `delBtn-${noteIndex}`
         delBtn.onclick = deleteFn
        div.append(delBtn)

        //save to localstorage
        if(savedNotes){
            saveNote = savedNotes;
            saveNote.push(listInput.value)
            localStorage.setItem("notes",JSON.stringify(saveNote));

        }else {
            saveNote.push(listInput.value)
            localStorage.setItem("notes",JSON.stringify(saveNote)); 
        }
        nameList.append(div)
        listInput.value = ''
        noteIndex++;
         }

    }
    
};

function emptyAlert(){
  if ("") {
    alert("Hello you can't save an empty note")
  }
}


function deleteFn(e) {
    if(confirm("Are you sure you want to delete")){
        const item = e.target
      
        if(savedNotes){
            saveNote = savedNotes;
            const getText = item.parentElement.firstChild.innerHTML    
            console.log(getText)   
            const getIndex = saveNote.indexOf(getText);
            saveNote.splice(getIndex, 1)
            localStorage.setItem("notes", JSON.stringify(saveNote))
                     
            }
        if (item.classList[0] === 'delete-verify') {
        const parentItem = item.parentElement
        parentItem.remove()
        }
    }
  }
  function editFn(e) {
  
    trackEdit = e.target.id;
    console.log(trackEdit);
    const editedNoteBtn = e.target.parentElement.firstChild.innerHTML
    listInput.value= editedNoteBtn
    // newChanges()
}

function newChanges(){
  // if(!listInput.value.replace(/\s/g, "")){
  //   alert("Hello you can't save an empty note")
  // }
    // const onEdit = e.target
    const trackId = trackEdit.split("-")[1]
   

    let editedElement = document.getElementById(`liContent-${trackId}`)
    saveNote = savedNotes
    console.log(saveNote);
    const getIndex = saveNote.indexOf(editedElement.innerHTML);
   saveNote.splice(getIndex, 1 ,listInput.value);
   localStorage.setItem("notes",JSON.stringify(saveNote))
    editedElement.innerText=listInput.value
  

    console.log(getIndex)
    listInput.value = ""
    noteIndex++;
}





function createSavedNote() {
    if(localStorage.getItem("notes")){
        savedNotes.forEach( element => {
            const div = document.createElement('div')
            div.className="notecontent-container"
            div.setAttribute('draggable', true)

        
            //create li
            const li = document.createElement('li')
            li.innerText = element
            li.id = `liContent-${noteIndex}`
            draggable = "true"
            div.append(li)
            div.addEventListener("dragstart", onDragStart, false)
            div.addEventListener("dragover", onDragOver, false)
            div.addEventListener("dragenter", onDragEnter, false)
            div.addEventListener("dragleave", onDragLeave, false)
            div.addEventListener("dragend", onDragEnd, false)
            div.addEventListener("drop", onDrop, false)
            //create edit btn
            const editBtn = document.createElement('button')
            editBtn.innerText = 'Edit'
            editBtn.classList.add('edit-verify')
            editBtn.id = `editBtn-${noteIndex}`
            editBtn.onclick= editFn 
            div.append(editBtn)
        
        
            //create delete btn
            const delBtn = document.createElement('button')
            delBtn.innerText = 'Delete'
            delBtn.classList.add('delete-verify')
            delBtn.id = `delBtn-${noteIndex}`
            delBtn.onclick = deleteFn
            div.append(delBtn)
    

            nameList.append(div)
            noteIndex++;
        }
    )
    }
}
let targetStart
function onDragStart(event) {
  this.style.opacity = "0.4";

  dragSrcEl = this
  console.log(dragSrcEl);
  event.dataTransfer.effectAllowed = "move"
  event.dataTransfer.setData("text", this.innerHTML)
  targetStart = event.target.firstChild.innerHTML
}
function onDragEnter(event) {
  event.preventDefault()
  this.classList.add("over")
}
function onDragLeave(event) {
  event.preventDefault()
  this.classList.remove("over")
}
function onDragOver(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = "move"
  return false
}
function onDrop(event) {
  if (dragSrcEl != this) {
    dragSrcEl= this.innerHTML
    console.log(targetStart);
    const dropText = this.firstChild.innerHTML
    console.log(dropText)
    const draggedText = targetStart
    console.log(draggedText);
    if (localStorage.getItem("notes" === null)) {
      saveNote=[]
    } else {
      saveNote = JSON.parse(localStorage.getItem("notes"))
      // console.log(saveNote);
    }
    const getIndexOfDraggingNote = saveNote.indexOf(draggedText)
    const getIndexOfDropingNote = saveNote.indexOf(dropText)
    console.log(getIndexOfDraggingNote, getIndexOfDropingNote)
  
    let switchNote = saveNote[getIndexOfDraggingNote] 
    saveNote[getIndexOfDraggingNote] = saveNote[getIndexOfDropingNote] 
    saveNote[getIndexOfDropingNote] = switchNote 

    console.log(saveNote)
    localStorage.setItem("notes", JSON.stringify(saveNote))
    this.innerHTML = event.dataTransfer.getData("text")
    
  }
  return false
}
function onDragEnd(event) {
  event.target.classList.remove("over")
  if (dragSrcEl != this) {
     this.innerHTML = dragSrcEl
    console.log(this.innerHTML)
  }
  this.style.opacity = "1"
};



