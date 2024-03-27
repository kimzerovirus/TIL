# DFS: 깊이 우선 탐색

> 1. 재귀이용<br/>
> 2. 스택 이용

```java
void dfs(){
  if(탈출조건) return;
  
  if(로직){
    
  }
  
  dfs();
}
```

기본적으로 탈출조건과 다음회차로 넘어가는 조건을 구성해주고 반복 횟수를 줄이기 위해 주어진 범위를 제한하거나 방문배열 등을 사용하면 된다. <br/>

주어진 케이스가 10만 보다 작을 경우 주로 1000 등으로 제한 조건이 주어지면 완전탐색을 해도 되므로, dfs로 전체 순회하여 탐색해도 되는 기본 유형의 문제다.

## 2차원 배열의 맵에서 탐색하는 유형

- 4방 (북 -> 동 -> 남 -> 서)
```java
static final int[] dy = new int[]{-1, 0, 1, 0};
static final int[] dx = new int[]{0, 1, 0, -1};
```

- 8방 좌상부터 시계방향 (북서 -> 북 -> 북동 -> 동 -> 동남 -> 남 -> 남서 -> 서)
```java
static final int[] dy = { -1, -1, -1, 0, 1, 1, 1, 0 }; 
static final int[] dx = { -1, 0, 1, 1, 1, 0, -1, -1 };
```

방향 벡터를 정해준다.

```java
void go(int y, int x) {
        if (탈출조건) { 
            return;
        }

        for (int i = 0; i < 4; i++) {
            int ny = y + dy[i];
            int nx = x + dx[i];

          	// 맵 범위 제한
            if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;

            if (방문배열 등 넘어갈 회차 조건) { 
                continue;
            }
          
            go(ny, nx);
        }
    }
```

## 방문 배열

> 방문 배열은 다양하게 이용할 수 있다. <br/>
>
> int 또는 boolean 배열로 선언 int -> 0 일 경우 방문하지 않은 것 <br/>
>
> 특정 지점까지의 최소 비용 등을 구해야 하는 문제라면 해당 지점에 방문할 때 해당 지점까지 최소 비용을 담아 활용할 수도 있다. (경주로 건설 참고)

## dfs 문제 예시

- [경주로 건설](https://github.com/kimzerovirus/AlgorithmStudy/blob/main/java/src/me/kzv/programers/%EA%B2%BD%EC%A3%BC%EB%A1%9C%EA%B1%B4%EC%84%A4.java)

- [지뢰찾기](https://github.com/kimzerovirus/AlgorithmStudy/blob/main/java/src/me/kzv/programers/%EC%9A%B0%EC%BA%A03%EC%A7%80%EB%A2%B0%EC%B0%BE%EA%B8%B0.java)

- [불량 사용자](https://github.com/kimzerovirus/AlgorithmStudy/blob/main/java/src/me/kzv/programers/%EB%B6%88%EB%9F%89%EC%82%AC%EC%9A%A9%EC%9E%90.java)

- [퇴사](https://github.com/kimzerovirus/AlgorithmStudy/blob/main/java/src/me/kzv/baekjoon/B14501%ED%87%B4%EC%82%AC.java)

- [연구소](https://github.com/kimzerovirus/AlgorithmStudy/blob/main/java/src/me/kzv/baekjoon/B14502%EC%97%B0%EA%B5%AC%EC%86%8C.java)