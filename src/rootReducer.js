const initState = {
    // sideItems : [
    //  {
    // 	  category: string
    // 	  todo: [{
    // 		 name: string,
    // 		 complete: true/false
    //    },{
    // 		 name: string,
    // 		 completed: true/false
    //    }]
    //  },
    //
    //  {
    // 	  category: string
    // 	  todo: [{
    // 		 name: string,
    // 		 complete: true/false
    //    },{
    // 		 name: string,
    // 		 completed: true/false
    //    }]
    //  },
    // ]
    sideItems:[{
      category: "grocery",
      todos:[{
        name: "buy milk",
        completed: true
      },
      {
        name: "buy apple",
        completed: false
      },
      ]
    }]
  }
  
  const rootReducer = (
    state=initState,
    action
  ) => {
    let sideItems = [];
    let item = {};
    let todo = {};
    switch(action.type){
      case "ADD_ITEM":
        item = {
            category: action.item,
            todos:[]
          }
        return {
          ...state,
          sideItems: [...state.sideItems,item],
        }
      case "DELETE_ITEM":
  
        return {
          ...state,
          sideItems: state.sideItems.filter(item=>{
            return item.category != action.category
          })
        }
      case "ADD_TODO":
        item = state.sideItems.find(item=>{
          return item.category == action.category
        })
        todo = {
          name: action.todo,
          completed: false
        }
        item.todos = [...item.todos, todo]
  
        let newState = {
          ...state,
          sideItems:[
            ...state.sideItems,
            item
          ]
        }
        return {
          ...state,
          newState
        }
      case "DELETE_TODO":
        console.log(action)
        sideItems = state.sideItems.map(storeItem=>{
          let sItems = storeItem;
          if(storeItem.category == action.category){
            console.log(storeItem)
            console.log(action.todoName)
            sItems = storeItem.todos.filter(todo=>{
              return todo.name != action.todoName
            })
            console.log("sitems ",sItems);
          }
  
          return sItems
        })
        console.log("new sideItems", sideItems)
        return {
          ...state,
        }
      case "TOGGLE_TODO":
        sideItems = state.sideItems.map(storeItem=>{
          let sItems = storeItem;
          if(storeItem.category == action.item){
            sItems = storeItem.todos.map(storeTodo=>{
              if(storeTodo.name = action.todoName){
                storeTodo.completed = !storeTodo.completed
              }
              return storeTodo
            })
          }
          return sItems
        })
        return {
          ...state,
          sideItems
        }
      default:
        return state;
    }
  }
  export default rootReducer;
  