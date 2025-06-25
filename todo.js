const { Command } = require('commander');
const { timeStamp } = require('console');
const program = new Command();
const fs = require("fs")
function savedata(taskk, time) {
    const filePath = 'DATA_FILE.JSON';

    let tasks = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        try {
            tasks = JSON.parse(fileData); // Convert JSON string to array
        } catch (err) {
            tasks = []; // If file is empty or broken
        }
    }

    const newtask = [{
        id: Date.now(),
        task: taskk,
        time: time
    }]
    tasks.push(newtask);
    const content = `Task: ${taskk} ${time}\n`;
    fs.writeFile("DATA_FILE.JSON", JSON.stringify(tasks, null, 2), (err) => {
        if (err) throw err;
        console.log("Task added succesfully!!")
    })
    fs.appendFile("data.txt", content, "utf-8", (err) => {
        if (err) throw err;
        else {

        }
    })
}
showtasks = () => {
    fs.readFile("data.txt", "utf-8", (err, data) => {
        if (err) throw err;
        else {
            console.log(data);
        }
    });
}

program
    .name('todolist')
    .description('*******************************************\nCommands\nadd : To add new list\nremove : To delete the list\nls :To view the tasks\n*******************************************\n')
    .version('0.8.0')

program.command('add')
    .description('To add new todo in the list')
    .argument('<string>', "add task")
    .argument('<time>', "deadline")
    .action((task, time) => {
        savedata(task, time);
    })
program.command('remove')
    .description('To remove the todo from the list')
    .action(() => {

    })
program.command('ls')
    .description('To remove the todo from the list')
    .action(() => {
        showtasks();
    })

program.parse();