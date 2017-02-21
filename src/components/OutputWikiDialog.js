

import React from 'react';
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
/**
 * 生成wiki格式文件
 */
export default class OutputWikiDialog extends React.Component{
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {
      showModal: false
    };
  }
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          生成wiki
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>wiki文本</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea className="form-control" defaultValue={this.props.content} rows="35" cols="100"></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>关闭</Button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  }
};
