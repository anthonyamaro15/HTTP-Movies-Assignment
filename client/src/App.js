import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from "./Movies/UpdateForm";
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5003/api/movies")
      .then((res) => {
        console.log(res.data);
        setMovieList(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          data={movieList}
          setMovieList={setMovieList}
        />
      </Route>
      <Route exact path="/update-movie/:id">
        <UpdateForm movies={movieList} />
      </Route>
      <Route exact path="/add-movie">
        <AddMovie setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
