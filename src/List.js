import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items,removeItem, editItem}) => {
  return <div className="grocery-list">
    {items.map(({id, title})=>{
      return(
        <section key={id}className="grocery-item">
          <p>{title}</p>
          <div className="btn-container">
            <button onClick={()=>editItem(id)}type="button" className="edit-btn"><FaEdit/></button>
            <button onClick={()=>removeItem(id)} type='button' className="delete-btn"><FaTrash/></button>
          </div>
        </section>
      )
    })}
  </div>

}

export default List
