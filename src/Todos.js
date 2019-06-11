import React, { useState } from 'react'

import styled from 'styled-components'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App({
               id,
               updateFilter,
               createTodo,
               list,
               toggleComplete,
               toggleActive,
               removeTodo
             }) {

  const [ filter, setFilter ] = useState('all');

  const onUpdateFilter = e => {
    e.preventDefault();
    setFilter(e.target.value)
  }

  const addTodo = (text) => {
    createTodo(id, text)
  }

  const onRemoveTodo = (itemId) => {
    removeTodo(id, itemId)
  }

  const onToggleComplete = (itemId) => {
    toggleComplete(id, itemId)
  }

  const onToggleActive = (itemId) => {
    toggleActive(id, itemId)
  }

  const getFilteredList = () => {
    switch (filter) {
      case 'active':
        return list.filter(item => item.active);
      case 'completed':
        return list.filter(item => item.completed);
      default:
        return list;
    }
  }

  return (
    <TodosWrapper>
      <AddTodo onAddTodo={addTodo}/>
      <Filter onChange={onUpdateFilter}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </Filter>
      <TodoList
        items={getFilteredList()}
        toggleComplete={onToggleComplete}
        toggleActive={onToggleActive}
        removeTodo={onRemoveTodo}
      />
    </TodosWrapper>
  )
}

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

const Filter = styled.select`
  padding: 5px;
  width: 500px;
  color: white;
  border: transparent;
  border-radius: 4px;
  background: #3b4049;
  :hover {
    background: #5a626c;
  }
`;

export default App
