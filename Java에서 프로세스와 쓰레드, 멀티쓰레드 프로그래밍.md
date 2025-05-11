# Thread

### 프로세스와 쓰레드

- 프로세스 : 실행 중인 프로그램, 자원(memory, cpu...)과 쓰레드로 구성
- 쓰레드 : 프로세스 내에서 실제 작업을 수행, 모든 프로세스는 최소한 하나의 쓰레드를 가지고 있다.

> 프로세스가 공장이라면 쓰레드는 일꾼!

하나의 새로운 프로세스를 생성하는 것보다 하나의 새로운 쓰레드를 생성하는 것이 더 적은 비용이 든다.<br/>

싱글 쓰레드 프로세스 * N개 보다 멀티쓰레드 프로세스가 더 효율적<br/>

**멀티 쓰레드 프로그램의 장단점**

- pros
  - 시스템 자원 효율적으로 사용 가능
  - 사용자에 대한 응답성 향상
- cons
  - 동기화(synchronization) 문제 주의
  - 교착상태(dead-lock) 문제가 발생하지 않도록 주의
  - 각 쓰레드가 효율적으로 고르게 실행 될 수 있게 해야함

## 쓰레드 구현과 실행

### Thread 클래스 상속

```java
class MyThread extends Thread {
  @Override
  public void run(){
    /* 작업 내용 */
    System.out.println(this.getName());
  }
}

MyThread thread = new MyThread();
thread.start();
```

### Runnable 인터페이스 구현

```java
class MyThread implements Runnable {
  @Override
  public void run(){
    /* 작업 내용 */
    System.out.println(Thread.currentThread().getName()); // Thread.currentThread() - 현재 실행중인 Thread를 반환한다.
  }
}

Runnable r = new MyThread();
Thread thread = new Thread(r);
thread.start();
```

쓰레드의 실행은 OS의 스케쥴러가 실행 순서를 결정한다. 따라서 start() 메서드를 실행하면 즉시 실행되는 것이 아닌 OS 스케쥴러 알고리즘에 따라 수행된다.

## 쓰레드의 종류

### main 쓰레드

- main메서드의 코드를 수행하는 쓰레드
- 쓰레드는 '사용자 쓰레드'와 '데몬 쓰레드'(보조) 두 종류가 있음

> 프로그램은 실행 중인 사용자 쓰레드가 하나도 없을 때 종료된다.

### 데몬 쓰레드

일반쓰레드의 작업을 돕는 보조적인 역할을 수행하며, 일반쓰레드가 모두 종료되면 자동으로 종료된다. 가비지 컬렉터, 자동저장, 화면 자동갱신 등에 사용된다.

```java
// 쓰레드가 데몬 쓰레드인지 확인한다.
boolean isDaemon();

// 쓰레드를 데몬 쓰레드로 또는 사용자 쓰레드로 변경, 매개 변수에 true값 세팅시 데몬쓰레드가 된다. - 반드시 start() 호출 전에 실행되어야 함
void setDaemon(boolean on);
```

```java
// 무한 루프와 조건문을 이용해서 실행 후 대기하다가 특정조건이 만족되면 작업을 수행하고 다시 대기하는 방식
public void run(){
  while(true){
    try{
      Thread.sleep(3 * 1000);
    } catch(InterruptedException e){
      if(isAutoSave){ // 특정 조건 만족시 수행
        autoSave();
      }
    }
  }
}
```

**Context Switching**<br/>

멀티 쓰레드 프로그램이 실행되면 OS 스케쥴러에 따라서 A쓰레드가 실행되다가 B쓰레드가 실행되는데 이렇게 A쓰레드에서 B쓰레드로 작업이 바뀌는 것을 Context Switching이라고 한다. 또한 이렇게 작업을 번갈아면서 작업하면 시간이 소요 되므로 싱글쓰레드 보다 작업이 더 오래 걸릴 수 있다. 하지만 여러가지 작업을 동시에 수행할 수 있다는 이점이 있다. (예를들면 파일을 다운로드 받으면서 채팅을 한다던지 여러 작업을 동시에 할 수 있으니깐)

## 쓰레드의 우선순위

작업의 중요도에 따라 쓰레드의 우선순위를 다르게 하여 특정 쓰레드가 더 많은 작업시간을 갖게 할 수 있다. 자바는 1~10의 갖을 수 있다.

```java
void setPriority(int newPriority);
int getPriority();
```

default 5(보통 우선순위), 1 최소 ~ 10 최대

## 쓰레드의 상태

| 상태                  | 설명                                                         |
| --------------------- | ------------------------------------------------------------ |
| NEW                   | 쓰레드가 생성되고 아직 start()가 호출되지 않은 상태          |
| RUNNABLE              | 실행 중 또는 실행 가능한 상태 (실행을 기다리며 줄 서있는 상태(실행 대기) ~ 실행 중) |
| BLOCKED               | 동기화블럭에 의해서 일시정지된 상태 (lock이 풀릴 때까지 기다리는 상태, IO Blocking) |
| WAITING, TIMED_WATING | 쓰레드의 작업이 종료되지는 않았지만 실행가능하지 않은(unrunnable) 일시정지 상태, TIMED_WAITING은 일시정지시간이 지정된 경우를 의미 (suspend, sleep) |
| TERMINATED            | 쓰레드의 작업이 종료된 상태                                  |

## 쓰레드의 실행 제어

