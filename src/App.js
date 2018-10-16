import React, { Component } from "react";
import Movie from "./components/Movie";
import ReactModal from "react-modal";
import MovieEdit from "./components/MovieEdit";
import MovieDelete from "./components/MovieDelete";
import MovieAdd from "./components/MovieAdd";

import "./App.css";

ReactModal.setAppElement("#root");

class App extends Component {
  constructor() {
    super();

    this.state = {
      moviesList: [],
      showEditModal: false,
      EditModalOpenMovieID: null,
      showDeleteModal: false,
      DeleteModalOpenMovieID: null,
      showAddModal: false
    };

    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleSaveBtnInEditModal = this.handleSaveBtnInEditModal.bind(this);
    this.handleCancelBtnInEditModal = this.handleCancelBtnInEditModal.bind(
      this
    );

    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    this.handleDeleteBtnInDeleteModal = this.handleDeleteBtnInDeleteModal.bind(
      this
    );
    this.handleCancelBtnInDeleteModal = this.handleCancelBtnInDeleteModal.bind(
      this
    );
    this.componentDidMount = this.componentDidMount.bind(this);

    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.handleCancelBtnInAddModal = this.handleCancelBtnInAddModal.bind(this);
    this.handleAddBtnInAddModal = this.handleAddBtnInAddModal.bind(this);
  }

  componentDidMount() {
    const axios = require("axios");
    const initial_movie_list = [
      "doom",
      "venom",
      "Annihilation",
      "Aquaman",
      "96"
    ];

    initial_movie_list.forEach((movie, index) => {
      axios
        .get(`https://www.omdbapi.com/?t=${movie}&apikey=53158977`)
        .then(response => {
          let new_movieList = this.state.moviesList.concat({
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

          this.setState({ moviesList: new_movieList });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  handleOpenEditModal(movieID) {
    this.setState({ EditModalOpenMovieID: movieID });
    this.setState({ showEditModal: true });
  }

  handleSaveBtnInEditModal(new_movie_details) {
    let newMoviesList = this.state.moviesList.map(
      i => (i.id === new_movie_details.id ? new_movie_details : i)
    );
    this.setState({ moviesList: newMoviesList });
    this.setState({ showEditModal: false });
  }

  handleAddBtnInAddModal(new_movie_details) {
    this.setState({ showAddModal: false });
    let newMoviesList = this.state.moviesList.concat(new_movie_details);
    this.setState({ moviesList: newMoviesList });
  }

  handleCancelBtnInEditModal() {
    this.setState({ showEditModal: false });
  }

  handleOpenDeleteModal(movieID) {
    this.setState({ DeleteModalOpenMovieID: movieID });
    this.setState({ showDeleteModal: true });
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }

  handleDeleteBtnInDeleteModal(movieID_to_delete) {
    let newMoviesList = this.state.moviesList.filter(
      i => i.id !== movieID_to_delete
    );
    this.setState({ moviesList: newMoviesList });
    this.setState({ showDeleteModal: false });
  }

  handleCancelBtnInDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  handleCancelBtnInAddModal() {
    this.setState({ showAddModal: false });
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <ReactModal
            isOpen={this.state.showEditModal}
            contentLabel="Edit modal"
            className="jumbotron"
          >
            <MovieEdit
              data={this.state.moviesList.find(
                mv => mv.id === this.state.EditModalOpenMovieID
              )}
              save_btn_clbk={this.handleSaveBtnInEditModal}
              cancel_btn_clbk={this.handleCancelBtnInEditModal}
              moviesList={this.state.moviesList}
            />
          </ReactModal>

          <ReactModal
            isOpen={this.state.showDeleteModal}
            contentLabel="Delete modal"
            className="jumbotron"
          >
            <MovieDelete
              data={this.state.moviesList.find(
                mv => mv.id === this.state.DeleteModalOpenMovieID
              )}
              delete_btn_clbk={this.handleDeleteBtnInDeleteModal}
              cancel_btn_clbk={this.handleCancelBtnInDeleteModal}
            />
          </ReactModal>

          <ReactModal
            isOpen={this.state.showAddModal}
            contentLabel="Add new movie modal"
            className="jumbotron"
          >
            <MovieAdd
              add_btn_clbk={this.handleAddBtnInAddModal}
              cancel_btn_clbk={this.handleCancelBtnInAddModal}
              moviesList={this.state.moviesList}
            />
          </ReactModal>

          <div>
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block btn-success"
              onClick={this.handleOpenAddModal}
            >
              Add new movie
            </button>
            <br />
            <br />
            <br />
            <br />
            <br />
            {this.state.moviesList.map(mv => {
              return (
                <Movie
                  key={mv.id}
                  movieID={mv.id}
                  moviedata={mv.details}
                  onClick_edit_btn={this.handleOpenEditModal}
                  onClick_delete_btn={this.handleOpenDeleteModal}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
