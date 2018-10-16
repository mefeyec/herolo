import React, { Component } from "react";

class MovieAdd extends Component {
  state = {
    search_term: "",
    if_error: ""
  };

  constructor(props) {
    super(props);

    this.handleChangeInTextFields = this.handleChangeInTextFields.bind(this);
    this.validateBeforeAdd = this.validateBeforeAdd.bind(this);
  }

  handleChangeInTextFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateBeforeAdd() {
    this.setState({ if_error: "" });
    const axios = require("axios");

    axios
      .get(
        `https://www.omdbapi.com/?t=${this.state.search_term}&apikey=53158977`
      )
      .then(response => {
        if (response.data.Error) {
          this.setState({ if_error: response.data.Error });
        } else {
          const foundDuplicateTitle = this.props.moviesList.find(element => {
            return element.details.Title === response.data.Title;
          });
          if (foundDuplicateTitle) {
            this.setState({
              if_error:
                "Error : a movie named " +
                response.data.Title +
                " is already in the list!"
            });
          } else {
            this.props.add_btn_clbk({
              id:
                "" +
                response.data.Title +
                response.data.Year +
                response.data.Runtime +
                response.data.Genre +
                response.data.Director,
              details: {
                Title: response.data.Title,
                Year: response.data.Year,
                Runtime: response.data.Runtime,
                Genre: response.data.Genre,
                Director: response.data.Director
              }
            });
          }
        }
      })
      .catch(error => {
        this.setState({ if_error: error });
      });
  }

  render() {
    return (
      <form>
        <button
          className="btn btn-lg btn-primary btn-block btn-info"
          type="button"
          onClick={this.props.cancel_btn_clbk}
        >
          CANCLE
        </button>
        <br />
        <h1>Add new Movie</h1>
        <br />
        <br />
        <br />
        <input
          type="text"
          name="search_term"
          className="form-control"
          placeholder="Enter movie title here, and then hit Add"
          onChange={this.handleChangeInTextFields}
        />
        <br />
        <br />
        <button
          className="btn btn-lg btn-primary btn-block btn-success"
          type="button"
          onClick={this.validateBeforeAdd}
        >
          ADD
        </button>

        <div>{this.state.if_error}</div>
      </form>
    );
  }
}

export default MovieAdd;
