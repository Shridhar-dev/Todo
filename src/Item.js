import React from 'react'

export default function Item(props) {
        return(
            <li dataId={ props.dataid } id={props.id}>
                <h2>{ props.name }</h2>
                <button onClick={props.funcDel} >X</button>
                <button name='edb' onClick={props.funcSub} >Edit</button>
            </li>
        )
    }
