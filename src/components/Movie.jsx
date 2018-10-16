import React, { Component } from "react";

class Movie extends Component {
  render() {
    let cloned_moviedata = JSON.parse(JSON.stringify(this.props.moviedata));
    const regExpression = /[^a-zA-Z0-9 ]+/g;
    const title_refactored = cloned_moviedata.Title.replace(regExpression, "");
    cloned_moviedata.Title = title_refactored;
    let props_as_arr = Object.entries(cloned_moviedata);
    let key = -1;
    let arr_as_elements = props_as_arr.map(i => {
      key++;
      return (
        <div key={key}>
          {i[0]} : {i[1]}
        </div>
      );
    });

    return (
      <div className="text-dark">
        <button className="btn btn-lg btn-info btn-block ">
          {arr_as_elements}
        </button>
        <button
          className="btn btn-lg btn-primary btn-block btn-warning"
          onClick={() => this.props.onClick_edit_btn(this.props.movieID)}
        >
          Edit
        </button>
        <button
          className="btn btn-lg btn-primary btn-block btn-danger"
          onClick={() => this.props.onClick_delete_btn(this.props.movieID)}
        >
          Delete
        </button>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Movie;
