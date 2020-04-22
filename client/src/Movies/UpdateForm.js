import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const UpdateForm = ({ movies, setMovieList }) => {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5003/api/movies/${id}`)
      .then((res) => {
        //   console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, director, metascore, stars, id } = movie;
    const arr = stars.split(",");
    const obj = {
      id,
      title,
      director,
      metascore,
      stars: arr,
    };
    setMovie(obj);
    axios
      .put(`http://localhost:5003/api/movies/${id}`, movie)
      .then((res) => {
        const { title, director, metascore, stars, id } = res.data;
        const arr = stars.split(",");
        const obj = {
          id,
          title,
          director,
          metascore,
          stars: arr,
        };
        console.log("obj here", obj);
        const newData = movies.map((mov) => {
          if (mov.id === Number(id)) {
            return (mov = obj);
          }
          return mov;
        });
        setMovieList(newData);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movie">
            <input
              onChange={handleChange}
              id="movie"
              type="text"
              name="title"
              placeholder="Title"
              value={movie.title}
            />
          </label>
          <label htmlFor="movie">
            <input
              onChange={handleChange}
              id="movie"
              type="text"
              name="director"
              placeholder="Director"
              value={movie.director}
            />
          </label>
          <label htmlFor="movie">
            <input
              onChange={handleChange}
              id="movie"
              type="number"
              name="metascore"
              placeholder="Metascore"
              value={movie.metascore}
            />
          </label>
          <label htmlFor="movie">
            <input
              onChange={handleChange}
              id="movie"
              type="text"
              name="stars"
              placeholder="Stars"
              value={movie.stars}
            />
          </label>

          <button type="submit">Submit&rarr;</button>
        </div>
      </form>
      ;
    </div>
  );
};

export default UpdateForm;

//   <Formik
//     initialValues={movie}
//     onSubmit={(values, { resetForm }) => {
//       //  axios.put(`http://localhost:5003/api/movies/${id}`).then((res) => {
//       //    console.log("res here ", res.data);
//       //  });
//       resetForm();
//     }}
//   >
//     {() => (
//       <Form>
//         <label htmlFor="title">
//           <Field type="text" name="title" id="title" />
//         </label>
//         <label htmlFor="director">
//           <Field type="text" name="director" id="director" />
//         </label>
//         <label htmlFor="metascore">
//           <Field type="text" name="metascore" id="metascore" />
//         </label>
//         <label htmlFor="stars">
//           <Field type="text" name="stars" id="stars" />
//         </label>
//         <button type="submit">save</button>
//       </Form>
//     )}
//   </Formik>;
