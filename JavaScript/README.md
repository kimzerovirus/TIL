# JavaScript

## 1. [Array](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)
```
const arr1 = ['a','b','c'];
const arr2 = ['d','e','f'];
const num = [1,2,3,4,5];
```

### 1.1 conat
 - 기존의 배열에 또 다른 배열이나 값을 합쳐서 새로운 배열을 만드는 함수이다.

```
const newArr = arr1.concat(arr2);
// newArr = ['a','b','c','d','e','f'];
```

### 1.2 join
 - 배열의 요소들 사이에 파라미터 값을 붙여서 한줄의 string으로 연결해준다.
```
arr1.join();
// abc
arr2.join('-'); 
// d-e-f
```

### 1.3 push와 unshift
 - 기존배열에 새로운 요소를 추가해준다.
 - push: 요소의 마지막
 - unshift: 요소의 첫번째

```
arr1.push('d');
// ['a','b','c','d']
arr1.unshift('x','y');
// ['x','y','a','b','c']
```

### 1.4 pop과 shift
 - 배열에서 요소를 제거하고 추출한다.
 - pop: 요소의 마지막
 - shift: 요소의 첫번째
```
arr1.pop();
// 'c'
arr1.shift();
// 'a'
```

### 1.5 splice
 - 원하는 위치의 요소를 추가하거나 삭제할 수 있다.
 - 기존배열은 범위만큼 삭제하고 삭제한 요소로 이루어진 배열을 반환한다.
 - 1.3, 1.4의 함수들과 달리 배열의 중간의 요소 삭제 및 추출이 가능하다.
```
1.인수가 한개인 경우
num.splice(3)
// 인덱스3(4번째 요소) 이후 끝까지 삭제한다... [4,5]
2.인수가 두개인 경우
arr1.splice(-1,1)
// 뒤에서부터 1개 반환... ['c']
3.인수가 세개인 경우
arr1.splice(-1,1,'ab')
// 뒤에서부터 1개 반환하고 삭제한자리에 삽입... ['c'], 기존배열은 ['a','b','ab']로 변경된다.
```

### 1.6 slice
 - 원하는 요소를 여러개 꺼낼 수 있다.
 - splice와 달리 원본 배열은 변경되지 않는다.
 - 인자로 (시작 인덱스, 끝 인덱스)를 받으며, 인덱스~인덱스 까지의 요소 배열을 반환한다.
```
arr1.slice(1)
// ['b','c']
```

### 1.7 indexOf
 - 배열에서 지정된 요소를 찾아 첫번째 인덱스를 반환하고 없다면 -1을 반환한다.
```
arr1.indexOf('b')
// 1
```

### 1.8 filter
 - 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열을 반환한다.
```
num.filter(n = n  2);
// [3,4,5]
```

### 1.9 sort
 - 배열의 요소를 정렬한 후 정렬한 배열을 반환한다.
 - 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따른다.
```
num.sort((a, b) = b - a); //내림차순
// [5,4,3,2,1]
```


### 1.10 reverse
 - 배열의 순서를 반전한다.
```
arr1.reverse()
// ['c','b','a']
```


### 1.11 toString
 - 각 원소에 쉼표가 붙은 하나의 문자열로 반환한다. join()과 비슷하다.
```
arr1.toString()
// "a,b,c"
```

### 1.12 every와 some
 - 주어진 판별 함수를 통과하는지 테스트한다.
 - every: 모든 case가 true일때 true를 반환한다. 하나라도 false라면 false를 반환한다. (and조건)
 - some: 하나라도 true case가 있다면 true를 반환한다. (or조건)
 - 원본 배열값의 변경은 없다.
```
Array.prototype.every((element, index, array) = { ... } )
Array.prototype.some((element, index, array) = { ... } )
num.every(item = item  0)
// 1,2,3,4,5이므로 true
``` 

### 1.13 fill
 - 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채운다.
```
num.fill(7,1,4)
// [1,7,7,4,5]
```

### 1.14 find
 - 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환한다.
```
num.find(element = element  4);
// 5

```

