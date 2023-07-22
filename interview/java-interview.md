# 자바 인터뷰

1. 기초  JDK와 JRE의 차이점은 무엇입니까? 

<details>
  <summary>정답 보기</summary>
    <p>JRE(Java Runtime Environment)는 자바 실행 환경으로 JVM 뿐만 아니라 Java binaries, Java 클래스 라이브러리 등을 포함하고 있어 자바 프로그램의 실행을 지원한다. 하지만 JRE는 컴파일러나 디버거 등의 도구는 포함하지 않습니다. 따라서 자바 프로그램을 개발하는 것이 아닌 실행만 가능합니다. 반면 JDK(Java Development Kit)는 말 그대로 자바 개발 키트로 자바 애플리케이션 개발을 위한 환경을 제공합니다.</p>
</details>

2. ==와 equals의 차이점은 무엇입니까?  

  <details>
    <summary>정답 보기</summary>
      <p>
  			"=="은 두개의 대상의 주소값을 비교하지만 equals는 두 대상의 문자열 값만을 비교한다.
      </p>
  </details>

3. 두 객체가 동일한 hashCode를 가지면 Equals()가 참이어야 합니다, 그렇죠?  
4. 자바에서 final의 기능은 무엇입니까?  
5. 자바에서 Math.round(-1.5)는 무엇을 의미합니까?  
6. String은 기본 데이터 타입입니까?  
7. 자바에서 문자열을 조작하는 클래스는 무엇이 있고 각 클래스의 차이점은 뭘까요?  
8. String str =“i”와 String str = new String(“i”)가 동일합니까?  

  <details>
    <summary>정답 보기</summary>
      <p>
  			아니오. new String 사용시 새로운 주소에 객체를 담는다.
      </p>
  </details>

7. 문자열을 반전시키는 가장 좋은 방법은 무엇인가요?  
8. String 클래스의 일반적인 메서드는 무엇이 있나요?  
9. 추상 클래스에서 추상 메서드는 필수적인가요?  
10. 보통의 클래스와 추상 클래스의 차이는 무엇인가요? 
11. final은 추상 클래스를 수정할 때 사용할 수 있나요? 
12. Primitive Type(원시 타입)과 Wrapper Class(래퍼 클래스)의 차이점은 무엇인가요? 
13. Container  자바 컨테이너란 무엇인가요?  
14. Collection과 Collections의 차이는 무엇인가요? 

  <details>
    <summary>정답 보기</summary>
      <p>
        Collection Framework 는 다수의 데이터를 쉽고 효과적으로 처리할 수 있도록 자료구조와 알고리즘을 제공한다.
      	Collection은 인터페이스로 이 인터페이스를 Set, List, Queue 인터페이스가 구현하고 있습니다.
        단, Map은 컬렉션 처럼 키와 값들을 검색하는 메서드들을 갖지만 “엘리먼트들의 그룹”이라는 컬렉션 인터페이스의 본 개념과 맞지 않아 별도로 정의
        Collections는 Collection을 다루기 위한 클래스이다.
      </p>
  </details>


14. List, Set, Map의 차이점을 말해주세요.  
15. HashMap과 Hashtable의 차이는 무엇인가요?  
16. 각각 어떤 상황에서 HashMap과 TreeMap을 선택하나요?  
17. HashMap 구현 원칙은 무엇인가요?  
18. HashSet 구현 원칙은 무엇인가요?  
19. ArrayList와 LinkedList의 차이점은 무엇인가요?  
20. Array에서 List로 전환하려면 어떻게 해야하나요?  
21. ArrayList와 Vector의 차이점을 말해주세요.  
22. Array와 ArrayList의 차이점을 말해주세요.  
23. Queue에서, poll()과 remove()의 차이는 무엇인가요?  
24. thread-safe한 컬렉션 클래스들은 무엇이 있을까요?  
25. iterator란 무엇인가요?  
26. iterator의 사용 목적은 무엇인가요? 
27. iterator와 listIterator의 차이는 무엇인가요?  
28. multi-threading  병렬과 동시성의 차이점을 말해주세요.  
29. 스레드와 프로세스의 차이를 말해주세요.
30. 데몬 스레드는 무엇인가요?  
31. 스레드를 만드는 방법을 나열해주세요.  
32. runnable과 callable의 차이는 무엇인가요?  
33. 스레드의 여러가지 상태에 대해 말해주세요.  
34. sleep()과 wait()의 차이는 무엇인가요?  
35. notify()와 notifyAll()의 차이는 무엇인가요?  
36. thread run()과 tnread start()의 차이는 무엇인가요?  
37. 스레드 풀을 생성할 수 있는 여러가지 방법을 말해주세요.  
38. 스레드 풀의 상태에 대해 말해주세요.  
39. 스레드 풀에서 submit()과 execute()의 차이는 무엇인가요?  
40. 자바 프로그램에서 멀티 스레드 작업의 안전성을 어떻게 보장할 수 있을까요? 
41. reflection 이란 무엇인가요?  
42. 자바 직렬화란 무엇인가요? 어떤 상황에서 필요한가요?  
43. 동적 프록시란 무엇인가요?  
44. 동적 프록시는 어떻게 사용하나요?  
45. object copy  복사가 사용되는 이유는 무엇인가요?  
46. 객체 복사는 어떻게 할 수 있나요?  
47. 깊은 복사와 얕은 복사의 차이를 말해주세요.

