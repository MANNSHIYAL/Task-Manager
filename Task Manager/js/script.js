document.addEventListener('DOMContentLoaded', () => {
    const taskField = document.getElementById('taskField');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksList = document.getElementById('tasks');
    const filterTasks = document.getElementById('filterTasks');
  
    // Array to store tasks
    const tasks = [];
  
    // Function to render tasks to the DOM
    function renderTasks(filter = 'all') {
      tasksList.innerHTML = ''; // Clear the task list
  
      tasks
        .filter(task => {
          if (filter === 'all') return true;
          if (filter === 'completed') return task.completed;
          if (filter === 'pending') return !task.completed;
        })
        .forEach((task, index) => {
          const taskItem = document.createElement('li');
          taskItem.classList.add('task-item');
          if (task.completed) {
            taskItem.classList.add('completed');
          }
  
          taskItem.innerHTML = `
            <span>${task.text}</span>
            <div style="display: flex; gap: 10px;">
              <button class="completeBtn">${task.completed ? 'Undo' : 'Mark Complete'}</button>
              <button class="deleteBtn">Delete</button>
            </div>
          `;
  
          // Add event listeners for buttons
          taskItem.querySelector('.completeBtn').addEventListener('click', () => {
            task.completed = !task.completed; // Toggle completion
            renderTasks(filter); // Re-render tasks with the current filter
          });
  
          taskItem.querySelector('.deleteBtn').addEventListener('click', () => {
            tasks.splice(index, 1); // Remove task from array
            renderTasks(filter); // Re-render tasks with the current filter
          });
  
          tasksList.appendChild(taskItem);
        });
    }
  
    // Add task to the array
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskField.value.trim();
      if (!taskText) {
        alert('Task cannot be empty!');
        return;
      }
  
      tasks.push({ text: taskText, completed: false }); // Add task to array
      taskField.value = ''; // Clear input field
      renderTasks(filterTasks.value); // Render tasks with the current filter
    });
  
    // Filter tasks based on selection
    filterTasks.addEventListener('change', () => {
      renderTasks(filterTasks.value);
    });
  });
  