| 메서드                                                       | 설명                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| static void sleep(long millis)<br/>static void sleep(long millis, int nanos) | 지정된 시간(ms) 동안 쓰레드를 일시정지시키며, 지정한 시간이 지나면 자동적으로 다시 실행대기상태가 된다. |
| void join()<br/>void join(long millis)<br/>void join(long millis, int nanos) | 지정된 시간동안 다른 쓰레드가 실행되도록한다. 지정된 시간이 지나거나 작업이 종료되면 join()을 호출한 쓰레드로 다시 돌아와 실행을 계속한다. |
| void interrupt()                                             | sleep()이나 join()에 의해 일시정지상태인 쓰레드를 깨워서 실행대기상태로 만든다. 해당 쓰레드에서는 Interrupted Exception이 발생함으로써 일시정지 상태를 벗어나게 된다. |
| void stop()                                                  | 쓰레드를 즉시 정지시킨다.                                    |
| void suspend()                                               | 쓰레드를 일시정지시킨다. resume()을 호출하면 다시 실행대기상태가 된다. |
| void resume()                                                | suspend()에 의해 일시정지상태에 있는 쓰레드를 실행대기상태로 만든다. |
| static void yield()                                          | 실행 중에 자신에게 주어진 실행시간을 다른 쓰레드에게 양보하고 자신은 실행대기상태가 된다. |

## 쓰레드의 동기화 (synchronization)

> 멀티 쓰레드 프로세스에서는 다른 쓰레드의 작업이 또다른 쓰레드의 작업에 영향을 미칠 수 있다. 따라서 진행 중인 작업이 다른 쓰레드에게 간섭받지 않게 하려면 '동기화'가 필요하다.

1. 자바에서 동기화하려면 간섭받지 않아야 하는 영역을 `synchronized`를 사용하여 임계 영역으로 설정한다.
2. 임계여역은 락(lock)을 얻은 단 하나의 쓰레드만 출입 가능(객체 1개에 락 1개)

## 가시성과 원자성

**가기성**

> "한 스레드가 변경한 값을 다른 스레드가 즉시 볼 수 있는가?"에 대한 문제 (가시성이 보장되지 않으면 스레드가 **옛날 값**을 계속 보고 있을 수 있음)

CPU는 변수 값을 레지스터나 CPU 캐시에 저장해서 작업한다. 스레드마다 자기만의 캐시를 가지고 있기 때문에 한 스레드가 값을 변경해도 다른 스레드가 그 변경을 모를 수 있다.

```java
class Task implements Runnable {
    volatile boolean running = true;

    public void run() {
        while (running) {
            // do something
        }
        System.out.println("Stopped!");
    }

    public void stop() {
        running = false;
    }
}
```

- volatile이 없으면, running = false로 바뀌어도 스레드는 자신의 캐시된 값만 보고 무한루프를 바로 탈출 할 수 없다.
  - **스레드의 캐시된 값(레지스터/CPU 캐시)은 언제 최신화되는가?**
    우선 JVM은 명시적인 동기화(synchronized, volatile등)가 없으면 스레드가 메인 메모리와 언제 동기화할지에 대한 보장이 없다. 대표적인 동기화 포인트는 아래와 같다.
    - volatile 읽기/쓰기
    - synchronized 진입/탈출
    - Thread.start()와 Thread.join()
    - 일부 java.util.concurrent 클래스 사용 (Lock, Atomic, etc)
- volatile을 사용하면, 항상 메인 메모리에서 값을 읽게 되어 최신 상태를 보장한다.

**원자성**

> "작업이 중간에 끊기지 않고, 하나의 단위로 완전히 실행되는가?"에 대한 문제 (원자성이 보장되지 않으면 두 스레드가 동시에 값을 수정하여 결과가 꼬일 수 있음)

x++와 같은 연산은 읽기 -> 증가 -> 쓰기의 세단계가 이루어진다. 이 때 여러 스레드가 동시에 접근하면 작업이 중첩되어 꼬일 수 있다. (두 스레드가 동시에 +1 증가 연산을 시행하면 지금 읽은 값에 +1을 하므로 처음 값에서 2가 증가하는게 아니라 1만 증가하는 현상이 일어날 것이다.)

<br/>

원자성 문제는 Lock을 사용하여 임계구역(Critical Section)을 만들어서 해결하는 방법과 CAS(Compare And Swap)연산을 이용하여 해결할 수 있다. 하지만 synchronized와 같은 Lock을 사용하면 다른 스레드가 접근하였을 때 멈춰버리는 문제가 발생하므로 성능적인 이슈가 생길 수도 있다. CAS 연산은 현재 쓰레드에 저장된 값과 메인 메모리에 저장된 값을 비교하여 일치하는 경우 새로운 값으로 변경하고 일치하지 않는다면 실패하고 재시도를 한다. 결국 CAS 연산은 메인 메모리에 저장된 값을 알아야 하므로 원장성 뿐만 아니라 가시성도 보장되게 된다.

<br/>

#### 가시성과 원자성의 관계

- 가시성만 보장된다면 최신 값은 볼 수 있지만, 다중 스레드의 접근에 따른 연산에 대해 보장하지 않으므로 연산이 꼬일 수 있다.
- 원자성만 보장한다면 연산은 안전하지만, 다른 스레드가 최신 결과값을 볼 수 없어 의미가 없다.
- 따라서 동시성 문제에서 안전하려면 둘 다 필요하다.

