const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

const FILE_PATH = 'DATA_FILE.JSON';

function loadTasks() {
    if (!fs.existsSync(FILE_PATH)) return [];
    try {
        return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    } catch {
        return [];
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}



function savedata(task, time) {
    const tasks = loadTasks();
    const newTask = {
        id: Date.now(),
        task,
        time
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully:\n  → ${task} (by ${time})`);
}

function showtasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks available.");
        return;
    }

    console.log(" Your Tasks:");
    console.log("------------------------------------------");
    tasks.forEach((t, index) => {
        console.log(`${index + 1}. [ID: ${t.id}] Task: ${t.task} | Deadline: ${t.time}`);
    });
    console.log("------------------------------------------");
}

function removeTaskById(id) {
    let tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        console.log(` Task with ID ${id} not found.`);
        return;
    }

    const removedTask = tasks.splice(taskIndex, 1)[0];
    saveTasks(tasks);
    logToTextFile(`Removed Task: ${removedTask.task} (ID: ${id})`);
    console.log(`Task removed successfully: ${removedTask.task}`);
}

program
    .name('todolist')
    .description(`
*******************************************
  TODOLIST CLI
Commands:
  add <task> <time>    → Add a new task
  remove <id>          → Delete a task by ID
  ls                   → Show all tasks
*******************************************`)
    .version('1.0.0');

program
    .command('add')
    .description('Add a new todo to the list')
    .argument('<task>', 'Task description')
    .argument('<time>', 'Deadline for the task')
    .action((task, time) => {
        savedata(task, time);
    });

program
    .command('remove')
    .description('Remove a task by ID')
    .argument('<id>', 'Task ID to remove')
    .action((id) => {
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
            console.log("Please provide a valid numeric ID.");
        } else {
            removeTaskById(numericId);
        }
    });

program
    .command('ls')
    .description('Show all tasks')
    .action(() => {
        showtasks();
    });

program.parse();
