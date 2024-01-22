import React, { useState } from "react"
import { TodoForm } from "./TodoForm"

export const Todo = (props) => {
    const {title, description, _id} = props
    const [ formEdit, setFormEdit ] = useState(false)
    
    const close = () => {
        setFormEdit(prevEdit  => !prevEdit )
    }

    return(
        <div className="todoClass">
            { !formEdit ?
                <>
                    <h1>{ title }</h1>
                    <p>{ description }</p>
                    <button onClick={() => props.deleteTodo(_id)}>Delete</button>
                    <button onClick={() => setFormEdit(prevEdit => !prevEdit)}>Edit</button>
                </>
            :
                <>
                <TodoForm
                    title={ title }
                    description={ description }
                    _id={_id}
                    buttonText="Save Changes"
                    submit={props.editTodo}
                    close={close}
                />
                <button onClick={() => setFormEdit(prevEdit  => !prevEdit )} style={{marginTop: '6px'}}>Close</button>
                </>
            }
        </div>
    )
}