# Sử dụng base image Node.js
FROM node:18-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY src/package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn ứng dụng (từ thư mục src/ của host vào /app của container)
COPY src/ ./

# Expose cổng mà ứng dụng Node.js lắng nghe
EXPOSE 3030

# Lệnh chạy ứng dụng
CMD ["node", "app.js"]
