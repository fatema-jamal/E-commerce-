import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";

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
const axios = require("axios");

function SignUpForm(props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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

    const reg = {
      name: state.name,
      email: state.email,
      password: state.password,
      phone: state.phone,
      address: state.address,
    };
    axios
      .post("http://localhost:4000/api/v1/users/register", reg)
      .then(function (response) {
        console.log(response);
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
        name="name"
        type="text"
        label="Name"
        component={renderFormField}
        placeholder="Name"
        onChange={handleChange}
        value={state.name}
        validate={[required, name]}
        required={true}
      />

      <Field
        name="address"
        type="text"
        label="Address"
        component={renderFormField}
        placeholder="Address"
        onChange={handleChange}
        value={state.address}
        validate={[required, name]}
        required={true}
      />

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
      <div className="row mb-3"> </div>
      <Field
        name="phone"
        type="number"
        label="Mobile no"
        component={renderFormGroupField}
        placeholder="Mobile no without country code"
        onChange={handleChange}
        value={state.phone}
        icon={IconPhoneFill}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        required={true}
        max="999999999999999"
        min="9999"
        className="mb-3"
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
        Create
      </button>
      <Link className="float-left" to="/account/signin" title="Sign In">
        Sign In
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
    form: "signup",
  })
)(SignUpForm);
