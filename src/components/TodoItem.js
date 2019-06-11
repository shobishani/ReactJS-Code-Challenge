import React from 'react'

import styled from 'styled-components'

const TodoItem = ({text, completed, active, onComplete, onActive, onRemove}) => {

  const symbol = String.fromCharCode(active ? 9873 : 9872)

  return (
    <Wrapper>
      <code onClick={onComplete}>
        [{completed ? 'x' : '  '}] <Text completed={completed}>{text}</Text>
      </code>

      <Remove onClick={onRemove}>{String.fromCharCode(9932)}</Remove>

      {!completed && <Active onClick={onActive}>{symbol}</Active>}

    </Wrapper>
  )
}

const Wrapper = styled.p`
  font-size: 24px;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

const Active = styled.span`
  float: right;
  cursor: pointer;
`

const Remove = styled(Active)`
  margin-left: 10px;
`

export default TodoItem
