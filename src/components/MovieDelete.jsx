import React, { Component } from "react";

class MovieDelete extends Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-lg btn-info btn-block"
          type="button"
          onClick={this.props.cancel_btn_clbk}
        >
          CANCLE
        </button>
        <br />
        <h1>Delete Movie</h1>
        <br />
        <br />
        <b>Are you sure you want to delete the movie ?</b>
        <br />
        <br />
        <button
          className="btn btn-lg btn-primary btn-block btn-danger"
          type="button"
          onClick={() => this.props.delete_btn_clbk(this.props.data.id)}
        >
          DELETE
        </button>
      </div>
    );
  }
}

export default MovieDelete;
