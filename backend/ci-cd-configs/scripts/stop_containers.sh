#!/bin/bash
echo "Stopping existing Docker containers..."
cd /home/ec2-user/qairline-backend # Di chuyển vào thư mục triển khai trên EC2
/usr/local/bin/docker-compose down # Dừng các container hiện tại
echo "Containers stopped."
