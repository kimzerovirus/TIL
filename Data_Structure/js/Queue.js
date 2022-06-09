export default class Queue{
    constructor(){
        this.items = [];
    }

    enqueue(item){
        this.items.push(item);
    }

    dequeue(){
        return this.items.shift();
    }

    peek(){
        return this.items[0];
    }

    getSize(){
        return this.items.length
    }

    isEmpty(){
        return this.getSize() === 0;
    }
}