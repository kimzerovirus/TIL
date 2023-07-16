# 스프링 시큐리티

> 스프링 시큐리티는 CSRF 공격(사용자의 권한을 가지고 특정 동작을 수행하도록 유도하는 공격), 세션 고정 공격 등을 방어하고, 요청 헤더도 보안 처리 해주는 등 개발자에게 많은 보안 관련 편의를 제공한다.

- 인증 : 사용자의 신원을 입증하는 과정

- 인가 : 접근할 수 있는지 사용자의 권한을 확인하는 과정

## 스프링 시큐리티 필터 체인

> 스프링 시큐리티는 필터 기반으로 동작한다.

이하는 필터체인 순서이다.

1. [ForceEagerSessionCreationFilter](https://docs.spring.io/spring-security/reference/5.7/servlet/authentication/session-management.html#session-mgmt-force-session-creation)
2. ChannelProcessingFilter
3. WebAsyncManagerIntegrationFilter
4. SecurityContextPersistenceFilter : SecurityContext(접근 주체와 인증에 대한 정보를 담은 객체)를 가져오거나 저장하는 역할을 수행
5. HeaderWriterFilter : Http 헤더를 검사한다.
6. CorsFilter : 허가된 사이트나 클라이언트의 요청인가?
7. CsrfFilter : 내가 내보낸 리소스에서 올라온 요청인가?
8. LogoutFilter (인증 관리) : 설정된 로그아웃 URL로 오는 요청을 확인해 해당 사용자를 로그아웃 처리
9. OAuth2AuthorizationRequestRedirectFilter
10. Saml2WebSsoAuthenticationRequestFilter
11. X509AuthenticationFilter
12. AbstractPreAuthenticatedProcessingFilter
13. CasAuthenticationFilter
14. OAuth2LoginAuthenticationFilter
15. Saml2WebSsoAuthenticationFilter
16. UsernamePasswordAuthenticationFilter : 아이디와 패스워드가 넘어오면 인증 요청을 위임하는 인증 관리자 역할을 한다. (인증이 성공하면 AuthenticationSuccessHandler, 실패하면 AuthenticationFailureHandler 호출)
17. OpenIDAuthenticationFilter
18. DefaultLoginPageGeneratingFilter : 사용자가 로그인 페이지를 따로 지정하지 않을 경우 기본으로 설정되는 로그인 페이지 관련 필터
19. DefaultLogoutPageGeneratingFilter : 기본으로 설정되는 로그아웃 관련
20. ConcurrentSessionFilter : 여기저기서 로그인 하는 걸 허용할 것인가?
21. [DigestAuthenticationFilter](https://docs.spring.io/spring-security/reference/5.7/servlet/authentication/passwords/digest.html#servlet-authentication-digest)
22. BearerTokenAuthenticationFilter : Authorization 헤더에 Bearer 토큰이 오면 인증 처리 해준다.
23. BasicAuthenticaiontFilter : 요청 헤더에 있는 아이디와 패스워드를 파싱해서 인증 요청을 위임함
24. RequestCacheAwareFilter :  로그인 성공 후, 관련 있는 캐시 요청이 있는지 확인하고 캐시 요청을 처리해줌 ex) 로그인하지 않은 상태로 방문했던 페이지를 기억해 두었다가 로그인 이후에 그 페이지로 이동 시켜줌
25. SecurityContextHolderAwareRequestFilter : HttpServletRequest 정보를 감싸, 필터 체인 상의 다음 필터들에게 부가 정보를 제공하기 위해 사용됨
26. JaasApiIntegrationFilter
27. RememberMeAuthenticationFilter : 아직 Authentication 인증이 안된 경우라면 RememberMe 쿠키를 검사해서 인증 처리해준다.
28. AnonymousAuthenticationFilter : 필터가 호출되는 시점까지 인증되지 않았다면 익명 사용자 전용 객체인 Anonymous Authentication을 만들어 SecurityContext에 넣는다.
29. OAuth2AuthorizationCodeGrantFilter 
30. SessionManagementFilter : 인증된 사용자와 관련된 세션 작업을 진행한다. 세션 변조 방지 전략을 설정하고, 유효하지 않은 세션에 대한 처리와 세션 생성 전략을 세우는 등의 작업을 수행.
31. [ExceptionTranslationFilter](https://docs.spring.io/spring-security/reference/5.7/servlet/architecture.html#servlet-exceptiontranslationfilter) : 요청 처리하는 중에 인증이나 권한 예외가 발생하면 잡아서 처리해준다.
32. [FilterSecurityInterceptor](https://docs.spring.io/spring-security/reference/5.7/servlet/authorization/authorize-requests.html#servlet-authorization-filtersecurityinterceptor)  (접근 결정) : 권한 부여 처리를 위임해 접근 제어 결정을 쉽게 하는 접근 결정 관리자 역할을 수행한다. 즉, 여기까지 통과해서 왔다면 인증이 있다는 거니, 접속하려는 request에 들어갈 자격이 있는지 그리고 리턴한 결과를 너에게 보내줘도 되는건지 마지막으로 점검하는 **접근 결정 관리자**이다. AccessDecisionManager로 권한 부여 처리를 위임한다. (즉, 이 과정에서는 이미 사용자가 인증되어 있으므로 유효한 사용자로, 접근 가능하지 인가 관련 설정을 진행한다.)
33. SwitchUserFilter

## 인증과정

1. 사용자가 아이디와 비밀번호를 폼에 입력
2. AuthenticationFilter가 넘어온 아이디와 비밀번호의 유효성 검사를 진행
3. 유효성 검사를 통과하면 실제 구현체인 UsernamePasswordAuthenticationToken을 만들어 넘김
4. 전달 받은 인증용 객체인 UsernamePasswordAuthenticationToken을 AuthenticationManager에게 위임
5. AuthenticationProvider로 전달
6. 사용자 아이디를 UserDetailsService에 보내어 사용자 아이디로 사용자 정보를 DB에서 찾은 후 UserDetails 리턴
7. AuthenticationProvider는 입력 정보와 UserDetails의 정보를 비교해 실제 인증 처리를 진행
8. 인증이 완료되면 SecurityContextHolder에 Authentication을 저장