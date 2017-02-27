

import React from 'react';
/**
 * loading
 */
export default class LoadingPopup extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    var style = {
      display : this.props.show?'block':'none'
    }
    return (
        <div style={style}>
          <div className="loading-backdrop"></div>
          <div className="loading black" data-backdrop="false">
            <div className="loading-body">
                <p>{this.props.text}</p>
            </div>
          </div>
        </div>
        );
  }
};
