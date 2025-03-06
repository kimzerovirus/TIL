## cors

nginx reverse proxy 사용중 nginx에서 cors 차단으로 인해 403을 내보내는 문제가 있었다.

다음과 같은 설정을 추가하여 해결

```
location / {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, DELETE, PATCH, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
            add_header 'Access-Control-Max-Age' 86400;
            return 204;
        }
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Content-Type' 'application/json' always;
        proxy_pass http://localhost:3000/;
    }

```

서버에서 options 메서드를 허용해 주었는데 실제 운영환경에서는 options 메서드를 열어주지 않는 기업들도 있으므로 다시 프론트 쪽 nginx에서 proxy로 해결하였다.

```
user nginx;
worker_processes auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    client_max_body_size 100M;
    log_format custom '[$time_local] $server_name |  $http_x_forwarded_for $remote_addr | $request_uri |'
                      ' $status';

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen 80;
        server_name chat_ui_front;
        access_log   /var/log/nginx/chat_ui_front_access.log custom;

        location /api/ {
            rewrite ^/api(/.*)$ $1?$args break;
            proxy_pass http://kimzerovirus.com;
        }
        
        location /images/ {
	        	proxy_pass http://kimzerovirus.com;
        }

        location / {
            root /usr/share/nginx/html;
            index index.html index.html;
        }
    }
}
```

## nginx 설정 적용

> reload 명령어를 사용했는데 설정 적용이 안되서 restart 해주니 되는 경우도 있었음,,,

nginxctl

### **설정 버전 상세 확인**

다음의 명령을 통해 상세한 버전 및 모듈에 대해서 확인 가능

/usr/local/nginx/sbin/nginx -V

 

### **설정 파일 테스트**

설정 파일의 유효성을 테스트를 통해 잘못된 부분이 없는지 확인

/usr/local/nginx/sbin/nginx/ -t

 

### **운영중일 때 교체하는 법 1**

새 파일을 생성 후 테스트 하고, 교체 후 업데이트 하도록 합니다. master 프로세스의 PID 변경없이 가능

- /usr/local/nginx/sbin/nginx -t -c /home/anybody/test.conf
- cp -i /home/anybody/test.conf /usr/local/nginx/conf/nginx.conf
- /usr/local/nginx/sbin/nginx -s reload

 

### **운영중일 때 교체하는 법 2**

새 파일을 생성 후 테스트 하고, 교체 후 kill 명령어를 수행

- /usr/local/nginx/sbin/nginx -t -c /home/anybody/test.conf
- cp -i /home/anybody/test.conf /usr/local/nginx/conf/nginx.conf
- master 프로세스의 PID를 확인한다.
- kill -USR2 {PID} 명령으로 master 프로세스에게 USR2(12)-시그널을 보낸다.
- kill -WINCH {PID} 명령으로 master 프로세스에게 WINCH(28)- 시그널을 보낸다.
- kill -QUIT {PID} 명령으로 master 프로세스에게 WINCH(28)- 시그널을 보낸다.
