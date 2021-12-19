
import Task from "./Task";
//const tasks = 
const Tasks = ( {tasks , onDelete , onToggle} ) => {
    console.log(tasks);
    return (
        <div>
            {tasks.map( task => 
                // <h3 key={task.id} className="task">{task.text} {task.day}</h3>
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            )}
        </div>
    )
}

export default Tasks
