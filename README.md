# Let's visionOS 2024 的 Email 订阅服务

## Doc

- 新建 `.env` 将 `example.env` 的内容复制进去，并正确填写
- https://typlog.com/account/tokens
- https://typlog.com/admin/xrealityzonecn/subscribers
- https://vercel.com/guides/using-express-with-vercel
- Mock:

```
curl --location 'https://api.typlog.com/v3/subscribers' \
--header 'X-Site-Id: 4108' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [BEARER_TOKEN]' \
--data-raw '{
  "name": "2333",
  "email": "user2@example.com"
}'
```

## Example

```
curl --location 'https://letsvisionos24subscribe.swiftgg.team/subscribe/post' \
--form 'MERGE0="ef2333@eyrefree.org"'
```