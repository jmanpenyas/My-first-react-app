import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";


function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  // Getting a single task
  const getTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()


    return data
  }

  // Fetch the initial data from backend
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()


    return data
  }
  // Get the tasks and put them on the tasks used by the app

  // add action
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  // showing add task panel
  const [showAddTask, setShowAddTask] = useState(false)

  // delete action
  const deleteTask = async (id) => {
    console.log('delete', id)
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // toggle reminder
  const toggleReminder = async (id) => {
    console.log('toggle', id)
    const taskToToggle = await getTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id ?
        { ...task, reminder: data.reminder }
        : task
    ))
  }
  return (
    <Router>
    <div className='container'>
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
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>  
  );
}

export default App;

