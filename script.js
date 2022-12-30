//DOM elements

let notesData = JSON.parse(localStorage.getItem("myNotes"))|| []
let newNotesButton = document.querySelector(".notesNew")
let notesModal = document.querySelector(".notesModal")
let notesForm = document.querySelector(".notesForm")
let closeForm = document.querySelector(".closeForm")
let notesList = document.querySelector(".notesList")
let searchForm = document.querySelector(".searchForm")

//Open Modal

newNotesButton.addEventListener('click',function(){
  notesModal.classList.add("active")
})

//Close Modal

closeForm.addEventListener('click', function(){
  notesModal.classList.remove("active")
})

//Handle note form

notesForm.addEventListener("submit", function(e){
  e.preventDefault()
  let title = e.target.noteTitle.value
  let content = e.target.noteEntry.value
  let noteObj = createNoteObj(title,content);

  notesData.push(noteObj)
  localStorage.setItem("myNotes", JSON.stringify(notesData))
  populateNotes(notesData)
  notesModal.classList.remove("active")
  e.target.reset()
})

//Populate notes on the DOM

function populateNotes(notesData){ console.log("inside")
  let allNotes = notesData.map(note=>{
    return `<div class="notesItem">
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <div class="notesMeta">
          <button class="notesDelete" data-id="${note.id}"> <img src="/assets/trash.svg" height="12" alt=""> Delete</button>
        </div>
      </div> `
    }).join("")
    notesList.innerHTML = allNotes
}

//Populate notes when page loads

populateNotes(notesData)

//Function to create object 

function createNoteObj(title,content){
  let newNote = {
    id :crypto.randomUUID(),
    title : title,
    content : content
  }
return newNote
}

//Delete a note

notesList.addEventListener('click',function(e){
  if(e.target.classList.contains('notesDelete')){
    let shouldDelete = confirm("Are you sure to delete this note?")
    if(shouldDelete){
      notesData = notesData.filter(item=>item.id !== e.target.dataset.id)
      localStorage.setItem("myNotes", JSON.stringify(notesData))
      populateNotes(notesData)
    }
  }
})

//View All Notes

let viewAllBtn = document.querySelector('.btnAll');
viewAllBtn.addEventListener("click", function(e){
  console.log(notesData)
  populateNotes(notesData)

})


// Search for notes 

searchForm.addEventListener('submit', function(e){
  e.preventDefault()
  if(e.target.txtSearch.value === ""){
   // alert("Please enter a keyword to search")
  }
  else{
    let searchWord = e.target.txtSearch.value
    searchWord = searchWord.toLowerCase()
    let newNotesData = []
    notesData.forEach(note => {
      let flag = false
      let words = note.title.toLowerCase()
      let wordsArray = words.split(" ")
      let wordMatch =  wordsArray.find(el => el == searchWord)
      wordMatch != undefined ? newNotesData.push(note):""
      // for(let i=0; i < wordsArray.length; i++){
      //   if(wordsArray[i] === searchWord){
      //     flag = true;
      //   }
      // }
      // if(flag){
      //   newNotesData.push(note)
      // }
    });
    populateNotes(newNotesData)
    e.target.txtSearch.value = ""
  }
  
})