#!/bin/bash
# Script này chạy một lần ban đầu hoặc khi instance mới khởi động.
# Mục đích chính là đảm bảo thư mục deploy tồn tại và đúng quyền

echo "Ensuring deployment directory exists and has correct permissions..."
mkdir -p /home/ubuntu/qairline-backend/nginx
chown -R ubuntu:ubuntu /home/ubuntu/qairline-backend
echo "Deployment directory ready."

# --- THÊM PHẦN CÀI ĐẶT AWS CLI VÀO ĐÂY ---
echo "Checking and installing AWS CLI if not present..."
if ! command -v aws &> /dev/null
then
    echo "AWS CLI not found. Installing..."
    sudo apt-get update -y
    sudo apt-get install -y unzip curl
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install --update
    rm -rf awscliv2.zip aws/
    echo "AWS CLI installed."
else
    echo "AWS CLI is already installed."
fi
# --- KẾT THÚC PHẦN CÀI ĐẶT AWS CLI ---


echo "Logging in to Amazon ECR from EC2 instance..."
AWS_REGION="ap-southeast-1" # Đảm bảo đúng Region của ECR của bạn
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin 982081055699.dkr.ecr.$AWS_REGION.amazonaws.com

if [ $? -ne 0 ]; then
    echo "Failed to log in to ECR. Exiting."
    exit 1
fi
echo "Successfully logged in to ECR."

# --- Các lệnh khác của bạn trong install_dependencies.sh (nếu có) ---
# Ví dụ:
# echo "Installing Docker and Docker Compose if not present..."
# if ! command -v docker &> /dev/null
# then
#     sudo apt-get update -y
#     sudo apt-get install -y docker.io docker-compose
#     sudo usermod -aG docker ubuntu # Thêm user 'ubuntu' vào nhóm 'docker'
#     sudo service docker start
# fi