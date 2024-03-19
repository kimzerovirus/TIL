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

