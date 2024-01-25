# JPA Soft Delete

@Where (hibernate6부터 deprecated, @SQLRestriction로 대체) <- 실무에서 요거로 인해 발생했던 문제 + baseEntity에 isDeleted 가 박혀 있어서 불편했던 점 <- 개별 엔티티마다 status를 만들어주는게 오히려 더 좋았을 것이다. 예를들면 user의 경우 UserStatus가 재직, 퇴직 이런식의 구분값이 나았을것이다.

@SQLDelete

where조건을 걸어두면 무조건 해당 조건이 실행되므로 만약 그 조건을 피하려면 nativequery를 사용해야만 하는듯하다.

