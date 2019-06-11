import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'

const TodoList = ({items, toggleComplete, toggleActive, removeTodo}) => (
  <Wrapper>
    {items.map(item => {
      const onComplete = e => {
        toggleComplete(item.id)
      }

      const onActive = e => {
        e.preventDefault();
        toggleActive(item.id)
      }

      const onRemove = e => {
        e.preventDefault();
        removeTodo(item.id)
      }

      return <TodoItem
        key={item.id} {...item}
        onComplete={onComplete}
        onActive={onActive}
        onRemove={onRemove}
      />
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
