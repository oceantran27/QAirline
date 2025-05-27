#!/bin/bash
echo "Stopping existing Docker containers..."
cd /home/ubuntu/qairline-backend # Thay ec2-user thành ubuntu
/usr/local/bin/docker-compose down # Dừng các container hiện tại
echo "Containers stopped."