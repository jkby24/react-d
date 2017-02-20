
import React from 'react';
import _ from 'lodash';
/**
 * 分组方式
 */
export default class GroupSelect extends React.Component{

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.groupByErrorKey = this.groupByErrorKey.bind(this);
    this.groupByPageUrl = this.groupByPageUrl.bind(this);

    var datas = [];
    _.forEach(this.props.datas,function(data){
        var ex_msg = JSON.parse(data['ex_msg']);
        datas.push(ex_msg);
    })
    this.state = {
      groupType: 'key',
      datas:datas
    };
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
           <div className="btn-group" role="group" aria-label="...">
              <button type="button" className={this.state.groupType == 'key' ? 'btn btn-primary' : 'btn'} onClick={this.groupByErrorKey}>根据错误消息</button>
              <button type="button" className={this.state.groupType == 'url' ? 'btn btn-primary' : 'btn'} onClick={this.groupByPageUrl}>根据页面URL</button>
            </div>
            
        );
  }
};
