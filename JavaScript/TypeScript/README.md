# TypeScript
 - 링크 : [typescript-kr.github.io/pages/basic-types.html](https://typescript-kr.github.io/pages/basic-types.html)    

## How to start
```
npm i -g typescript ts-node
```
- `ts-node` : 컴파일과 실행을 한번에 수행하게 해줌
- `tsc --init` : 타입스크립트 컴파일러 tsconfig.json 파일 생성
- `tsc filename` : 컴파일을 통해 js파일을 생성해준다.
- `tsconfig.json` 파일에서 outDir은 build폴더로 rootDir는 src로 설정하였다. 이렇게 설정해주면 tsc만으로도 알아서 파일들을 컴파일해준다.
- `tsc -w` : watch 모드로 실행
- 타입 추론 : 초기화가 되어 있다면 타입지정을 해주지 않아도 알아서 추론하여 타입을 지정해준다.
- 선언 함수
```
function say(s1:string, s2: string): string{
    return s1 + s2;
}
```
- 익명 함수
```
const say = function(s1:string, s2: string): string{
    return s1 + s2;
}
```
- 람다 함수
```
const say:(s1:string, s2:string) => string = (s1:string, s2:string) : string => {
    return s1 + s2;
}
```
- 함수 오버로딩
```
function say(r1: string, r2: string): string;
function say(r1: number, r2: number): number;

function say(r1: any, r2: any): any{
    console.log(r1 + r2);
}
say('123','123');
say(123,123);
```
- `void` : undefined, null값만 할당 가능하다.
- `never` : never타입은 어떠한 반환값도 없다.
- 배열 타입지정
```
const members: (string)[] = ['John','Sam'];
const members: Array<string> = ['John','Sam'];
```                                                                          
- 튜플 : 배열 + 불변성
```
const tuples: [string, number] = ['kim',30];
tuple[0] = 'kim'; //ok
// tuple[0] = 'john'; //error
```
- 열거형 : enum타입은 상수들을 관리하기 위한 객체, 상수들의 집합이다. 속성은 기본적으로 숫자와 문자열만 허용한다. (const로 생성한 열거형이 아니라면 빌드시에 object로 치환된다. 따라서 const로 만들어진 열거형은 값으로 키를 찾을 수 없다.)

- 유니온 : `|` 연산자를 사용하여 타입을 정의할 수 있다.
- 인터페이스 : 객체나 클래스를 위한 타입을 정의할 때 사용하며 인터페이스간 상속이 가능하다.
```
interface Person{
    name: string;
    age: number;
}

interface Account extends Person{
    email: string;
    pwd: string;
}

const account: Account = {
    name: 'John',
    age: 19,
    email: 'john123@naver.com',
    pwd: '1111',
}
```