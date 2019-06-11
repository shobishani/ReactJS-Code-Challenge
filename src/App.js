import React from 'react'
import { Provider, Subscribe } from 'unstated'
import { Accordion, Icon } from 'semantic-ui-react'

import styled from 'styled-components'

import TodosContainer from './store'

import Todos from "./Todos";
import AddList from "./components/AddList";

function App() {
  return (
    <Provider>
      <Wrapper>
        <Accordion>
          <Subscribe to={[ TodosContainer ]}>
            {store => {
              const lists = store.getList()
              const activeIndex = store.getActiveIndex();
              const handleClick = (e, titleProps) => {
                store.onUpdateAccordianActive(e, titleProps);
              }
              return (
                <React.Fragment>
                  <AddList onAddToList={store.onAddToList}/>
                  {lists.map(list => {
                    return (
                      <AccWrapper key={list.id}>
                        <Accordion.Title
                          active={activeIndex === list.id}
                          index={list.id}
                          onClick={handleClick}>
                          <IconWrapper name='dropdown'/>
                          <AccordianTitle>{list.name}</AccordianTitle>
                        </Accordion.Title>
                        <Accordion.Content
                          active={activeIndex === list.id}>
                          <Todos
                            key={list.id}
                            id={list.id}
                            createTodo={store.createTodo}
                            list={list.todos}
                            toggleComplete={store.toggleComplete}
                            toggleActive={store.toggleActive}
                            removeTodo={store.removeTodo}
                          />
                        </Accordion.Content>
                      </AccWrapper>
                    )
                  })}
                </React.Fragment>
              )


            }}
          </Subscribe>
        </Accordion>
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

const AccordianTitle = styled.span`
  color: white;
`;

const IconWrapper = styled(Icon)`
  color: white;
`;

const AccWrapper = styled.div`
  min-width: 500px;
`;


export default App
