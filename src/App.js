import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage =()=>{
  let list = localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } 
  return []
}
function App() {
    const [name, setName] = useState("");
    const [list , setList]=useState(getLocalStorage())
    const[isEditing,setIsEditing]=useState(false)
    const [editID,setEditID]= useState(null)
    const [alert, setAlert] =useState({show:false, msg:"",type:"" })
useEffect(() => {
 const time = setTimeout(()=>{ showAlert(false,"","")},4000)
  return () => {
   clearTimeout(time)
  }
}, [alert])
    const handleSubmit = (e)=>{
      e.preventDefault()
if(!name){
  //display alert
  showAlert(true,"danger","Please enter a valid value ✖️")
  // alert("thhis")

} 
else if(name&&isEditing){
  //deal with edit
  // alert("that")
  setList(list.map((item)=>{
    if(item.id===editID){
      return {...item,title:name}
    }
    return item
  }))
  setName("")
  setEditID(null)
  setIsEditing(false)
  // alert("name")
  showAlert(true,"success","values changed")
}
else{
  //show alert
  //add item to the list
  const newItem ={id: new Date().getTime().toString(),title: name}
  setList([...list, newItem])
  setName("")
  showAlert(true,"success", "successfully added ✔️")
}
}
const showAlert=(show,type,msg)=>{
  setAlert({show:show,type:type, msg:msg})
}
const ClearAll =() =>{
  showAlert(true,"danger","list cleared")
  setList([])
}
const removeItem =(id)=>{
  showAlert(true,"danger","deleted item")
  setList(list.filter((item)=>item.id != id))
}

const editItem =(id)=>{
  const specific = list.find((item)=>item.id==id)
  setIsEditing(true)
  setEditID(id)
  setName(specific.title)
}
useEffect(() => {
  localStorage.setItem("list",JSON.stringify(list))

}, [list])
  return <section className="section-center">
    {/* <div className="grocery-container"> */}
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert{...alert}/>}
      <h3 >groceryBud</h3>
      <div className="form-control">
        <input type="text" className="grocery" placeholder="e.g eggs" value={name}onChange={(e) =>setName(e.target.value)}/>
        <button type="submit" className="submit-btn">
          {isEditing?"Edit":"submit"}
        </button>
      </div>
      </form>
      {list.length>0 &&
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className="clear-btn" onClick={ClearAll}>
          clear items
        </button>
      </div>}
    {/* </div> */}
  </section>
        }
export default App
