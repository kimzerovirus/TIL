# Java

## String클래스

| 메소드                                                       | 설명                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| char charAt(int index)                                       | 문자열에서 해당 인덱스의 문자 리턴                           |
| int codePointAt(int index)                                   | 문자열에서 해당 인덱스의 유니코드 값리턴                     |
| int compareTo(String anotherString)                          | 두 스트링을 사전 순으로 비교                                 |
| String concat(String str)                                    | 현재 문자열 뒤에 str 문자열을 덧붙인 새로운 문자열 리턴      |
| int length()                                                 | 문자열 길이 리턴                                             |
| String replace(Charsequence target, Charsequence replacement) | target이 지정하는 일련의 문자들을 replacement가 지정하는 문자들로 변경한 문자열을 리턴 |
| String replaceAll(String regex, String replacement)          | 정규표현식을 지정한 문자로 바꿔줌                            |
| String[] split(String regex)                                 | 정규식과 일치하는 부분에서 문자열을 분할하여 배열로 리턴     |
| String subString(int beginIndex [, int endIndex])            | 시작 인덱스부터 (~ 끝 인덱스)까지 문자열 리턴                |
| String toLowerCase()                                         | 소문자                                                       |
| String toUpperCase()                                         | 대문자                                                       |
| String trim()                                                | 공백 제거                                                    |
| boolean startsWith(String prefix)                            | 문자열이 prefix 문자열로 시작하는지 판별                     |
| boolean endsWith(String suffix)                              | 문자열이 suffix 문자열로 끝나는지 판별                       |
| boolean equals(String str)                                   | 문자열이 str과 같은지 판별                                   |
| int indexOf(String s)                                        | 문자열에서 지정한 문자가 몇번째에 있는지 인덱스 반환         |
| boolean contains(String str)                                 | 문자열이 str을 포함하고 있는지 판별                          |
| boolean matches(String regex)                                | 문자열이 정규표현식과 일치하는지 판별                        |

