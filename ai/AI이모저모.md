## LLM



#### 문제점

- 답변이 없을 때 허위 정보를 제공하는 경우가 있다. >>> Hallucination

## RAG (Retrieval-Augmented Generation), 검색 증강 생성

> 생성형 AI가 할루시네이션 할 때 보정 해주는 역할인듯

#### 장점

LLM에 새 데이터를 도입하기 위한 비용 효율적인 접근, 최신정보도 빠르게 공급 가능, 개발자 제어가 가능해져 사용 신뢰성 증가

#### 동작원리?

RAG가 없는 LLM의 경우 사용자 입력을 기반으로 훈련한 정보 등을 기반으로 응답 생성, RAG에는 사용자 입력을 활용하여 먼저 관련 데이터를 찾아보고 이걸 LLM에 같이 제공하여 더 나은 응답을 생성하는 방식인듯



## PEFT (Parameter Efficient Fine-tuning)

거대 딥러닝 모델의 모든 파라미터를 미세조정하는 기존 방식의 비효율성을 해결하기 위해 등장한 기법으로, 모델의 일부 파라미터만 학습하거나 소량의 추가 파라미터만 조정함으로써 성능은 유지하거나 향상시키면서도 학습에 필요한 계산량과 비용을 크게 줄인다. 이를 통해 추론 속도가 빨라지고, 모바일이나 엣지 디바이스처럼 리소스가 제한된 환경에서도 효과적인 활용이 가능하다.

LoRa 등의 기법이 있음

###### 참고

https://www.sktenterprise.com/bizInsight/blogDetail/dev/4222

https://aws.amazon.com/ko/what-is/retrieval-augmented-generation/