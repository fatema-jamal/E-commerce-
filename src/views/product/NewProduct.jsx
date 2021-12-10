import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import {
  required,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
} from "../../helpers/validation";
import { ReactComponent as IconPersonFill } from "bootstrap-icons/icons/person-fill.svg";
import { ReactComponent as IconPhoneFill } from "bootstrap-icons/icons/phone-fill.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconGeoAlt } from "bootstrap-icons/icons/geo-alt.svg";
import { ReactComponent as IconCalendarEvent } from "bootstrap-icons/icons/calendar-event.svg";
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";

const ProductForm = (props) => {
  const {
    handleSubmit,
    submitting,
    onSubmit,
    submitFailed,
    onImageChange,
    imagePreview,
  } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="card border-primary">
        <h6 className="card-header">
          <IconPersonSquareFill /> Product Details
        </h6>
        <img
          src={imagePreview ? imagePreview : "../../images/NO_IMG.png"}
          alt=""
          className="card-img-top rounded-0 img-fluid bg-secondary"
        />
        <div className="card-body">
          <Field
            name="formFile"
            component={renderFormFileInput}
            onImageChange={onImageChange}
            validate={[required]}
            tips="You don't allow uploading a photo more than 5MB"
          />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Field
              name="prodname"
              type="text"
              component={renderFormGroupField}
              placeholder="Product Name"
              //icon={IconPersonFill}
              // validate={[required, name]}
              //required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="description"
              type="text"
              component={renderFormGroupField}
              placeholder="Description"
              //icon={IconPersonFill}
              // validate={[required, name]}
              //required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="brand"
              type="text"
              component={renderFormGroupField}
              placeholder="Brand"
              //icon={IconPersonFill}
              // validate={[required, name]}
              //required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="price"
              type="number"
              component={renderFormGroupField}
              placeholder="Price"
              // icon={IconPhoneFill}
              validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
              required={true}
              max="999999999999999"
              min="9999"
            />
          </li>
          <li className="list-group-item">
            <Field
              name="category"
              type="text"
              component={renderFormGroupField}
              placeholder="Category"
              //icon={IconEnvelop}
              //validate={[required, email]}
              //required={true}
            />
          </li>

          <li className="list-group-item">
            <Field
              name="countInStock"
              type="number"
              component={renderFormGroupField}
              placeholder="Count In Stock"
              // icon={IconPhoneFill}
              validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
              required={true}
              max="999999999999999"
              min="9999"
            />
          </li>
        </ul>
        <div className="card-body">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "profile",
  })
)(ProductForm);
