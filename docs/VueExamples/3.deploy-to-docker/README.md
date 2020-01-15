# 3.部署到docker上

## 新建

[default.conf](default.conf)

```
server {
  listen       80;
  access_log  /var/log/nginx/host.access.log;
 
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;    
  }
 
  #error_page  404              /404.html;
 
  # redirect server error pages to the static page /50x.html
  #
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   /usr/share/nginx/html;
  }
}
```

[Dockerfile](Dockerfile)

```dockerfile
FROM nginx:1.15
COPY dist/  /usr/share/nginx/html/
ADD default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
RUN chmod -R a+rx *
```

[docker-compose.yml](docker-compose.yml)

```yml
version: "2"
services:
  vue:
    build:
      context: .
      dockerfile: Dockerfile
    # 镜像名称
    image: vue:1.0.0 
    ports:
      - 5000:80
    restart: always
    # 容器名称
    container_name: "vue"
```

## 构建命令

```docker-compose up --force-recreate --build -d```

