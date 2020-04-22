import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const UpdateForm = ({ movies }) => {
  const { id } = useParams();
  const history = useHistory();

  const getMovie = movies.find((movie) => movie.id === Number(id));
  const { title, director, metascore, stars } = getMovie;

  return (
    <div>
      <Formik
        initialValues={{ title, director, metascore, stars }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          axios
            .put(`http://localhost:5003/api/movies/${id}`, values)
            .then((res) => {
              console.log("res here ", res.data);
            });
          resetForm();
        }}
      >
        {() => (
          <Form>
            <label htmlFor="title">
              <Field type="text" name="title" id="title" />
            </label>
            <label htmlFor="director">
              <Field type="text" name="director" id="director" />
            </label>
            <label htmlFor="metascore">
              <Field type="text" name="metascore" id="metascore" />
            </label>
            <label htmlFor="stars">
              <Field type="text" name="stars" id="stars" />
            </label>
            <button type="submit">save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateForm;
