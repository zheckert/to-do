import React, { useState } from "react"

export const TodoForm = (props) => {
    const initialInputs = {
        title: props.title || "",
        description: props.description || "" 
    }
    const [inputs, setInputs] = useState(initialInputs)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.submit(inputs, props._id)
        setInputs(initialInputs)
        if(props.close){
            props.close()
        }
    }

    return(
        <>
            <form className="centeredForm">
                <input 
                    type="text"
                    name="title"
                    value={inputs.title}
                    placeholder="Title of to-do item? (required)"
                    onChange={handleChange}
                    className="inputSpacer"
                />
                <input 
                    type="text"
                    name="description"
                    value={inputs.description}
                    placeholder="Description (optional)"
                    onChange={handleChange}
                    className="inputSpacer"
                />
                <button onClick={handleSubmit}>{ props.buttonText }</button>
            </form>
        </>
    )
}