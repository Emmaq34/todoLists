import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Details from './Details'
import {connect} from 'react-redux'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {items : [], text: ""};
    console.log(this.props.sideItems)
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({text: value});
  }
  create(){
    this.setState({items: [...this.state.items, this.state.text], text:""});
    this.props.addItem(this.state.text)
  }

  delete(item){
    this.props.deleteItem(item)
  }

  render(){
  const items = this.props.sideItems;
  //console.log(items);
    return(
    <Router>
      <div>
        <button onClick = {() => this.create()}>Add Item</button>
        <ul>
          {items.map(item => (
            <li>
              <Link to = {`/details/${item.category}/${item.category}`}>{item.category}</Link>
              <button onClick = {() => this.delete(item, items)}>Delete Item</button>
            </li>
          ))}
        </ul>
         <input type = "text" onChange = {(e) => this.handleChange(e)} value={this.state.text}/>
         <Switch >
              {items.map(item => (
                  <Route exact path = {`/details/${item.category}/:category`} component={Details}></Route>
              ))}
        </Switch>
      </div>
     </Router>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    sideItems: state.sideItems
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    addItem: (item)=>{
      dispatch({
        type: "ADD_ITEM",
        item: item
      })
    },
    deleteItem: (item)=>{
      dispatch({
        type: "DELETE_ITEM",
        category: item.category,
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);