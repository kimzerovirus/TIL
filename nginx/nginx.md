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

