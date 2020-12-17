import React, { useState } from "react"

export const TodoForm = () => {

    const handleChange = (e) => {
        console.log("Temp")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Temp")
    }

    return(
        <form>
            <input 
                type="text"
                name="title"
                placeholder="Title of to-do item? (required)"
                onChange={handleChange}
            />
            <input 
                type="text"
                name="description"
                placeholder="Description (optional)"
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Add</button>
        </form>
    )
}