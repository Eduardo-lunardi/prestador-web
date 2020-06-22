import React from "react";

export default class Loading extends React.Component {
  render() {
    let { props } = this;
    if (props.error) {
      return (
        <div>
          Deu erro{" "}
          <button className="btn btn-default" onClick={props.retry}>
            Tentar novamente
          </button>
        </div>
      );
    } else if (props.pastDelay) {
      return (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      );
    } else {
      return null;
    }
  }
}
