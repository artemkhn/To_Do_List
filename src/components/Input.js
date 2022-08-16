import React, {useState, useEffect} from 'react'
import '../css/Input.css'
import Delete from '../images/delete.png';


export default function Input() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [input, setInput] = useState('');
    const addInput = (event) => {
        event.preventDefault();
        const createTask = {
            id: Math.floor(Math.random() * 100),
            text: input,
            done: false
        }
        if(input !== "") {
            setTasks([...tasks, createTask]);
            setInput('');
        }
    }
    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }
    const taskComplete = (id) => {
        setTasks(
            tasks.map(task => (
                task.id === id ? {...task, done: !task.done} : task
            ))
        )
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])
  return (
    <div className='mainContainer'>
        <form onSubmit={addInput}>
            <input onChange={event => setInput(event.target.value)} value={input} type="text" placeholder="Task"/>
            <button>Add</button>
        </form>
        <div id="taskC">
            {tasks.map(task => (
                <div key={task.id} className="task">
                    <p className={task.done ? 'doneTask' : 'eachTask'}>{task.text}</p>
                    <img onClick={() => removeTask(task.id)} src={Delete} alt="garbage" className="eachImage"/>
                    <input className="eachCheck" onChange={() => taskComplete(task.id)} type='checkbox' defaultChecked={task.done ? true : false} />
                </div>
            ))}
        </div>
    </div>
  )
}
