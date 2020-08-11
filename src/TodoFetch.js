import React from 'react'
import db from './firebase'

let indexer;
let arr_indexer;

class Todo extends React.Component{
    constructor(){
        super()
        this.state={
            name:[],
            formval:'',
            eformval:'',
            loading:true,
            eformdisplay:'none'
            
        }
        this.onDelete = this.onDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    /*Fetching Data from firebase*/

    componentWillMount(){
        db.collection('Todoitems').onSnapshot((snaper)=>{
            let changes = snaper.docChanges();
            changes.forEach((change)=>{
                if(change.type === "added"){  
                this.setState(prevState=>{
                    return{
                        name:[...prevState.name,change.doc],
                        loading:false
                    }
                    })
            }
            })
        })
    }

    /*Methods*/

    /* deleting items from firebase and array when we click on X button */

    onDelete(e){
        e.preventDefault();
        indexer = e.target.parentElement.getAttribute("dataId");
        arr_indexer = e.target.parentElement.getAttribute("id");
        db.collection('Todoitems').doc(indexer).delete();
        let narray = this.state.name
        
        this.setState({
            name:narray.splice(arr_indexer,1) ,
        }) 
    }

    /* Updating State variables relating to forms  */

    handleChange(e){
        let name = e.target.name
        let value = e.target.value
       
            this.setState({
                [name]:value
            })
            console.log([name])

        }
    


    /* Updating State variables relating to Buttons(delete,edit,show edit form) */

    handleSubmit(e){
        e.preventDefault();
        if(e.target.name === "addbutton"){
            db.collection('Todoitems').add({Item:this.state.formval})
                     
        }
        else if(e.target.name === "edb"){
            indexer = e.target.parentElement.getAttribute("dataId");
            this.setState({
                eformdisplay:'inline'
            })
        }
        else if(e.target.name === "editbutton"){ 
            db.collection('Todoitems').doc(indexer).update({Item:this.state.eformval})
            this.setState({
                eformdisplay:'none'
            })
        }
    }
    
    /* Rendering of JSX */

    render(){ 

        /* Mapping over array of objects */

        const items = this.state.name.map((d)=>{
            return(
            <li dataId={d.id }id={this.state.name.indexOf(d) }>
                <h2>{d.data().Item}</h2>
                <button onClick={this.onDelete} >X</button>
                <button name='edb' onClick={this.handleSubmit} >Edit</button>
            </li>
            )
        }) 
        
        /*To prevent errors we check whether we have retrievied all the data from firebase */
        
        if(this.state.loading === true){
            return(
            <h2>Wait</h2>
            )
        }

        /* Main rendering area */

        else{
            return( 
            <>
            <h2>Todo</h2>
            <form>
                <input name="formval" placeholder="new item" onChange={this.handleChange}></input>
                <button onClick={this.handleSubmit} name="addbutton">Submit</button>
            </form>
            <form style={{display:this.state.eformdisplay}}>
                <input name="eformval" placeholder="edit item" onChange={this.handleChange}></input>
                <button onClick={this.handleSubmit} name="editbutton">Edit</button>
            </form>
            
            {/* Show all items*/}

            <h2>{items}</h2>
            </>
            )
        }
    }
}
export default Todo;
