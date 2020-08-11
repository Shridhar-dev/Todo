import React from 'react'
import db from './firebase'
let listItems = new Array();
let indexer;
let arr_indexer;
class Todo extends React.Component{
    constructor(){
        super()
        this.state={
            name:[],
            formval:'',
            eformval:'',
            loading:true
            
        }
        this.onDelete = this.onDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    componentWillMount(){
        db.collection('Todoitems').onSnapshot((snap)=>{
            let changes = snap.docChanges();
            changes.forEach((change)=>{
                if(change.type === 'added'){
                    listItems.push(change.doc.id)
                    this.setState(prevState=>{
                        return{
                       name:[...prevState.name,change.doc],
                       loading:false
                        }
                    })
                }
                else if(change.type === 'removed'){
                    console.log(arr_indexer)
                    let narray = this.state.name.splice(arr_indexer,1); 
                    console.log(narray)
                    this.setState({
                        name:narray,
                    })             
                }
                else if(change.type === 'modified'){
                    
                }
            })
        })
    }
    onDelete(e){
        e.preventDefault();
        indexer = e.target.parentElement.getAttribute("dataId");
        arr_indexer = e.target.parentElement.getAttribute("id");
        db.collection('Todoitems').doc(indexer).delete();
    }
    handleChange(e){
        let form = e.target
        if(form.name === "new-item"){
            this.setState({
                formval:form.value
            })
            console.log(this.state.formval)

        }
        else if(form.name === "edit-item"){
            this.setState({
                eformval:form.value
            })
            console.log(this.state.eformval)
        }
    }
    handleSubmit(e){
        e.preventDefault();
        if(e.target.name === "addbutton"){
        db.collection('Todoitems').add({Item:this.state.formval})
        }
        else if(e.target.name === "edb"){
            indexer = e.target.parentElement.getAttribute("dataId");
        

        }
        else if(e.target.name === "editbutton"){
            
            db.collection('Todoitems').doc(indexer).update({Item:this.state.eformval})

        }
    }
    
    render(){ 
        const items = this.state.name.map((d)=>{
            return(
            <li dataId={d.id }id={this.state.name.indexOf(d) }>
                <h2>{d.data().Item}</h2>
                <button onClick={this.onDelete} >X</button>
                <button name='edb' onClick={this.handleSubmit} >Edit</button>
            </li>
            )
        })        
        if(this.state.loading === true){
            return(
            <h2>Wait</h2>
            )
        }
        else{
            return( 
            <>
            <h2>Todo</h2>
            <form>
                <input name="new-item" placeholder="new item" onChange={this.handleChange}></input>
                <button onClick={this.handleSubmit} name="addbutton">Submit</button>
            </form>
            <form>
                <input name="edit-item" placeholder="edit item" onChange={this.handleChange}></input>
                <button onClick={this.handleSubmit} name="editbutton">Submit</button>
            </form>
            

            <h2>{items}</h2>
            </>
            )
        }
    }
}
export default Todo;