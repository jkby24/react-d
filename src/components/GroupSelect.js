
import React from 'react';
import _ from 'lodash';
/**
 * 分组方式
 */
export default class GroupSelect extends React.Component{

  constructor(props) {
    super(props);
    // this.render = this.render.bind(this);
    this._groupByErrorKey = ()=>this.groupByErrorKey();
    this._groupByPageUrl = ()=>this.groupByPageUrl();
    this._groupByClient = ()=>this.groupByClient();
    var datas = [],that = this;
    _.forEach(this.props.datas,function(data){
        var ex_msg = JSON.parse(data['ex_msg']);
        ex_msg['client'] = that.getBowerInfo(ex_msg.userAgent,ex_msg.page);
        datas.push(ex_msg);
    })
    this.state = {
      groupType: 'key',
      datas:datas
    };
  }
  getBowerInfo(userAgent,page){
    if(page.indexOf('client=wechat')!=-1){//来源微信
      return 'Wechat';
    }else if(userAgent.indexOf('Android')>-1|| userAgent.indexOf("Linux") > -1){
      return 'Android';
    }else if(userAgent.indexOf('iPhone')>-1){
      return 'iPhone';
    }else if(userAgent.indexOf('iPad')>-1){
      return 'iPad';
    }else if(userAgent.indexOf('Windows')>-1){
      return 'Windows';
    }else{
      return 'Unknown';
    }
  }
  componentDidMount() {
    this.groupByErrorKey();
  }
  /**
   * 根据错误code分组
   */
  groupByErrorKey() {
    var groupDatas = _.groupBy(this.state.datas,function(d){
        return decodeURIComponent(d.message);
    });
    this.afterGroup(groupDatas);
    this.setState({
      groupType: 'key'
    })
  }
  /**
   * 根据页面地址分组
   */
  groupByPageUrl() {
    var groupDatas = _.groupBy(this.state.datas,function(d){
        return d.page.indexOf('?')!=-1 ? d.page.substring(0,d.page.indexOf('?')) : d.page;
    });

    this.afterGroup(groupDatas);
    this.setState({
      groupType: 'url'
    })
  }
  /**
   * 根据错误code分组
   */
  groupByClient() {
    var groupDatas = _.groupBy(this.state.datas,function(d){
        return d.client;
    });
    this.afterGroup(groupDatas);
    this.setState({
      groupType: 'client'
    })
  }
  afterGroup(groupDatas){
    var items = [];
    _.mapKeys(groupDatas, function(value, key) {
      items.push({
        key:key,
        count:value.length,
        errors:value
      });
    });
    this.props.afterGroup(_.orderBy(items, ['count'], ['desc']));
  }
  render() {
    return (
          <div className="panel">
            <ul className="nav nav-tabs">
              <li role="presentation" className={this.state.groupType == 'key' ? 'active' : ''} onClick={this._groupByErrorKey}><a href="#">错误消息</a></li>
              <li role="presentation" className={this.state.groupType == 'url' ? 'active' : ''} onClick={this._groupByPageUrl}><a href="#">页面URL</a></li>
              <li role="presentation" className={this.state.groupType == 'client' ? 'active' : ''} onClick={this._groupByClient}><a href="#">终端</a></li>
            </ul>
          </div>
        );
  }
};
