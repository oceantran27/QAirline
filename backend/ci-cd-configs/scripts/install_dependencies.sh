#!/bin/bash
# Script khởi tạo ban đầu trên EC2 để chuẩn bị thư mục và đăng nhập ECR

echo "Ensuring deployment directory exists and has correct permissions..."
mkdir -p /home/ubuntu/qairline-backend/nginx
chown -R ubuntu:ubuntu /home/ubuntu/qairline-backend
echo "Deployment directory ready."

# --- Kiểm tra AWS CLI ---
echo "Checking AWS CLI version..."
if ! command -v aws &> /dev/null; then
    echo "ERROR: AWS CLI không được cài đặt. Vui lòng cài đặt AWS CLI v2 trước khi tiếp tục."
    exit 1
fi

AWS_VERSION=$(aws --version 2>&1)
echo "Found AWS CLI: $AWS_VERSION"

# Đảm bảo đó là AWS CLI v2
if ! echo "$AWS_VERSION" | grep -q "aws-cli/2"; then
    echo "ERROR: AWS CLI không phải bản v2. Vui lòng cài bản aws-cli v2."
    exit 1
fi

# --- Đăng nhập vào Amazon ECR ---
echo "Logging in to Amazon ECR from EC2 instance..."
AWS_REGION="ap-southeast-1"
CUSTOM_AWS_ACCOUNT_ID="982081055699" # Thay bằng Account ID thực

aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $CUSTOM_AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

if [ $? -ne 0 ]; then
    echo "Failed to log in to ECR. Exiting."
    exit 1
fi

echo "Successfully logged in to ECR."
