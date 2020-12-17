# tweet_collector

## 構成図

### batch
![tweet_collector](./diagrams/batch.svg)
### 外部api
![tweet_collector](./diagrams/external.svg)

## セットアップ

### GCPのセットアップ

#### google-cloud-sdk

インストール

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

## Cloud Build & Cloud Run へのデプロイ

### Cloud Build

```
$ npm run build-image
```

### Cloud Run

GCPのGUIから行う