### 1.15 includes
 - 배열에 해당 값이 존재하는지 판별 후  true, false 반환
```
arr.includes(valueToFind[, fromIndex]) // 찾을값, 위치 시작인덱스
```

### 1.16 reduce
 - 배열 요소를 순환하면서, 정의된 callback함수에 의해 단일값으로 누적시킨다.
 - 누적된값, 현재 요소 값, 현재 인덱스, 원본 배열 callback함수, 0 <<< 초기값 //누적된값과 현재요소값은 필수이다.
```
num.reduce((acc, el) = {
    return acc + el
},0)
//15

- 중첩된 배열 단일하게 만들기
const arr = [1, [2, 3], [4, 5, 6]]
arr.reduce((acc, el) = {
    return acc.concat(el)
})
//[1, 2, 3, 4, 5, 6]
```

### 1.17 from
 - Array.from() 메서드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운Array 객체를 만든다.
 - 파일 객체를 읽어들였을 때 유사배열이므로 forEach나 map과 같은 배열 메서드를 사용할 수가 없으므로, 이럴 경우에 사용하면 좋다.

<br/>

## 2. Object
```
const obj = {
    name: "harry",
    age: 20
}

const obj2 = {
    name: "ahn",
    age:20
}

const obj3 = {
    subject: "JavaScript"
}
```

### 2.1

### 2.2 Object.keys
 - 객체에서 key를 추출하여 배열로 반환한다.
```
Object.keys(obj);
//["name", "age"]
```

### 2.3 Object.values
 - 객체에서 value를 추출하여 배열로 반환한다.
```
Object.values(obj);
//["harry", 20]
```

### 2.4 Object.entries
 - 객체를 배열로 반환한다.
```
Object.entries(obj);
//[["name", "harry"], ["age", 20]]
```

### 2.5 Object.freeze
 - 객체를 동결시켜 다른 속성을 추가하거나 제거할 수 없다.
```
Object.freeze(obj);
```

### 2.6 Object.seal
 - 객체를 밀봉하여 다른 속성을 추가하거나 제거할 수 없다.
 - `use strict`가 선언된 상태에서 작동하면 에러가 발생하지만, 선언되지 않은 상태에서는 마찬가지로 추가/제거가 되지는 않지만 에러는 발생하지 않는다.
```
Object.seal(obj);
```

### 2.7 Object.assign
 - 객체를 병합시켜준다.
 - 속성이름이 같다면 마지막 value로 덮어써진다.
```
Object.assign(obj, obj2, obj3);
//{ name: 'ahn', age: 20, subject: 'JavaScript' }
```


<br/>
 
## 3. Loop

### 3.1 forEach
 - 배열의 각 요소에 대해 callback함수를 한번씩 실행한다.
 - 배열을 순환하는 중간에 종료시키려면 예외를 던져야한다. 따라서 중간에 멈춰야 한다면 적절한 방법이 아닐수도 있다.
```
array1.forEach((element, index) = console.log(element));
```

### 3.2 map
 - forEach와 비슷하지만 새로운 배열을 생성시킨다는 차이점이 있다.

### 3.3 for...in
 - 

### 3.4 for...of
 - 

<br/>

## 4. Math

### 4.1 Math.random
 - 무작위의 실수형 값을 반환한다.
 - 0 이상 1 미만의 부동소숫점
```
Math.random() * 10
// 0 ~ 1
```

### 4.2 Math.round
 - 특정 자리수에서 반올림한다.
```
- 소수점 한 자릿수에서 반올림
Math.round(123.456 * 10 / 10) //123
Math.round(123.654 * 10 / 10) //124
```

### 4.3 Math.ceil
 - 특정 자리수에서 올림한다.

### 4.4 Math.floor
 - 특정 자리수에서 내림한다.

### 4.5 Math.min, Math.max
 - 최솟값과 최댓값을 반환해주는 내장함수이다.
 - 언듯 배열을 바로 받는것 같지만 원소하나씩을 받으므로 전개연산자를 사용해야한다.
```
Math.min(...arr);
Math.max(...arr);
```
