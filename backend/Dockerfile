FROM node:20

# Làm việc trong thư mục app
WORKDIR /app

# Copy source
COPY . .

# Cài đặt các packages
RUN npm install

# Mở cổng cho ứng dụng
EXPOSE 3030

# Chạy ứng dụng
CMD ["npm", "start"]
