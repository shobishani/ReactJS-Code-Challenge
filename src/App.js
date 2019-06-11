import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[ TodosContainer ]}>
          {todos => {
            const list = todos.getList()
            const onUpdateFilter = e => {
              e.preventDefault();
              todos.updateFilter(e.target.value)
            }

            return (
              <TodosWrapper>
                <AddTodo onAddTodo={todos.createTodo}/>
                <Filter onChange={onUpdateFilter}>
                  <option value="all">all</option>
                  <option value="active">active</option>
                  <option value="completed">completed</option>
                </Filter>
                <TodoList
                  items={list}
                  toggleComplete={todos.toggleComplete}
                  toggleActive={todos.toggleActive}
                  removeTodo={todos.removeTodo}
                />
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

const Filter = styled.select`
  padding: 8px;
  width: 538px;
  color: white;
  border: transparent;
  border-radius: 4px;
  background: #3b4049;
  :hover {
    background: #5a626c;
  }
`;

export default App
