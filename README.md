# webpack_frame
### Webpack framework learning

# 框架结构
	├──config webpack配置
		├──webpack.base.conf.js  公用配置
		├──webpack.dev.conf.js  开发环境配置
		├──webpack.prod.conf.js	 生成环境配置
	├──src	
		├──assets	静态图片放置
		├──components	页面组件
			├──common 公用组件
			//多页面组件命名按每个页面命名文件夹，每个文件夹再放自己的组件，像
			├──pageA  表示多页面中a page的文件夹，下面放它自己的vue组件
		├──page	多页面的文件夹，放html,像
			├──pageA 表示pageA文件夹，里面放index.html,index.css,index.js,必须这样命名，不让就去改utils的getEntries函数
		├──lib	放一些公用库
		├──style 放css
		├──gitignore
		├──package.json
		├──README.md
