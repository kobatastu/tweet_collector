# tweet_collector

## 構成図

### batch
![tweet_collector](./diagrams/batch.svg)
### 外部api
![tweet_collector](./diagrams/external.svg)

## セットアップ

### GCPのセットアップ

google-cloud-sdkのインストール

```
$ curl https://sdk.cloud.google.com | bash
$ exec -l $SHELL
```

初期化

```
$ gcloud init
```

アクセスの許可

```
$ gcloud auth application-default login
```

### configの作成

git cloneした場合、config/default.jsに以下のファイルが必要

```
module.exports = {
  TWITTER: {
    CONSUMER_KEY: 'twitterのapi key',
    CONSUMER_SECRET: 'twitterのsecret key',
    ACCESS_TOKEN_KEY: 'twitterのaccess token',
    ACCESS_TOKEN_SECRET: 'twitterのaccess token secret',
  },
  TASKS: {
    PROJECT_ID: 'GCPのプロジェクト名',
    LOCATION: 'Cloud Runのリージョン',
    URL: 'デプロイしたCloud RunのURL',
  },
};
```

## Cloud Build & Cloud Run へのデプロイ

### Cloud Build

```
$ npm run build-image
```

### Cloud Run

GCPのGUIから行う