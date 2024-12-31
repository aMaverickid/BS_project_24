# 使用官方的Node.js镜像作为基础镜像
FROM node:16 AS build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露3000端口
EXPOSE 3000

# 启动React应用
CMD ["npm", "start"]