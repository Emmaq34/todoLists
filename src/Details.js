import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux'

class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {items : [], text: ""};
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({text: value});
  }
  addTodo(){
    this.props.addTodo(this.props.item,this.state.text)}

  delete(e,todo){
    console.log('todo is', todo)
    this.props.deleteTodo(this.props.item, todo)
  }

  render(){
  const todos = this.props.todos ? this.props.todos: [];
  console.log(todos);
    return(
      <div>
        <h2>YOUR TODOS...</h2>
        <ul>
          {todos.map(todo => (
            <li>
              <span className={todo.completed? "completed": ""}>{todo.name}</span>
              <button onClick = {(e) => this.delete(e,todo)}>Delete Todo</button>
            </li>
          ))}
        </ul>
         <input type = "text" onChange = {(e) => this.handleChange(e)} value={this.state.text}/>
         <button onClick = {() => this.addTodo()}>Add Todos</button>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) =>{
  let item = state.sideItems.find((item)=>{
    return item.category == ownProps.match.params.category
  })
  return{
    item,
    todos: item.todos
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    addTodo: (item,todo)=>{
      dispatch({
        type: "ADD_TODO",
        category: item.category,
        todo
      })
    },
    deleteTodo: (item,todo)=>{
      dispatch({
        type: "DELETE_TODO",
        category: item.category,
        todoName: todo.name
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);