document.addEventListener('DOMContentLoaded', async function(event) {
  // Step 1: Make the world's tiniest to-do app
  
  document.querySelector("form").addEventListener("submit", async function(event){
    event.preventDefault()
    
    let todoText = document.querySelector("#todo").value
    console.log(todoText)

    if (todoText.length > 0) {

    document.querySelector(".todos").insertAdjacentHTML ("beforeend", `
      <div class = "py-4 text-xl border-b-2 border-yellow-500 w-full">
        ${todoText}
      <a href="#" class="done p-2 text-sm bg-green-500 text-white">✔</a>
      </div>
    `)
    document.querySelector("#todo").value = ""

    //Code to put the submission into Firebase
    let addToDo = await db.collection("todos").add({
      text: todoText
    })
  }
})
  
  // Step 2: Read existing to-dos from Firestore

  let db = firebase.firestore()
  let querySnapshot = await db.collection("todos").get()
  let todos = querySnapshot.docs
  
  for (let i=0; i<todos.length; i++){
    let todoID = todos[i].id
    let todoData = todos[i].data()
    let todoText = todoData.text
    
    document.querySelector(".todos").insertAdjacentHTML ("beforeend", `
      <div class = "py-4 text-xl border-b-2 border-yellow-500 w-full">
        ${todoText}
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✔</a>
      </div>
    `)
  }

  // Step 3: Add code to Step 1 to add todo to Firestore
  // Step 4: Add code to allow completing todos
})