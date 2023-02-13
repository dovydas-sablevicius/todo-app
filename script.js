let todos;
    const savedTodos = JSON.parse(localStorage.getItem('todos'));

    if (Array.isArray(savedTodos)) {
      todos = savedTodos;
    } else {
      todos = [{
        // <- Model section ->
        title: 'Get groceries',
        dueDate: '2023-02-01',
        id: 'id1'
      }, {
        title: 'Wash car',
        dueDate: '2023-02-02',
        id: 'id2'
      }, {
        title: 'Make dinner',
        dueDate: '2023-02-03',
        id: 'id3'
      }];
    }
    
    // Saves Todos
    const saveTodos = () => {
       localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Creates a todo
    const createTodo = (title, dueDate) => {
      const id = '' + new Date().getTime();

      todos.push({
        title: title,
        dueDate: dueDate,
        id: id
      });
      saveTodos();
    }

    // Deletes a todo
    const removeTodo = idToDelete => {
      todos = todos.filter(todo => { 
        if (todo.id === idToDelete) {
          return false;
        } else{  
          return true;
        }
      });
      saveTodos();
    }

    // Toggles a todo check
    function toggleCheckedTodo(todoId, checked){
      todos.forEach(function(todo){
        if(todo.id === todoId){
          todo.isDone = checked; 
        }
      });
    }

    // Toggles edit a todo
    function toggleEditTodo(idToChange){
      todos.forEach(function(todo){
        if (todo.id === idToChange) {
          todo.isEditing = true;
        } else{
          todo.isEditing = false;
        }
      });
    }

    // Updates todo data
    function updateTodo(idToChange, titleName, dueDateVal){
      todos.forEach(function(todo){
        if (todo.id === idToChange) {
          todo.title = titleName
          todo.dueDate = dueDateVal
          todo.isEditing = false;
        }
      });
    }

    // <- Controller section ->

    const onAddTodo = () => {
      const title = document.getElementById('todo-title').value;
      const dueDate = document.getElementById('date-picker').value;

      createTodo(title, dueDate);
      render();
    }

    const onDelete = todoToDelete => {
      return () => {
        removeTodo(todoToDelete.id);
        render();
      }
    }

    const onCheck = event => {
      const checkBox = event.target;

      const todoId = checkBox.dataset.todoId;
      const checked = checkBox.checked;

      toggleCheckedTodo(todoId, checked);
      render();
    }

    const onEdit = event => {
      const editButton = event.target;
      const idToChange = editButton.dataset.todoId;

      toggleEditTodo(idToChange);
      render();
    }

    const onUpdate = event => {
      const editButton = event.target;
      const idToChange = editButton.dataset.todoId;

      const todoTitle = document.getElementById('inputBox').value
      const dueDateVal = document.getElementById('datePicker').value

      updateTodo(idToChange, todoTitle, dueDateVal)
      render();
    }


    // <- View section ->

    const render = () => {
      document.getElementById('todo-list').innerHTML = '';
      
      todos.forEach(function (todo){
        
        const element = document.createElement('div');
        if (todo.isEditing === true) {

          // Input-text
          const inputBox = document.createElement('input');
          inputBox.type = 'text';
          inputBox.id = 'inputBox';
          inputBox.value = todo.title;
          element.appendChild(inputBox);

          // Input-date
          const datePicker = document.createElement('input');
          datePicker.type = 'date';
          datePicker.id = 'datePicker';
          datePicker.value = todo.dueDate;
          datePicker.style = 'margin-left: 4px';
          element.appendChild(datePicker);

          // Update button
          const updateButton = document.createElement('button');
          updateButton.innerText = 'Update'
          updateButton.style = 'margin-left: 5px';
          updateButton.dataset.todoId = todo.id;
          updateButton.onclick = onUpdate;
          element.appendChild(updateButton);
          
        } else {
          
          element.innerText = todo.title + ' ' + todo.dueDate;
          
          // CheckBox
          const checkBox = document.createElement('input');
          checkBox.type = 'checkbox';
          checkBox.onchange = onCheck;
          checkBox.dataset.todoId = todo.id;
          if (todo.isDone === true) {
            checkBox.checked = true;
          }else{
            checkBox.checked = false;
          }
          element.prepend(checkBox);

          // EditButton
          const editButton = document.createElement('button');
          editButton.innerText = 'edit'
          editButton.style = 'margin-left: 10px';
          editButton.onclick = onEdit;
          editButton.dataset.todoId = todo.id
          element.appendChild(editButton);
          
          // DeleteButton
          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'delete';
          deleteButton.style = 'margin-left: 12px';
          deleteButton.onclick = onDelete(todo);
          element.appendChild(deleteButton);
          
        }
        const todoList = document.getElementById('todo-list');
        todoList.appendChild(element); 
      });
    }
    render();