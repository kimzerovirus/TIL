# 코틀린 인 액션

### with

> 범위를 한정해주는 함수로 객체명의 중복 사용을 제거해준다.

```kotlin
inline fun <T, R> with(receiver: T, block: T.() -> R): R {
    return receiver.block()
}
```

```kotlin
class Person {
    var name: String? = null
    var age: Int? = null
}

val person: Person = getPerson()
with(person) { // person으로 범위를 한정
    print(name) // person.name -> name
    print(age) // person.age -> age
}
```



### also

> with와 비슷하게 범위를 지정해주는 함수이지만 with는 람다의 실행 결과를 반환하는 반면 also는 수신 객체를 그대로 다시 반환한다.

```kotlin
inline fun <T> T.also(block: (T) -> Unit): T {
    block(this)
    return this
}
```

```kotlin
val person: Person = getPerson().also(person) {
    print(it.name) 
    print(it.age)
}
```





### let

> 지정된 값이 null 이 아닌 경우에 코드를 실행해야 하는 겨우 (Java의 isPresent와 같음)<br/>
>
> Nullable 객체를 다른 Nullable 객체로 변환하는 경우
>
> 단일 지역 변수의 범위를 제한 할 경우

```kotlin
inline fun <T, R> T.let(block: (T) -> R): R {
    return block(this)
}
```



### apply

> 프로퍼티 값 설정할 때 편함

```kotlin
inline fun <T> T.apply(block: T.() -> Unit): T {
    block()
    return this
}
```

```kotlin
val john = Persion.apply {
  	this.name = "John",
  	age = 20
}
```



### run

```kotlin
inline fun <T, R> T.run(block: T.() -> R): R {
    return block()
}
```

