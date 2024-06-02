import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Modal from './components/CustomModal'

function App() {
  const [completed,setCompleted]=useState(false)
  const [modal,setModal]=useState(false)
  const [activeItem,setActiveItem]=useState({
                                      title: "",
		                                  description: "",
		                                  completed: false })
  const [taskList,setTaskList]=useState([])
  useEffect(()=>{
    refreshList()
  },[])

  const refreshList=()=>{
    axios.get("http://localhost:8000/api/tasks/")
    .then(res=>setTaskList(res.data))
    .catch(err=>console.log(err))
   
  }

  const displayCompleted=status=>{
    if (status){
      return setCompleted(true)
    }
    return setCompleted(false)
  }

  const renderTabList=()=>{
    return (
      <div className='my-5 tab-list'>
        <span
          onClick={()=>displayCompleted(true)}
          className={completed ? "active" : ""}
        >
          completed
        </span>

        <span
          onClick={()=>displayCompleted(false)}
          className={!completed ? "active" : ""}
        >
          Incompleted
        </span>
      </div>)
  }

  const renderItems=()=>{
    const newItems=taskList.filter(
      (item)=>item.completed===completed
    )
    return newItems.map((item)=>(
      <li
        key={item.id}
        className='list-group-item d-flex align-items-center'>
          <span
            className={`todo-title m-2 ${
              completed ? "completed-todo" : ""
            }`}
            title={item.description}
            >
              {item.title}
            </span>
            <span className='m-4'>
              <button
                onClick={()=>editItem(item)}
                className='btn btn-secondary m-2'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </span>
        </li>
    ))
  }
  const toggle=()=>{
    setModal(!modal)
  }
  const handleSubmit=(item)=>{
    toggle()
    alert("save" + JSON.stringify(item))
    if(item.id){
      //if old post to edit and submit
      axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
      .then((res)=>refreshList())
      return
    }
    //if new post to submit
    axios.post("http://localhost:8000/api/tasks/", item)
    .then((res)=>refreshList())
  }
  const handleDelete=(item)=>{
    alert("delete" + JSON.stringify(item))
    axios.delete(`http://localhost:8000/api/tasks/${item.id}/`)
    .then((res)=>refreshList())
  }

 const createItem=()=>{
  const item = { title: "", description: "", completed: false };
  setActiveItem(item)
  setModal(!modal)
 }

const editItem=(item)=>{
    setActiveItem(item)
    setModal(!modal)
}
  return (
    <main className='content'>
      <h1 className='text-success text-uppercase text-center my-4'>
      Gestore attività
      </h1>
      <div className='row'>
        <div className='col-md-6 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            <div className=''>
              <button onClick={createItem} className='btn btn-info'>
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className='list-group list-group-flush'>
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
     { modal ? (
      <Modal 
        activeItem={activeItem}
        toggle={toggle}
        onSave={handleSubmit}
      />
     ) : null
    }
    </main>
  ); 
}





export default App;
