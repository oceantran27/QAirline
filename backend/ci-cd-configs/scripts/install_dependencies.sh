#!/bin/bash
# Script này chạy một lần ban đầu hoặc khi instance mới khởi động.
# Mục đích chính là đảm bảo thư mục deploy tồn tại và đúng quyền

echo "Ensuring deployment directory exists and has correct permissions..."
mkdir -p /home/ubuntu/qairline-backend/nginx # Thay ec2-user thành ubuntu
chown -R ubuntu:ubuntu /home/ubuntu/qairline-backend # Thay ec2-user thành ubuntu
echo "Deployment directory ready."

# --- THÊM DÒNG NÀY ĐỂ ĐĂNG NHẬP ECR SỚM TRONG QUÁ TRÌNH TRIỂN KHAI ---
echo "Logging in to Amazon ECR from EC2 instance..."
AWS_REGION="ap-southeast-1" # Đảm bảo đúng Region của ECR của bạn
# Sử dụng aws ecr get-login-password thay vì get-login (get-login đã bị deprecated)
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin 982081055699.dkr.ecr.$AWS_REGION.amazonaws.com
if [ $? -ne 0 ]; then
    echo "Failed to log in to ECR. Exiting."
    exit 1
fi
echo "Successfully logged in to ECR."
# --- KẾT THÚC PHẦN THÊM ---

# Nếu bạn cần cài đặt Docker hoặc Docker Compose trên EC2 instance, hãy thêm vào đây
# Ví dụ cho Ubuntu:
# sudo apt-get update -y
# sudo apt-get install -y docker.io docker-compose
# sudo usermod -aG docker ubuntu # Thêm user 'ubuntu' vào nhóm 'docker' để có quyền chạy docker
# sudo service docker start # Khởi động lại docker service sau khi thêm user vào nhóm