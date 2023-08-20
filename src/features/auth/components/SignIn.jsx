import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./SignIn.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAsync, selectLogInError, selectLoggedInUser } from "../authSlice";
const SignIn = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUser);
  const logInErrorMessage = useSelector(selectLogInError)
  return (
    <>
    {user && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="logIn">
        <div className="logIn-title">
          <h1 className="logIn-title__content">Log in to your account</h1>
        </div>
        <form className="logIn-form" onSubmit={handleSubmit((data)=>{
          dispatch(checkUserAsync({email:data.email,password:data.password}))
        })}>
          <div className="logIn-form__content">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              {...register("email", {
                required: "email required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid",
                },
              })}
              id="email"
              placeholder="email"
            />
            {errors.email && (
              <span className="errorMessage">*{errors.email.message}</span>
            )}
          </div>
          <div className="logIn-form__content">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "password required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `-at least 8 characters
                  -must contain at least 1 uppercase letter and 1 number
                  -can contain special character`,
                },
              })}
              id="password"
              placeholder="password"
            />
            {errors.password && (
              <span className="errorMessage">*{errors.password.message}</span>
            )}
          </div>
              {
                logInErrorMessage && <span className="errorMessage">*{logInErrorMessage.message}</span>
              }
          <button className="logIn-form__btn">Log In</button>
        </form>
        <div className="logIn-member">
          <p className="logIn-member__link">
            Not a member?{" "}
            <Link to={"/sign-up"} className="link">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
