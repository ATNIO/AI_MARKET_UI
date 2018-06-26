## 本地运行 (local deployment)
npm install        
yarn serve  or  npm run serve

## 构建代码  (build project)
yarn build or npm run build

## 环境变量
可在命令后面添加 --mode development

例如:

yarn build --mode development   // 构建开发环境的代码，可通过 process.env.NODE_ENV 获取环境变量.