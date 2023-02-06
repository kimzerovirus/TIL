# Data Structure

## 목차

1. [Linked List](#linked-list)
2. [Doubly Linked List](#doubly-linked-list)
3. [Queue](#queue)
4. [Stack](#stack)
5. [Hash Table](#hash-table)
6. [Heap](#heap)
7. [Priority Queue](#priority-queue)

<br/>

## Linked List

 컴퓨터과학에서, 링크드 리스트는 데이터 요소의 선형 집합이며, 집합에서 논리적 저장 순서는 메모리의 물리적 저장 순서와 일치하지 않습니다.
 각각의 원소들은 자기 자신 다음의 원소를 가리킨다. 링크드 리스트는 순서를 표현하는 노드들의 집합으로 이루어져 있습니다. 간단하게 말해, 각각의 노드들은 데이터와 다음 순서의 노드를 가리키는 레퍼런스로 이루어져 있습니다. (이것을 링크라고 합니다.) 
 이 자료구조는 순회하는 동안 순서에 상관없이 효율적인 삽입이나 삭제가 가능합니다. 더 복잡한 변형은 추가적인 링크를 더해, 임의의 원소 참조로부터 효율적인 삽입과 삭제를 가능하게 합니다.
 링크드 리스트의 단점은 접근 시간이 선형이라는 것이고, 병렬처리도 하지 못합니다는 점입니다. 또한 임의 접근처럼 빠른 접근은 불가능합니다. 따라서 링크드 리스트에 비해 배열이 더 나은 캐시 지역성을 가지고 있습니다.

 ![Linked List](https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg)

<br/>

## Doubly Linked List

 컴퓨터공학에서 이중 연결 리스트는 순차적으로 링크된 노드라는 레코드 세트로 구성된 링크된 데이터 구조입니다. 
 각 노드에는 링크라고 하는 두 개의 필드가 있으며, 노드 순서에서 이전 노드와 다음 노드에 대한 참조를 가집니다. 
 시작 및 종료 노드의 이전 및 다음 링크는 각각 리스트의 순회를 용이하게 하기 위해서 일종의 종결자 (일반적으로 센티넬노드 또는 null)를 나타냅니다. 
 센티넬 노드가 하나만 있으면, 리스트가 센티넬 노드를 통해서 원형으로 연결됩니다. 
 동일한 데이터 항목으로 구성되어 있지만, 반대 순서로 두 개의 단일 연결 리스트로 개념화 할 수 있습니다.
 두 개의 노드 링크를 사용하면 어느 방향으로든 리스트를 순회할 수 있습니다. 
 이중 연결 리스트에서 노드를 추가하거나 제거하려면, 단일 연결 리스트에서 동일한 작업보다 더 많은 링크를 변경해야 하지만, 첫 번째 노드 이외의 노드인 경우 작업을 추적할 필요가 없으므로 작업이 더 단순해져 잠재적으로 더 효율적입니다. 리스트 순회 중 이전 노드 또는 링크를 수정할 수 있도록 이전 노드를 찾기 위해 리스트를 순회할 필요가 없습니다.

![Doubly Linked List](https://upload.wikimedia.org/wikipedia/commons/5/5e/Doubly-linked-list.svg)

<br/>

## Queue

 컴퓨터 과학에서 큐는 특정 종류의 추상 데이터형 또는 컬렉션입니다.
 컬렉션 중 엔티티는 순서대로 나열되어 있으며 컬렉션에 대한 기본적인 (또는 유일한) 조작 방법으로 엔큐와 디큐가 있습니다.
   - `Enqueue` : 엔큐는 컬렉션의 말미에 엔티티를 추가합니다.
   - `Dequeue` : 디큐는 컬렉션의 선두에서 엔티티를 삭제합니다.

 <br/>  

 큐는 이로써 선입선출(FIFO: First-in First-out) 데이터 구조가 됩니다. FIFO의 데이터 구조에서는 큐에 추가된 첫 번째 요소가 첫 번째로 삭제됩니다. 이것은 새로운 요소가 추가되면 그 요소를 삭제하기 위해서는 그때까지 추가된 모든 요소가 삭제되어야 하는 요건과 동일합니다. 대부분의 경우 피크와 같은 선두 요소를 검사하는 조작도 갖추고 있는데 이는 디큐하지 않고 선두 요소의 값을 반환합니다. 
 큐는 선형 데이터 구조들 보다 추상적인 시퀀셜 컬렉션의 한 예입니다.

![Queue](https://upload.wikimedia.org/wikipedia/commons/5/52/Data_Queue.svg)

<br/>

## Stack

 컴퓨터 과학에서, 스택은 추상 데이터형으로, 2개의 주요한 조작을 할 수 있는 요소의 컬렉션입니다.
   - `push` : 푸시는 컬렉션에 요소를 추가합니다.
   - `pop` : 팝은 최근 추가된 요소에서 아직 삭제되지 않은 것을 삭제합니다.
    
 <br/>

 요소가 스택으로부터 빗나가는 순서로부터, 후입선출(LIFO: Last-in First-out)라고도 불립니다.
 스택에 변경을 가하지 않고, 선두의 요소를 검사하는 피크 조작을 갖추기도 합니다.
 "스택"이라는 이름은 물리적인 물건을 위에 쌓아가는 모습과의 유사성에서 유래했습니다.
 가장 위의 것을 집는 것은 간단하지만, 스택의 아래쪽에 있는 것을 집어들 때는 먼저 위에 있는 여러 개를 제거해야 합니다.

![Stack](https://upload.wikimedia.org/wikipedia/commons/b/b4/Lifo_stack.png)

<br/>

## Hash Table

컴퓨터 과학에서 **해시 테이블** (해시맵)은 키를 값에 매핑할 수 있는 *연관배열(associative array)* 기능을 가진 데이터 구조입니다. 해시 테이블은 해시함수를 사용해 버킷이나 슬롯 배열에 대한 인덱스를 계산하고 원하는 값을 찾을 수 있습니다. (사실상 해시함수에서 배열은 bucket 또는 slot으로 부른다.)
따라서 해시테이블은 특정 키에 값을 매핑 시킨 형태의 자료구조로 키값에 매핑된 값을 검색 할 때 매우 유용하다. 이때 해시함수는 찾고자 하는 키가 버킷 또는 슬롯의 몇 번째 인덱스에 해당하는지를 확인할 때 사용힌다.

이상적으로는 해시함수는 각 키를 하나의 버킷에 할당하지만 대부분의 해시 테이블은 불완전한 해시함수를 채택하고 있기 때문에 복수의 키에 대해 같은 인덱스를 생성했을 때 해시의 충돌이 발생합니다. 이러한 충돌은 어떤 방법으로든 대처할 필요가 있습니다.

![Hash Table](https://upload.wikimedia.org/wikipedia/commons/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg)

체이닝에 따른 해시충돌(Hash Collision)의 해결법

![Hash Collision](https://upload.wikimedia.org/wikipedia/commons/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg)

<br/>

## Heap

컴퓨터 사이언스에서 힙은 특수한 트리구조의 데이터 구조로 다음과 같은 특성을 갖고 있습니다.

 - *최소 힙* 에서는 만약 `P`가 `C`의 부모노드일 경우, `P` 키(값)는 `C` 키보다 작거나 동일합니다.

![MinHeap](https://upload.wikimedia.org/wikipedia/commons/6/69/Min-heap.png)

 - *최대 힙* 에서 `P` 키는 `C` 키보다 크거나 동일합니다.

![Heap](https://upload.wikimedia.org/wikipedia/commons/3/38/Max-Heap.svg)

 - 힙의 "최상단" 노드에는 부모노드가 존재하지 않으며, 루트노드라고 부릅니다.

<br/>

## Priority Queue
 
컴퓨터 과학에서 우선순위가 있는 큐는 일반 큐나 스택의 데이터 구조와 비슷한 추상 데이터형이지만, 각 요소의 [우선순위]와 관련되어 있습니다. 우선순위가 있는 큐에서는 우선순위가 높은 요소가 우선순위가 낮은 요소보다 먼저 처리됩니다. 만약 두 요소의 우선순위가 같을 경우, 그것들은 큐 내부의 순서에 따라 처리됩니다.

우선순위가 있는 큐는 대부분의 경우 힙으로 구현되지만 개념적으로는 힙과는 다릅니다. 우선순위 큐는 리스트나 맵과 같은 추상적인 개념입니다. 리스트를 링크드 리스트나 배열로 구현할 수 있는 것과 마찬가지로 우선순위가 있는 큐는 힙이나 정렬되지 않은 배열과 같은 다양한 방법으로 구현할 수 있습니다.

<!-- <br/>

## Trie

<br/>

## Tree -->


<br/>
<br/>
<br/>


## References

본 자료는 아래 링크를 바탕으로 공부하고 번역 및 요약한 내용입니다.

- 본문 출처: [원본코드 링크](https://github.com/trekhleb/javascript-algorithms)

- 이미지 출처: 위키피디아

- 참고자료
   - [6 JavaScript data structures you must know](https://www.educative.io/blog/javascript-data-structures#array)
   - [링크2](https://ipex.tistory.com/entry/algorithms-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B0%9C%EC%9A%94-algorithms-in-JavaScript-OverView)
   - [빅오 표기법](https://aidanbae.github.io/code/algorithm/bigo/)
   - [취업을 위한 알고리즘](https://qkqhxla1.tistory.com/990)
   - [자바스크립트 데이터 구조](https://soldonii.tistory.com/category/Javascript%20%EA%B3%B5%EB%B6%80/Data%20Structure%20+%20Algorithms%28-%29?page=3)
   - [자바스크립트 알고리즘](https://soldonii.tistory.com/category/Javascript%20%EA%B3%B5%EB%B6%80/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%20%ED%92%80%EC%9D%B4?page=2)