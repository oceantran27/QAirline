#!/bin/bash
echo "Starting new Docker containers..."
cd /home/ubuntu/qairline-backend # Thay ec2-user thành ubuntu

# --- ĐÃ XÓA PHẦN ĐĂNG NHẬP ECR KHỎI ĐÂY VÌ ĐÃ THÊM VÀO install_dependencies.sh ---
# $(/usr/bin/aws ecr get-login --no-include-email --region ap-southeast-1)

echo "Fetching private file content from AWS Secrets Manager..."
PRIVATE_FILE_CONTENT=$(aws secretsmanager get-secret-value --secret-id qairline/backend/private-config-file --query SecretString --output text --region ap-southeast-1)

echo "$PRIVATE_FILE_CONTENT" > /home/ubuntu/qairline-backend/serviceAccountKey.json # Thay ec2-user thành ubuntu
chmod 600 /home/ubuntu/qairline-backend/serviceAccountKey.json # Cấp quyền phù hợp

echo "Private file recreated on EC2."

echo "Pulling latest Docker images from ECR..."
/usr/local/bin/docker-compose pull # Lệnh này giờ sẽ hoạt động vì đã đăng nhập ECR trong install_dependencies.sh

echo "Bringing up Docker Compose services..."
/usr/local/bin/docker-compose up -d
echo "Containers started."