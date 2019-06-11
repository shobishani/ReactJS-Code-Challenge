import { Container } from 'unstated'

const defaultState = {
  list: [
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
      text: 'Add one todo'
    },
    {
      id: 3,
      completed: false,
      active: false,
      text: 'Add filters'
    },
    {
      id: 4,
      completed: false,
      active: false,
      text: 'Add multiple lists'
    },
    {
      id: 5,
      completed: false,
      active: false,
      text: 'Optional: add tests'
    }
  ],
  filter: 'all'
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

  syncStorage() {
    if ( window && window.localStorage ) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList() {
    const {filter, list} = this.state;
    if ( !filter ) return list

    switch (filter) {
      case 'completed':
        return list.filter(item => item.completed)
      case 'active':
        return list.filter(item => item.active)
      default:
        return list;
    }
  }

  toggleComplete = async id => {
    const item = this.state.list.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map(item => {
        if ( item.id !== id ) return item
        return {
          ...item,
          completed,
          active: false
        }
      })
      return {list}
    })

    this.syncStorage()
  }

  toggleActive = async id => {
    const item = this.state.list.find(i => i.id === id)
    const active = !item.active

    await this.setState(state => {
      const list = state.list.map(item => {
        if ( item.id !== id ) return item
        return {
          ...item,
          active
        }
      })
      return {list}
    })

    this.syncStorage()
  }

  updateFilter = async filter => {
    await this.setState(state => {
      return {...state, filter}
    })

  }

  createTodo = async text => {
    await this.setState(state => {
      const item = {
        active: false,
        completed: false,
        text,
        id: state.list.length + 1
      }

      const list = state.list.concat(item)
      return {list}
    })

    this.syncStorage()
  }

  removeTodo = async id => {
    await this.setState(state => {

      const list = state.list.filter(item => item.id !== id);
      return {list}
    })

    this.syncStorage()
  }
}

export default TodosContainer