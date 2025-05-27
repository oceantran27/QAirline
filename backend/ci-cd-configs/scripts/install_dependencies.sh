#!/bin/bash
# Script này chạy một lần ban đầu hoặc khi instance mới khởi động.
# Mục đích chính là đảm bảo thư mục deploy tồn tại và đúng quyền

echo "Ensuring deployment directory exists and has correct permissions..."
mkdir -p /home/ubuntu/qairline-backend/nginx
chown -R ubuntu:ubuntu /home/ubuntu/qairline-backend
echo "Deployment directory ready."

# --- Bắt đầu phần cài đặt AWS CLI ---
echo "Checking and installing AWS CLI if not present or incomplete..."
if ! command -v aws &> /dev/null || ! aws --version 2>&1 | grep -q "aws-cli"
then
    echo "AWS CLI not found or incomplete. Installing..."
    # Cập nhật hệ thống và cài đặt các gói cần thiết
    sudo apt-get update -y || { echo "Failed to apt-get update. Exiting."; exit 1; }
    sudo apt-get install -y unzip curl groff less || { echo "Failed to install unzip, curl, groff, less. Exiting."; exit 1; }

    # Tải về và cài đặt AWS CLI v2
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/tmp/awscliv2.zip" || { echo "Failed to download awscliv2.zip. Exiting."; exit 1; }
    unzip /tmp/awscliv2.zip -d /tmp/ || { echo "Failed to unzip awscliv2.zip. Exiting."; exit 1; }

    # Gỡ bỏ bản cài đặt cũ nếu có để tránh xung đột
    if [ -d "/usr/local/bin/aws" ]; then
        sudo rm -rf /usr/local/bin/aws
    fi
    if [ -d "/usr/local/bin/aws_completer" ]; then
        sudo rm -rf /usr/local/bin/aws_completer
    fi
    if [ -d "/usr/local/aws-cli" ]; then
        sudo rm -rf /usr/local/aws-cli
    fi

    # Cài đặt chính thức
    sudo /tmp/aws/install --update || { echo "Failed to install AWS CLI. Exiting."; exit 1; }

    # Dọn dẹp các file tạm thời
    rm -rf /tmp/awscliv2.zip /tmp/aws/

    echo "AWS CLI installation attempt finished."
else
    echo "AWS CLI is already installed and appears functional."
fi

# Kiểm tra lại sau khi cài đặt
if ! command -v aws &> /dev/null; then
    echo "ERROR: AWS CLI is still not found after installation attempt. Cannot proceed with ECR login."
    exit 1
fi
# --- Kết thúc phần cài đặt AWS CLI ---


# --- Đăng nhập vào Amazon ECR ---
echo "Logging in to Amazon ECR from EC2 instance..."
AWS_REGION="ap-southeast-1" # Đảm bảo đúng Region của ECR của bạn
# Lấy ID tài khoản AWS động trong trường hợp cần thiết (từ metadata, nhưng ở đây dùng hardcode ID của bạn)
# CUSTOM_AWS_ACCOUNT_ID=$(curl -s http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .accountId)
# Hoặc đơn giản hơn, dùng ID bạn đã biết từ buildspec.yml
CUSTOM_AWS_ACCOUNT_ID="982081055699" # Thay bằng Account ID thực của bạn

aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $CUSTOM_AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

if [ $? -ne 0 ]; then
    echo "Failed to log in to ECR. Exiting."
    exit 1
fi
echo "Successfully logged in to ECR."
# --- Kết thúc phần đăng nhập ECR ---

# --- Các lệnh khác của bạn trong install_dependencies.sh (nếu có) ---
# Ví dụ: Cài đặt Docker và Docker Compose nếu cần
# echo "Installing Docker and Docker Compose if not present..."
# if ! command -v docker &> /dev/null
# then
#     sudo apt-get update -y
#     sudo apt-get install -y docker.io docker-compose
#     sudo usermod -aG docker ubuntu # Thêm user 'ubuntu' vào nhóm 'docker'
#     sudo service docker start
# fi