import { addNewTask, updateTask } from './server';

(async function myFunc() {
    await addNewTask({
        name: "My Latest Task",
        id: "12222",
        
    })

    await updateTask({
        id: "12222",
        name: "My task - UPDATED!!!"
    })
})();
