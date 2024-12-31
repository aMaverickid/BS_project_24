# 使用 JDK 21 的基础镜像
FROM openjdk:21-jdk-slim

RUN echo "deb http://mirrors.aliyun.com/debian bullseye main contrib non-free" > /etc/apt/sources.list && \
    echo "deb http://mirrors.aliyun.com/debian-security bullseye-security main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.aliyun.com/debian bullseye-updates main contrib non-free" >> /etc/apt/sources.list


# 安装必要的依赖，包括 libglib 和其他缺少的库
RUN apt-get update && apt-get install -y --no-install-recommends --fix-missing \
    libglib2.0-0 \
    libx11-dev \
    libgdk-pixbuf2.0-dev \
    libgtk-3-0 \
    libnss3 \
    libasound2 \
    libxcomposite1 \
    libxrandr2 \
    libxi6 \
    libxtst6 \
    wget \
    unzip \
    curl \
    ca-certificates \
    gnupg \
    fonts-liberation \
    libdrm2 \
    libgbm1 \
    libvulkan1 \
    xdg-utils \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgles2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrender1 \
    libxss1 \
    lsb-release \
    xdg-utils

# 安装edge
## Setup
# RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
# RUN install -o root -g root -m 644 microsoft.gpg /usr/share/keyrings/
# RUN sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-beta.list'
# RUN rm microsoft.gpg
# ## Install
# RUN apt-get update
# RUN apt-get install -y microsoft-edge-beta


# 安装 Microsoft Edge 浏览器
RUN curl https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/microsoft-edge-stable_131.0.2903.86-1_amd64.deb -o microsoft-edge-stable.deb && \
    dpkg -i microsoft-edge-stable.deb && \
    apt-get update && \
    apt-get -f install && \
    rm microsoft-edge-stable.deb

# 安装 msedgedriver
RUN wget https://msedgedriver.azureedge.net/131.0.2903.87/edgedriver_linux64.zip && \
    unzip edgedriver_linux64.zip && \
    mv msedgedriver /usr/local/bin/ && \
    rm edgedriver_linux64.zip

# 设置工作目录
WORKDIR /app

# 将构建好的 Spring Boot JAR 文件复制到容器中
COPY target/goshops-0.0.1-SNAPSHOT.jar app.jar

# 将 src 目录的内容复制到容器中的 /app/src 目录
COPY src /app/src

# 暴露应用的端口（通常是 8080）
EXPOSE 8080

# 运行 Spring Boot 应用
ENTRYPOINT ["java", "-jar", "app.jar"]