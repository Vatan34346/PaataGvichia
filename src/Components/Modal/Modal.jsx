import { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

class BackDrop extends Component {
  render() {
    return <div className="backdrop" onClick={this.props.onClose}></div>;
  }
}

class ModalOverlay extends Component {
  render() {
    return (
      <div className="modal">
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const portalElement = document.getElementById("modal");

export default class Modal extends Component {
  render() {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <BackDrop onClose={this.props.onClose} />,
          portalElement
        )}

        {ReactDOM.createPortal(
          <ModalOverlay>{this.props.children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  }
}
