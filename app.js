//getting entire 'ul' to attach event listener to the 'li'
let todoList = document.querySelector('#todo-list ul');

//DELETE TODOS
//attaching an event listener to the 'todoList'
todoList.addEventListener('click', (evt) => {
  if (evt.target.className === 'delete') {
    let parentListItem = evt.target.parentElement;
    todoList.removeChild(parentListItem);
    console.log('item deleted');
  }
});

//ADD A TODO ITEM TO THE LIST
let addTodoForm = document.forms['add-todos'];
addTodoForm.addEventListener('submit', (evt) => {
  //prevent default refresh of DOM by using method
  evt.preventDefault();
  //fetch the content to be added from input box
  let item = addTodoForm.querySelector('input[type="text"]').value;
  //create new elements to append to DOM
  let newItem = document.createElement('li');
  let newContent = document.createElement('span');
  let newDelete = document.createElement('span');
  let newDone = document.createElement('span');
  //add the content to the newly created elements
  newContent.textContent = item;
  newDelete.textContent = 'delete';
  newDone.textContent = 'done';
  //adding the classes to the elements (this allows proper styling to be applied dynamically)
  newContent.classList.add('content');
  newDelete.classList.add('delete');
  newDone.classList.add('done');
  //appending the items to the DOM
  newItem.appendChild(newContent);
  newItem.appendChild(newDelete);
  newItem.appendChild(newDone);
  todoList.appendChild(newItem);
});

//SEARCH FOR TODOS
let searchForm = document.forms['search-todos'].querySelector('input');
searchForm.addEventListener('keyup', (evt) => {
  let searchTerm = evt.target.value.toLowerCase();
  const todoItems = todoList.querySelectorAll('li');
  todoItems.forEach((todo) => {
    const item = todo.firstElementChild.textContent;
    if (item.toLowerCase().includes(searchTerm)) {
      todo.style.display = 'block';
    } else {
      todo.style.display = 'none';
    }
  });
});

//HANDLE COMPLETED TODOS
///attaching event listener to the todoList
todoList.addEventListener('click', (evt) => {
  if (evt.target.className === 'done') {
    let contentItem = evt.target.parentElement.firstElementChild;
    let oldContent = contentItem.innerHTML;
    if (!oldContent.includes('<del>')) {
      let newContent = '<del>' + oldContent + '</del>';
      contentItem.innerHTML = newContent;
    }
  }
});

//RESET ALL COMPLETED TODOS
//attaching event listener to checkbox button
let resetBtn = document.forms['add-todos'].querySelector(
  'input[type="button"]'
);
resetBtn.addEventListener('click', (evt) => {
  let listItems = evt.target.parentElement.previousElementSibling.querySelectorAll(
    '.content'
  );
  listItems.forEach((item) => {
    let kids = item.childNodes;
    if (kids[0].nodeName === 'DEL') {
      let text = kids[0].innerHTML;
      kids[0].outerHTML = text;
    }
  });
});
