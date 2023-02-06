import Queue from './Queue'

const fruits = new Queue();

fruits.enqueue('apple')
fruits.enqueue('banana')
fruits.enqueue('orange')

console.log(fruits.dequeue())
console.log(fruits.peek())