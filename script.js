const catImage = document.getElementById('catImage');

catImage.addEventListener('click', () => {
    catImage.classList.add('shake');
    setTimeout(() => {
        catImage.classList.remove('shake');
    }, 500);
});

function saveTasks() {
    const tasks = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", tasks);
    updateCatImage(document.getElementById("taskList").children.length); // �ۑ����ɔL�摜�X�V
}

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        document.getElementById("taskList").innerHTML = saved;
        attachEventHandlers();
        updateCatImage(document.getElementById("taskList").children.length); // �ǂݍ��ݎ��ɔL�摜�X�V
    }
}

function attachEventHandlers() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = () => {
            btn.parentElement.remove();
            saveTasks();
        };
    });

    document.querySelectorAll(".checkbox").forEach(box => {
        box.onchange = () => {
            const taskText = box.nextElementSibling;
            if (box.checked) {
                taskText.style.textDecoration = "line-through";
                taskText.style.opacity = 0.6;
            } else {
                taskText.style.textDecoration = "none";
                taskText.style.opacity = 1;
            }
            saveTasks();
        };
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const category = document.getElementById("categorySelect").value;
    const task = input.value.trim();

    if (task === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" class="checkbox">
    <span class="task-text">${task}</span>
    <span class="category ${category}">${category}</span>
    <button class="delete-btn">�폜</button>
  `;
    document.getElementById("taskList").appendChild(li);
    input.value = "";

    attachEventHandlers();
    saveTasks();
}

// �^�X�N���ɉ����ĔL�̉摜��؂�ւ�
function updateCatImage(taskCount) {
    if (taskCount <= 5) {
        catImage.src = 'nekoko1.png'; // ���C�ȔL
    } else {
        catImage.src = 'nekoko_tired.png'; // ��ꂽ�L�i�摜�p�ӂ��Ăˁj
    }
}

window.onload = loadTasks;
