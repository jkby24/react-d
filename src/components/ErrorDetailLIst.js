
import React from 'react';
/**
 * 错误详情列表
 */
export default class ErrorDetailLIst extends React.Component{

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
    return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>page</th>
                        <th>userAgent</th>
                        <th>errorTime</th>
                    </tr>
                </thead>
                <tbody>

                  {
                    this.props.items.map(function(item) {
                        return <tr>
                                  <td>{item.page}</td>
                                  <td>{item.userAgent}</td>
                                  <td>{item.errorTime}</td>
                              </tr> 
                    })
                  }

                
                </tbody>
            </table>
        );
  }
};