#!/bin/bash
echo "Validating service health after deployment..."
sleep 20 # Chờ một chút để các container khởi động hoàn toàn

# Kiểm tra health check endpoint của Nginx trên localhost
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)

if [ "$RESPONSE" -eq 200 ]; then
    echo "Health check passed! Service is healthy."
else
    echo "Health check failed! Service returned status code: $RESPONSE"
    exit 1 # Lệnh này sẽ khiến CodeDeploy báo lỗi triển khai
fi
