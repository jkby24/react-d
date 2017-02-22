
import React from 'react';
import ErrorDetailList from './ErrorDetailList.js';
import 'react-virtualized/styles.css';
import { Column, Table } from 'react-virtualized';
/**
 * 错误分组列表
 */
export default class ErrorGroupList extends React.Component{

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    // this.panelHeadClick = this.panelHeadClick.bind(this);
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
                    var errors = item.errors,
                    heads = Object.keys(errors[0]);
                    return <div className="panel panel-default panel-danger" key={key}>
                              <div className="panel-heading list-group-item pointer-panel" onClick={that.panelHeadClick.bind(that,item.key)}>
                                  {item.key}
                                  <span className="badge">{item.count}</span>
                              </div>
                              <div className=" table-responsive" style={tableStyle}>
                                <Table
                                  width={1800}
                                  height={800}
                                  headerHeight={20}
                                  rowHeight={30}
                                  rowCount={item.errors.length}
                                  rowGetter={({ index }) => item.errors[index]}
                                  >
                                    {

                                      heads.map(function(field){
                                        return <Column label={field} dataKey={field} width={200}/>
                                      })
                                    }
                                </Table>
                              </div>
                          </div>
                })
              }
            </div>
        );
  }
};
