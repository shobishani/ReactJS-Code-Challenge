import TodoStore from './store'

let todoStore;
beforeAll(() => {
  todoStore = new TodoStore();
  test('inserting todo into list should append the list', () => {
    expect(todoStore.createTodo(1,'hi')).toBe(undefined)
  })
})

test('inserting todo into list should append the list', () => {
  expect(Promise.resolve(todoStore.createTodo(1,'hi'))).resolves.toBe(undefined)
})

test('inserting todo with string id should throw error', () => {
  expect(Promise.resolve(todoStore.createTodo('sdf','hi'))).rejects.toThrow('Id cant be string')
})