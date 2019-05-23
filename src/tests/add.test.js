const add = (a, b) => a + b
const generateGreeting = name => `Hello, ${name}!`

test('should add two numbers', () => {
  const result = add(2, 2)
  expect(result).toBe(4)
})

test('should return greeting with name', () => {
  const result = generateGreeting('Nicole')
  expect(result).toBe('Hello, Nicole!')
})
