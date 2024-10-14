# Let's visionOS 2025 的 Email 订阅服务

## Doc

- https://substackapi.com/
- 英文：https://xrworldweekly.substack.com/
- 中文：https://xrworldweeklycn.substack.com/
- Mock:

```
curl --location 'https://substackapi.com/api/subscribe' \
--header 'Content-Type: application/json' \
--data-raw '{
  "domain": "xrworldweeklycn.substack.com",
  "email": "user2@example.com"
}'
```

## Deploy

- Create a new Worker in the Cloudflare Dashboard;
- Paste this code into the Worker's editor;
- Save and deploy the Worker.

## Test

```
curl --location 'https://mail2xrbase.eyrefree1687.workers.dev/subscribe/post' \
--form 'MERGE0="user2@example.com"'
```