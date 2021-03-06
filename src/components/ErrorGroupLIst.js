
import React from 'react';
import ErrorDetailList from './ErrorDetailList.js';
/**
 * 错误分组列表
 */
export default class ErrorGroupList extends React.Component{

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.state = {
      activeDetailKey: ''//展开的错误详情列表的key
    };
  }

//   componentDidMount() {
//     this.setState({
//       disabled: false
//     })
//   }

  panelHeadClick(key) {
    this.setState({
      activeDetailKey: key == this.state.activeDetailKey? '' : key
    })
  }

  render() {
    var that = this;
    return (
            <div className="panel">
              {
                this.props.items.map(function(item,key) {
                    var tableStyle = {
                      display: item.key==that.state.activeDetailKey?'block':'none'
                    }
                    return <div className="panel panel-default panel-danger" key={key}>
                              <div className="panel-heading list-group-item pointer-panel" onClick={that.panelHeadClick.bind(that,item.key)}>
                                  {item.key}
                                  <span className="badge">{item.count}</span>
                              </div>
                              <div className=" table-responsive" style={tableStyle}>
                                <ErrorDetailList items = {item.errors}></ErrorDetailList>
                              </div>
                          </div>
                })
              }
            </div>

        );
  }
};
