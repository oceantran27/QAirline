#!/bin/bash
echo "Starting new Docker containers..."
cd /home/ec2-user/qairline-backend # Di chuyển vào thư mục triển khai trên EC2

# Đăng nhập ECR trước khi pull image
# Cần phải chạy với quyền của người dùng có IAM Role để kéo từ ECR
$(/usr/bin/aws ecr get-login --no-include-email --region ap-southeast-1) # THAY REGION CỦA BẠN

echo "Pulling latest Docker images from ECR..."
/usr/local/bin/docker-compose pull # Kéo image mới nhất từ ECR

echo "Bringing up Docker Compose services..."
/usr/local/bin/docker-compose up -d --build # --build nếu Dockerfile thay đổi.
                                            # Nếu bạn đã build trong CodeBuild và chỉ muốn dùng image từ ECR, có thể bỏ --build
echo "Containers started."
