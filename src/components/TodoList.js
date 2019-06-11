import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'

const TodoList = ({items, toggleComplete, toggleActive, removeTodo}) => (
  <Wrapper>
    {items && items.map(item => {
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
    {!items.length && <EmptySpan>No tod's available</EmptySpan>}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const EmptySpan = styled.span`
  color: red;
  padding: 10px;
`;

export default TodoList
