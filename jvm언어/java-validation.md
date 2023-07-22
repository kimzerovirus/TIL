# 자바에서 변수 체크하는 여러가지 방법들

### if문으로 직접 작성

```java
public static void fooPlainJavaValidation(String name, int start, int end) {
    if (null == name) {
        throw new NullPointerException("Name must not be null");
    }

    if (start >= end) {
        throw new IllegalArgumentException("Start (" + start + ") must be smaller than end (" + end + ")");
    }
}
```

### Assert

```java
public static void fooSpringFrameworkAssert(String name, int start, int end) {
    Assert.notNull(name, "Name must not be null");
    Assert.isTrue(start < end, "Start (" + start + ") must be smaller than end (" + end + ")");
}
```

### Validate

```java
public static void fooApacheCommonsValidate(String name, int start, int end) {
        Validate.notNull(name, "Name must not be null");
        Validate.isTrue(start < end, "Start (%s) must be smaller than end (%s)", start, end);
}
```
### Guava Precondition

```java
public static void fooGuavaPreconditions(String name, int start, int end) {
        Preconditions.checkNotNull(name, "Name must not be null");
        Preconditions.checkArgument(start < end, "Start (%s) must be smaller than end (%s)", start, end);
}
```

### assert

```java
public static void fooPlainJavaAsserts(String name, int start, int end) {
        assert (null != name) : "Name must not be null";
        assert (start < end) : "Start(" + start + ") must be smaller than end(" + end + ")";
}
```

개인적으로 구글 구아바 라이브러리가 가장 깔끔한듯

출처: https://www.sw-engineering-candies.com/blog-1/comparison-of-ways-to-check-preconditions-in-java