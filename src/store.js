import { Container } from 'unstated'

const defaultState = {
  lists: [
    {
      id: 1,
      name: 'List one',
      todos: [
        {
          id: 1,
          completed: false,
          active: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          active: false,
          text: 'Read README'
        }
      ]
    },
    {
      id: 2,
      name: 'List two',
      todos: [
        {
          id: 1,
          completed: false,
          active: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          active: false,
          text: 'Read README'
        }
      ]
    },
  ]
}

class TodosContainer extends Container {
  constructor(props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage() {
    if ( window && window.localStorage ) {
      const state = window.localStorage.getItem('appState')

      if ( state ) {
        return {...JSON.parse(state), filter: 'all'}
      }
    }

    return defaultState
  }

  onUpdateAccordianActive = async (e, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index

    await this.setState({activeIndex: newIndex})
  }

  syncStorage() {
    if ( window && window.localStorage ) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList() {
    return this.state.lists;
  }

  getActiveIndex() {
    return this.state.activeIndex;
  }

  onAddToList = async text => {
    await this.setState(state => {
      const {lists} = this.state
      const item = {
        id: (lists && lists.length) ? lists.length + 1 : 1,
        name: text,
        todos: []
      }
      lists.push(item)
      return {...this.state, lists}
    })
  }
  toggleComplete = async (listId, id) => {

    const {lists} = this.state;
    const list = this.state.lists.find(i => i.id === listId)
    const listItem = list.todos.find(i => i.id === id)
    listItem.completed = !listItem.completed;
    listItem.active = false


    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const updatedLists = lists.map(item => {
        if ( item.id !== listId ) return item;
        const updatedTodo = item.todos.map(todo => {
          if ( todo.id !== id ) return todo;

          return listItem;
        })
        return {...item, todos: updatedTodo}
      })
      return {...state, lists: updatedLists}
    })

    this.syncStorage()
  }

  toggleActive = async (listId, id) => {
    const {lists} = this.state;
    const list = this.state.lists.find(i => i.id === listId)
    const listItem = list.todos.find(i => i.id === id)
    listItem.active = !listItem.active

    await this.setState(state => {
      const updatedLists = lists.map(item => {
        if ( item.id !== listId ) return item;
        const updatedTodo = item.todos.map(todo => {
          if ( todo.id !== id ) return todo;

          return listItem;
        })
        return {...item, todos: updatedTodo}
      })
      return {...state, lists: updatedLists}
    })

    this.syncStorage()
  }

  createTodo = async (id, text) => {
    const {lists} = this.state

    await this.setState(state => {
      const list = lists.find(item => item.id === id)

      const todoItem = {
        active: false,
        completed: false,
        text,
        id: list.todos.length + 1
      }
      list.todos.push(todoItem);
      const updatedLists = lists.map(item => {
        if ( item.id !== id ) return item;

        return list;
      })

      return {...state, lists: updatedLists}
    })

    this.syncStorage()
  }

  removeTodo = async (listId, id) => {

    await this.setState(state => {
      const {lists} = this.state
      const list = state.lists.find(item => item.id === listId);
      const updatedLists = lists.map(item => {
        if ( item.id !== listId ) return item;

        return {...item, todos: list.todos.filter(item => item.id !== id)}
      })

      return {...state, lists: updatedLists}
    })

    this.syncStorage()
  }
}

export default TodosContainer