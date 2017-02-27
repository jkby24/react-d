
import React from 'react';
import OuputWiki from './OuputWiki.js'
import PureRenderMixin from 'react-addons-pure-render-mixin';
/**
 * 错误详情列表
 */
export default class ErrorDetailList extends React.Component{

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

//   componentDidMount() {
//     this.setState({
//       disabled: false
//     })
//   }

//   handleClick() {
//     this.setState({
//       items: this.state.items.concat('Item ' + this.state.items.length)
//     })
//   }

  render() {
    var items = this.props.items,
    heads = Object.keys(items[0]);
    //
    // var style = {
    //   display: this.props.active?'block':'none'
    // }
    return (
            <table className="table table-hover table-striped table-bordered table-condensed">
                <thead>
                    <tr>
                      <th>操作</th>
                        {
                          heads.map(function(key){
                            return <th key={key}>{key}</th>
                          })
                        }

                    </tr>
                </thead>
                <tbody>
                  {
                    this.props.items.map(function(item,index) {
                        return <tr key={index}>
                                  <td>
                                      <OuputWiki error={item}></OuputWiki>
                                  </td>
                                  {
                                    heads.map(function(key){
                                      return <td key={key} dangerouslySetInnerHTML={{__html: (item[key] || '').toString().replace(/\n/g,'<br>')}}></td>
                                    })
                                  }
                              </tr>
                    })
                  }
                </tbody>
            </table>
        );
  }
};
