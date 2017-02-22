
import React from 'react';
import OuputWiki from './OuputWiki.js'
/**
 * 错误详情列表
 */
export default class ErrorDetailList extends React.Component{

//   constructor(props) {
//     super(props);
//     this.render = this.render.bind(this);
//     this.state = {
//       items: this.props.items,
//       disabled: true
//     };
//   }

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

    var style = {
      display: this.props.active?'block':'none'
    }
    return (
            <table className="table table-hover" style={style}>
                <thead>
                    <tr>
                        {
                          heads.map(function(key){
                            return <th>{key}</th>
                          })
                        }
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    this.props.items.map(function(item) {
                        return <tr>
                                  {
                                    heads.map(function(key){
                                      return <td dangerouslySetInnerHTML={{__html: (item[key] || '').toString().replace(/\n/g,'<br>')}}></td>
                                    })
                                  }
                                  <td>
                                      <OuputWiki error={item}></OuputWiki>
                                  </td>
                              </tr>
                    })
                  }
                </tbody>
            </table>
        );
  }
};
