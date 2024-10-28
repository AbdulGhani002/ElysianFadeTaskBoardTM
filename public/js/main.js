document.addEventListener('DOMContentLoaded', function() {
  // Task Modal
  const taskModal = document.getElementById('taskModal');
  const taskModalClose = document.getElementsByClassName('close')[0];
  const taskModalOpen = document.getElementById('openTaskModal');
  const taskForm = document.getElementById('taskForm');

  taskModalOpen.onclick = function() {
    taskModal.style.display = 'block';
  }

  taskModalClose.onclick = function() {
    taskModal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == taskModal) {
      taskModal.style.display = 'none';
    }
  }

  // Task Form Submission
  taskForm.onsubmit = function(event) {
    event.preventDefault();
    const formData = new FormData(taskForm);
    const taskData = {};
    formData.forEach((value, key) => {
      taskData[key] = value;
    });

    // Send task data to server
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Close modal and reset form
        taskModal.style.display = 'none';
        taskForm.reset();
        // Reload tasks
        loadTasks();
      } else {
        alert('Error creating task');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  // Load Tasks
  function loadTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => {
        const taskBoard = document.getElementById('taskBoard');
        taskBoard.innerHTML = '';
        data.tasks.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.className = 'task';
          taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
          `;
          taskBoard.appendChild(taskElement);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Initial load
  loadTasks();
});
