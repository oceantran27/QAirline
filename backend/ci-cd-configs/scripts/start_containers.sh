#!/bin/bash
echo "Starting new Docker containers..."
cd /home/ec2-user/qairline-backend

# Đăng nhập ECR
$(/usr/bin/aws ecr get-login --no-include-email --region ap-southeast-1)

echo "Fetching private file content from AWS Secrets Manager..."
# Lấy nội dung secret
PRIVATE_FILE_CONTENT=$(aws secretsmanager get-secret-value --secret-id qairline/backend/private-config-file --query SecretString --output text --region ap-southeast-1)

# Nếu secret lưu dưới dạng JSON (ví dụ: {"file_data": "nội dung của bạn"})
# Bạn sẽ cần jq để trích xuất nội dung
# PRIVATE_FILE_DATA=$(echo "$PRIVATE_FILE_CONTENT" | jq -r '.file_data')
# echo "$PRIVATE_FILE_DATA" > /home/ec2-user/qairline-backend/path/to/your/private_file.txt

# Nếu secret lưu trực tiếp nội dung file dưới dạng văn bản thuần túy
echo "$PRIVATE_FILE_CONTENT" > /home/ec2-user/qairline-backend/serviceAccountKey.json
chmod 600 /home/ec2-user/qairline-backend/serviceAccountKey.json # Cấp quyền phù hợp

echo "Private file recreated on EC2."

echo "Pulling latest Docker images from ECR..."
/usr/local/bin/docker-compose pull

echo "Bringing up Docker Compose services..."
/usr/local/bin/docker-compose up -d
echo "Containers started."
