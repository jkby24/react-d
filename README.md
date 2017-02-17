基于React+Webpack+ES6的前端项目模版目录
npm run dev //项目开发过程使用，启动服务，实时刷新
npm run build //开发完成之后打包文件（js、css分开打包）

本项目默认监听端口是8888，所以在浏览器输入 http://localhost:8888，或者index.html->右键打开方式->chrome 就能看到效果了
如果执行上述命令提示错误：Error: getaddrinfo ENOTFOUND localhost，在host文件里面添加127.0.0.1 localhost即可
监听端口和实时刷新的功能都能在webpack.config.js文件中修改配置