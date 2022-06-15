# MRX Frontend Boilerplate

## Contains

- [x] [Node.js](#nodejs) _v16.14.0_
- [x] [npm](#npm) _v8.4.1_

- [x] TypeScript _v4.5.5_
- [x] React _v17.0.2_
- [x] Emotion _v11_

- [x] Webpack _v5.68.0_
- [x] Babel _v7.17.2_
- [x] Eslint _v8.8.0_
- [x] StyleLint _v13.13.1_
- [x] Prettier _v2.5.1_

---

### Node.js

동일한 개발 및 빌드 환경 구축을 위해 동일한 Node.js version 을 사용합니다.

Node.js Docs 의 [LTS (long-term support) release 일정](https://nodejs.org/en/about/releases/) 에 따라 가장 최신 버전 중 Active 단계인  
**v.16.14.0** 을 사용합니다.

<a href="https://nodejs.org/en/about/releases/"><img src="https://raw.githubusercontent.com/nodejs/Release/master/schedule.svg?sanitize=true" width='500'></a>

[nvm](https://github.com/nvm-sh/nvm) (node version manager) 을 사용하면 쉽게 node version 을 컨트롤 할 수 있습니다.  
nvm 을 [install](https://github.com/nvm-sh/nvm#installing-and-updating) 한 후 아래 command 를 입력합니다.

```bash
  # build
  make docker_build

  # run
  make docker_run

  # stop & delete
  make docker_down

  # push image to cloud registry (ex. ghcr)
  make docker_push
```

---

### NPM

- Docker 환경에서 package install 에 더 높은 성능을 가진 [npm](https://github.com/npm/cli) 을 사용합니다. (
  참고 : [yarn 에서 발견된 문제점](https://github.com/yarnpkg/yarn/issues/7747))

- 개발환경에서 동일한 dependency tree (`node_modules` 와 `package-lock.json`) 구축을 위해 npm version 의 통일 또한 권장됩니다.

```bash
    npm install -g npm@8.4.1
```

---
