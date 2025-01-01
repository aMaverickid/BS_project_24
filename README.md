# ZJU 24fall BS_project
## 1. 启动方式

### 1.1 本机启动

基本环境配置如下：

- `Windows` 11
- `MySQL` 
- `JDK >= 21`
- `node >= 16`


启动方式如下：

#### 1.1.1 前端

在`project\front-end\goshops`工作目录下，分别运行如下命令：

```bash
$ npm install
$ npm start
```

执行成功后，在本地的3000端口`http://localhost:3000`，可以看到前端页面。

#### 1.1.2 后端

在`project\back-end\goshops\src\main\java\com\example\goshops\resources\application.properties`中，修改如下元素进行数据库连接配置：

- `spring.datasource.url`修改为主机MySQL对应的URL。
- `spring.datasource.username`修改为MySQL的用户名。
- `spring.datasource.password`修改为MySQL对应用户的密码。

在`project\back-end\goshops`工作目录下，分别运行如下命令：

```bash
$ mvn clean package
$ java -jar target/goshops-0.0.1-SNAPSHOT.jar
```

即可完成后端启动。

### 1.2 docker容器启动

基本配置环境如下：

- `docker`
- `docker-compose`

在`project_docker工作`目录下，运行如下命令：

```bash
$ docker-compose up --build
```

> 如出现拉取镜像失败的情况，可以尝试使用`docker login`登录`Docker Hub`
> 如拉取镜像时间过长，可以尝试使用`docker pull`命令手动拉取`node:16` 和 `openjdk:21-jdk-slim`镜像

前后端以及数据库容器生成后，会自动启动运行，当命令行窗口显示`frontend-1`编译完成后，即可直接访问`http://localhost:3000`使用本网站。
