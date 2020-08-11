import React from 'react'

export default function Todo(props) {
    return (
       <li>
            <h2>{props.name}</h2>
            <button>X</button>
            <button>Edit</button>
       </li>
    )
}
