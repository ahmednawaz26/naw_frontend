import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios.client";
import { UserContext } from "../contexts/user.context";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const { setUser, setToken, token } = useContext(UserContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axiosClient
      .post("login", payload)
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
        const { response } = error;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: response.data.message,
            });
          }
        }
      });
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          NAW
        </h1>
        {errors && (
          <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Errors
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              {Object.keys(errors).map((key) => {
                return <p key={key}>{errors[key]}</p>;
              })}
            </div>
          </div>
        )}
        <form className="mt-6" onSubmit={onSubmitHandler}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={onChangeHandler}
              value={payload.email}
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={onChangeHandler}
              value={payload.password}
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Log in
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
