import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {items : [], text: ""};
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({text: value});
  }
  create(){
    this.setState({items: [...this.state.items, this.state.text], text:""});
  }
  
  delete(deleteItem, items){
    const result = items.filter((item) => item != deleteItem);
    this.setState({items: result});
    
  }
  
  update(updateItem, items){
    for(let i = 0 ; i < items.length; i++){
      if(items[i] === updateItem){
          items[i] = this.state.text;
          this.setState ({items:items, text:""});
          break;
      }
    }
  }
  
  render(){
  const items = this.state.items;
  //console.log(items);
    return(
    <Router>
      <div>

        <button onClick = {() => this.create()}>Add Item</button>
        <ul>
        
          {items.map(item => (
            <li>
              <Link to = {`/details/${item}/${item}`}>{item}</Link>
              
              <button onClick = {() => this.delete(item, items)}>Delete Item</button>
              <button onClick = {() => this.update(item, items)}>Update Item</button>
            </li>
          ))}
        </ul>
         <input type = "text" onChange = {(e) => this.handleChange(e)} value={this.state.text}/>
         <Switch >
              {items.map(item => (


                  <Route exact path = {`/details/${item}/:${item}`} render={(props) => <Details {...props} item={item} />}></Route>

                ))}
        </Switch>
        
      </div>
     </Router>
    );
  }
}
class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {items : [], text: ""};
    console.log(this.props.item);
  }
  handleChange(e){
    let value = e.target.value;
    this.setState({text: value});
  }
  create(){
    this.setState({items: [...this.state.items, this.state.text], text:""});
  }
  
  delete(deleteItem, items){
    const result = items.filter((item) => item != deleteItem);
    this.setState({items: result});
    
  }
  
  update(updateItem, items){
    for(let i = 0 ; i < items.length; i++){
      if(items[i] === updateItem){
          items[i] = this.state.text;
          this.setState ({items:items, text:""});
          break;
      }
    }
  }
  
  render(){
  //const shortName = this.props.match.params.shortName;
  //console.log(shortName);
  const items = this.state.items;
  //console.log(items);
    return(
    
      <div>

        <button onClick = {() => this.create()}>Add Item</button>
        <ul>
          {this.props.item}
          {items.map(item => (
            <li>
              {item}
              
              <button onClick = {() => this.delete(item, items)}>Delete Item</button>
              <button onClick = {() => this.update(item, items)}>Update Item</button>
            </li>
          ))}
        </ul>
         <input type = "text" onChange = {(e) => this.handleChange(e)} value={this.state.text}/>
         
      </div>
     
    );
  }
}

export default App;
