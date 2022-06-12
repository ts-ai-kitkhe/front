#!/bin/bash

BUCKET_NAME="ts-ai-kitkhe-front"
DISTRIBUTION_ID="E3OG4MBV90TS5E"

aws s3 cp --recursive "dist/" s3://$BUCKET_NAME/ --exclude "index.html" --exclude "200.html" --cache-control max-age=31536000
aws s3 cp --recursive "dist/" s3://$BUCKET_NAME/ --exclude '*' --include "index.html" --include "200.html" --cache-control "no-cache, no-store, must-revalidate"

aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" > /dev/null

echo ""
echo "Visit: https://ts-ai-kitkhe.ge"