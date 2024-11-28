import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() =>{
    let todoString = localStorage.getItem("todos")
    if(todoString){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, [])

  const saveToLS = () =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) =>{
     setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) =>{
     let t = todos.filter(i=>i.id === id)
     setTodo(t[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id!==id
     });
     setTodos(newTodos);
     saveToLS();
  }

  const handleDelete = (e, id) =>{
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos);
    saveToLS();

  }

  const handleAdd = () =>{
     setTodos([...todos, { id: uuidv4(),
      todo, isCompleted: false}])
     setTodo("")
     
  }

  const handleChange = (e) =>{
     setTodo(e.target.value)
     
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
     return item.id === id;

    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    
  }

  return (
    <>

    <Navbar/>

    <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-400 min-h-[80vh] md:w-1/2'>
     <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
     <div className="addtodo my-5 flex flex-col gap-4">
      <h2 className='text-xl font-bold'>Add a Todo</h2>
      <div className='flex'>

      <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
      <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold disabled:bg-violet-700 mx-2 text-white rounded-md '>Save</button>
      </div>
     </div>
     <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
     <hr />
      <h1 className='text-lg font-bold'>
        Your Todos
      </h1>
      <div className="todos">
        {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
        {todos.map(item=>{

        return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
          <div className='flex gap-5'>
        <input name= {item.id} onChange={handleCheckbox} type="Checkbox" checked={todo.isCompleted} id='' />
          <div className= {item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit />
            </button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete />
            </button>
          </div>
        </div>
        })}
      </div>
    </div>
</>
  )
}

export default App
