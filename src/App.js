import {useState , useEffect} from 'react';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
 
import './App.css';
import Tasks from './components/Tasks';
import Header from './components/Header';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

const App = () =>  {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks , setTask] = useState([]);

  useEffect(() => {
    const getTask =  async () =>{
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }
    getTask()
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
   
   return data
  }


  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
   
   return data
  }





//Add Task
const addTask =async (task) => {

  const res = await fetch('http://localhost:5000/tasks' , {
    method : 'POST',
    headers : {
      'Content-type' : 'application/json'
    },
    body : JSON.stringify(task)
  })

  const data = await res.json();

  setTask([...tasks,data]);

  // console.log(task);
  // const id = Math.floor(Math.random() * 1000)+1;
  // const newTask = {id , ...task};
  // setTask([...tasks,newTask]);
}

//DeleteTask
const deleteTask =async (id) => {
const res = await fetch(`http://localhost:5000/tasks/${id}`, {
method : 'DELETE',
})

  res.status === 200 ? setTask(tasks.filter((task) => task.id !== id)) : alert('Error deleting this task')

  
}

//Toggle reminder
const togglereminder =async (id) => {
  const taskToToggle = await fetchTask(id);
  const updateTask = {...taskToToggle, reminder : !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}` , {
    method : 'PUT',
    headers : { 'Content-type' : 'application/json'},
    body : JSON.stringify(updateTask)
  });

  const data = await res.json();
  console.log("Toggle " );
  setTask(tasks.map((task) => task.id === id ? {...task, reminder : data.reminder} : task))
}


  return (
      <Router>
      <div className="container">
      <Header 
      onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd={showAddTask}
      />  
         <Routes>
          <Route 
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={togglereminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
         <Route path ="/about" element={<About></About>}></Route>
         </Routes>
        <Footer/>
      </div>
      </Router>
  );
}

export default App;
