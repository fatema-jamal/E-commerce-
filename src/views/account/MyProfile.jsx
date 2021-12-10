import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() =>
  import("../../components/account/CardListForm")
);
const newProd = lazy(() => import("../../views/product/NewProduct"));
class MyProfileView extends Component {
  state = { imagePreview: "", isDeleting: false };

  onSubmitProfile = async (values) => {
    alert(JSON.stringify(values));
  };

  onSubmitChangePassword = async (values) => {
    alert(JSON.stringify(values));
  };

  onImageChange = async (obj) => {
    if (obj) {
      const val = await this.getBase64(obj);
      this.setState({ imagePreview: val });
    } else {
      this.setState({ imagePreview: "" });
    }
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };
  render() {
    return (
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <ProfileForm
              onSubmit={this.onSubmitProfile}
              onImageChange={this.onImageChange}
              imagePreview={this.state.imagePreview}
            />
          </div>
          <div className="col-md-8">
            <div className="card-footer">
              <Link
                to="../../views/product/NewProduct"
                className="btn btn-primary float-right"
              >
                Sell Product <IconChevronRight className="i-va" />
              </Link>
              <Link to="/" className="btn btn-secondary">
                <IconChevronLeft className="i-va" /> Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfileView;
