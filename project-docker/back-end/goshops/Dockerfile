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

# 设置环境变量以防止交互式安装提示
ENV DEBIAN_FRONTEND=noninteractive

# 安装必要的工具和依赖
RUN apt-get update && \
    apt-get install -y wget gnupg unzip curl \
        libglib2.0-0 libnss3 libatk1.0-0 libatk-bridge2.0-0 \
        libcups2 libxkbcommon0 libx11-xcb1 libxcomposite1 \
        libxdamage1 libxrandr2 libgbm1 libasound2 \
        fonts-liberation libappindicator3-1 xdg-utils && \
    rm -rf /var/lib/apt/lists/*


# 添加 Microsoft GPG 密钥
RUN wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | apt-key add -

# 添加 Microsoft Edge 仓库
RUN echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list

# 更新包列表并安装 Microsoft Edge
RUN apt-get update && \
    apt-get install -y microsoft-edge-stable && \
    rm -rf /var/lib/apt/lists/*

# 设置 Edge 的版本（根据需要调整）
ENV EDGE_VERSION=latest

# 下载并安装对应版本的 EdgeDriver
RUN if [ "$EDGE_VERSION" = "latest" ]; then \
        EDGE_DRIVER_URL=$(curl -s https://msedgedriver.azureedge.net/LATEST_STABLE | tr -cd '0-9.'); \
    else \
        EDGE_DRIVER_URL=$EDGE_VERSION; \
    fi && \
    echo "Installing EdgeDriver version: $EDGE_DRIVER_URL" && \
    wget -O /tmp/edgedriver.zip https://msedgedriver.azureedge.net/$EDGE_DRIVER_URL/edgedriver_linux64.zip && \
    unzip /tmp/edgedriver.zip -d /usr/local/bin/ && \
    chmod +x /usr/local/bin/msedgedriver && \
    rm /tmp/edgedriver.zip

# 创建非 root 用户以提高安全性
RUN useradd -m appuser

# 设置工作目录
WORKDIR /app

# 将 JAR 文件复制到容器中
COPY target/goshops-0.0.1-SNAPSHOT.jar app.jar

# 更改文件所有权为非 root 用户
RUN chown appuser:appuser app.jar

# 切换到非 root 用户
USER appuser

# 暴露应用运行的端口（根据你的配置调整端口）
EXPOSE 8080

# 启动应用
ENTRYPOINT ["java", "-jar", "app.jar"]
    