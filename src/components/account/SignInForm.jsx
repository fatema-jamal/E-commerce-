import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { useState } from "react";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhoneFill } from "bootstrap-icons/icons/phone-fill.svg";
import { ReactComponent as IconShieldLockFill } from "bootstrap-icons/icons/shield-lock-fill.svg";

const SignInForm = (props) => {
  //const { handleSubmit, submitting, onSubmit, submitFailed } = props;

  const [mobileNo, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    // event.preventDefault();
    /* alert(`Your state values: \n 
            mobile no: ${mobileNo} \n 
            password: ${password} \n 
            You can replace this alert with your process`);
  */
  };
  const submitting = (event) => {
    event.preventDefault();
    alert(`Your state values: \n 
    mobile no: ${mobileNo} \n 
    password: ${password} \n 
    You can replace this alert with your process`);

    //code to back //
  };
  const submitFailed = (event) => {};

  return (
    <form
      onSubmit={handleSubmit(submitting)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <Field
        name="mobileNo"
        type="number"
        label="Mobile no"
        component={renderFormGroupField}
        placeholder="Mobile no without country code"
        icon={IconPhoneFill}
        onChange={handleMobileChange}
        value={mobileNo}
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
        onChange={handlePasswordChange}
        value={password}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />
      <button
        type="submit"
        className="btn btn-primary btn-block mb-3"
        disabled={!mobileNo || !password}
      >
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
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
