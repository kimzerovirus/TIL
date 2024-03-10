global exception handler는 controller에서 발생하는 exception 들을 처리해준다.

따라서 authentication provider와 같이 spring security 에서 발생하는 것들은 스프링 시큐리티 filter 단에서 exception 이 발생하는 것이므로 처리가 불가능하다. 이러한 경우에는 AuthenticationEntryPoint 을 구현해주면 된다.