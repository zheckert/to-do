import React, { useState } from "react"
import { TodoForm } from "./TodoForm"

//Have a checkbox that will mark something complete and alter styling via conditional rendering

export const Todo = (props) => {
    const {title, description, _id} = props
    const { formEdit, setFormEdit } = useState(false)
    
    return(
        <div>
            { !formEdit ?
                <>
                    <h1>{ title }</h1>
                    <p>{ description }</p>
                    <button onClick={() => props.deleteTodo(_id)}>Delete</button>
                    <button onClick={() => setFormEdit(formEdit => !formEdit)}>Edit</button>
                </>
            :
                <>
                <TodoForm
                    title={ title }
                    description={ description }
                    _id={_id}
                    buttonText="Submit changes" 
                    submit={props.editTodo}
                />
                <button onClick={() => setFormEdit(formEdit => !formEdit)}>Close</button>
                </>
            }
        </div>
    )
}