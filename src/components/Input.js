import React, {useState, useEffect} from 'react'
import '../css/Input.css'

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
        setTasks([...tasks, createTask]);
        setInput('');
    }
    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])
  return (
    <div>
        <form onSubmit={addInput}>
            <input onChange={event => setInput(event.target.value)} value={input} type="text" placeholder="Task"/>
            <button>Add</button>
        </form>
        <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <p>{task.text}</p>
                    <button onClick={() => removeTask(task.id)}>Remove</button>
                </div>
            ))}
        </div>
    </div>
  )
}
