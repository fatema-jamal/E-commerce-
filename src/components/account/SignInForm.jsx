import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhoneFill } from "bootstrap-icons/icons/phone-fill.svg";
import { ReactComponent as IconShieldLockFill } from "bootstrap-icons/icons/shield-lock-fill.svg";
import renderFormField from "../../helpers/renderFormField";
import { render } from "@testing-library/react";

const axios = require("axios");

function SignInForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    id: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function onSubmit(e) {
    e.preventDefault();

    const login = {
      email: state.email,
      password: state.password,
    };

    axios
      .post("http://localhost:4000/api/v1/users/login", login)
      .then(function (response) {
        console.log(response);
        state.id = response.data.statusText;
        console.log(state.id);
        if (response.statusText == "OK") {
          console.log("meya meya");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        //
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <Field
        name="email"
        type="text"
        label="Email"
        component={renderFormField}
        placeholder="Email"
        onChange={handleChange}
        value={state.email}
        validate={[required, name]}
        required={true}
      />

      <Field
        name="password"
        type="password"
        label="Your password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLockFill}
        onChange={handleChange}
        value={state.password}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />
      <button type="submit" className="btn btn-primary btn-block mb-3">
        Log In
      </button>
      <Link className="float-left" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link
        className="float-right"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn text-white bg-twitter mr-3">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="/" className="btn text-white mr-3 bg-facebook">
            <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
          </Link>
          <Link to="/" className="btn text-white mr-3 bg-google">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
          </Link>
        </div>
      </div>
    </form>
  );
}

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
