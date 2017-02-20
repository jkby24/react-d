
import React from 'react';
import ErrorDetailLIst from './ErrorDetailLIst.js';
/**
 * 错误分组列表
 */
export default class ErrorGroupList extends React.Component{

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    // this.items = [
    //     'Canvas', 'Three.js', 'CSS3 Animation', 'JQuery Animation', 'SVG'
    // ];
    // this.state = {
    //   items: this.props.items,
    //   disabled: true
    // };
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
    return (
            <div>
              {
                this.props.items.map(function(item) {
                    return <div className="panel panel-default">
                              <div className="panel-heading list-group-item">
                                  {item.key}
                                  <span className="badge">{item.count}</span>
                              </div>
                              <ErrorDetailLIst items = {item.errors}></ErrorDetailLIst>
                          </div>  
                })
              }
            </div>
            
        );
  }
};
