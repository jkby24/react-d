
import React from 'react';
import OutputWikiDialog from './OutputWikiDialog.js';
/**
 * 生成wiki格式文件
 */
export default class OuputWiki extends React.Component{

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }
  getTemplate(error){
    return `
== ${error.message} ==

*出现时间：

*解决时间：

*修复人：

*发布版本：

*云图信息：
    ${error.stack}

*用户代理信息：${error.userAgent}

*问题原因：

*解决方案：

*影响范围：

*参考资料：

*关键词：
          `;
  }
  render() {
    var wikiText = this.getTemplate(this.props.error);
    return (
        <div>
            <OutputWikiDialog content={wikiText}></OutputWikiDialog>
        </div>
        );
  }
};
