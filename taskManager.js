$(document).ready(function () {
    loadTasks();

    $("#addTask").click(function () {
        let taskText = $("#taskInput").val().trim();
        if (taskText !== "") {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push({ id: Date.now(), text: taskText });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            $("#taskInput").val("");
            loadTasks();
        }
    });

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        $("#taskList").empty();
        tasks.forEach(task => {
            $("#taskList").append(`
                <li class="list-group-item d-flex justify-content-between">
                    <span contenteditable="true" class="task-text">${task.text}</span>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </li>
            `);
        });

        $(".task-text").blur(function () {
            let updatedText = $(this).text();
            let taskId = $(this).closest("li").find(".delete-task").data("id");
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(task => {
                if (task.id == taskId) task.text = updatedText;
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        $(".delete-task").click(function () {
            let taskId = $(this).data("id");
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(task => task.id != taskId);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        });
    }
});