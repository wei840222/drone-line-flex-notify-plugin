# drone-line-flex-notify-plugin

1. You shoud have a LINE Channel which have messageAPI and push message permition.
See [Doc](https://developers.line.biz/en/reference/messaging-api/#send-push-message) for more information

2. Add following step in your drone pipeline
```
pipeline:
    line-flex-notify:
        image: wei840222/drone-line-flex-notify-plugin
        access_token: chanel accessToken
        to: userId, groupId, or roomId
```
