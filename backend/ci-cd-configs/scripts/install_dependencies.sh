#!/bin/bash
# Script này chạy một lần ban đầu hoặc khi instance mới khởi động.
# Mục đích chính là đảm bảo thư mục deploy tồn tại và đúng quyền
echo "Ensuring deployment directory exists and has correct permissions..."
mkdir -p /home/ec2-user/qairline-backend/nginx
chown -R ec2-user:ec2-user /home/ec2-user/qairline-backend
echo "Deployment directory ready."
