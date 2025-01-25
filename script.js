function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
      tasks.push({ text: task.firstChild.nextSibling.nodeValue, completed: task.firstChild.checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      tasks.forEach(task => {
        let li = document.createElement('li');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = function() {
          li.style.textDecoration = this.checked ? 'line-through' : 'none';
        };
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function() {
          taskList.removeChild(li);
          saveTasks();
        };
        li.appendChild(removeBtn);
        taskList.appendChild(li);
        if (checkbox.checked) {
          li.style.textDecoration = 'line-through';
        }
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    document.getElementById('taskInput').focus();
  });
  
  function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() !== '') {
      let li = document.createElement('li');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.onchange = function() {
        li.style.textDecoration = this.checked ? 'line-through' : 'none';
        saveTasks();
      };
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(taskInput.value));
      let removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.onclick = function() {
        taskList.removeChild(li);
        saveTasks();
      };
      li.appendChild(removeBtn);
      taskList.appendChild(li);
      taskInput.value = '';
      saveTasks();
    }
    taskInput.focus();
  }
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
  
  