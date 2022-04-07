const start = new Date();

// setTimeout(() => {
//     const end = new Date();
//     console.log(start,end, Math.abs(start-end))
// }, 3000);
const array = [];
for(let i =0; i<10000; i++){
    array.push(Math.floor(Math.random() * 100));
    i++;
}

const newArray = [];

new Promise((resolve)=>{
    for(let a = 0; a<array.length; a++){
        let min_index = a;
        for(let b = a+1; b<array.length; b++){
            if(array[min_index]>array[b]){
                min_index = b
            }
        }
        console.log(array[a])
        array[a] = array[min_index]
        array[min_index] = array[a]
        // console.log(array[a], array[min_index], a)
    }
    const end = new Date();
    resolve(console.log(Math.abs(start-end), start, end))
})

