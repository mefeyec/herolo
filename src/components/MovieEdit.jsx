import React, { Component } from "react";

class MovieEdit extends Component {
  //{"name":"aaa","year":"1999"}
  state = {};

  constructor(props) {
    super(props);

    //{"data":{"id":0,"details":{"name":"aaa","year":"1999"}}}
    this.state = props.data.details;
    this.createListElements = this.createListElements.bind(this);
    this.handleChangeInTextFields = this.handleChangeInTextFields.bind(this);
    this.validateBeforeSave = this.validateBeforeSave.bind(this);
  }

  handleChangeInTextFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateBeforeSave() {
    if (
      this.state.Title !== "" &&
      !isNaN(this.state.Year) &&
      this.state.Year >= 0 &&
      this.state.Year <= new Date().getFullYear() &&
      this.state.Runtime !== "" &&
      this.state.Genre !== "" &&
      this.state.Director !== ""
    ) {
      let title_unique = true;
      this.props.moviesList.forEach(currentValue => {
        if (
          currentValue.id !== this.props.data.id &&
          currentValue.details.Title === this.state.Title
        ) {
          title_unique = false;
        }
      });
      if (title_unique) {
        this.props.save_btn_clbk({
          id: this.props.data.id,
          details: this.state
        });
      }
    }
  }

  createListElements() {
    let props_as_arr = Object.entries(this.props.data.details);
    let key = -1;
    let arr_as_elements = props_as_arr.map(i => {
      key++;
      return (
        <label className="lead btn-toolbar" key={key}>
          {i[0]}:
          <input
            type="text"
            name={i[0]}
            className="form-control"
            defaultValue={i[1]}
            onChange={this.handleChangeInTextFields}
          />
        </label>
      );
    });
    return arr_as_elements;
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-lg btn btn-info btn-block"
          type="button"
          onClick={this.props.cancel_btn_clbk}
        >
          CANCLE
        </button>
        <br />
        <h1>Edit Movie Details</h1>
        <br />
        <br />
        <form>
          {this.createListElements()}
          <br />

          <p>
            Make sure fields are not empty, the Year is valid, and the Title is
            unique !
          </p>
          <br />
          <button
            className="btn btn-lg btn-primary btn-block btn-success"
            type="button"
            onClick={this.validateBeforeSave}
          >
            SAVE
          </button>
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default MovieEdit;
