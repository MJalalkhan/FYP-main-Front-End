import './style.css'
import React, { useState } from "react";
import AccountMenu from "../../AccountSettingMenu";
import CustomSnackBar from "../../views/snackbar";
import Footer from '../../components/Footer/footer';
import Header from '../../components/Header/header';

const EditProfile = (props) => {
  const token = sessionStorage.getItem("token");
  const [isAuth, setAuth] = useState(!(token == null || token == ""))
  const [diagStatus, setDiagStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);
  //////////////////User/Admin States
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [role, setRole] = useState('');



  const firstNameChange = (event) => {
    setFirstName(event.target.value);
  }
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  }
  const phoneNumChange = (event) => {
    setPhoneNum(event.target.value);
  }


  //////////////////Vendor States
  const [storeName, setStoreName] = useState(null);
  const [storeLocation, setStoreLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [bankName, setBankName] = useState('');
  const [accountTitle, setAccountTitle] = useState(null);
  const [storeType, setStoreType] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [country, setCountry] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [accountNo, setAccountNo] = useState(null);

  const storeNameChange = (event) => {
    setStoreName(event.target.value);
  }
  const storeLocationChange = (event) => {
    setStoreLocation(event.target.value);
  }
  const cityChange = (event) => {
    setCity(event.target.value);
  }
  const bankNameChange = (event) => {
    setBankName(event.target.value);
  }
  const accountTitleChange = (event) => {
    setAccountTitle(event.target.value);
  }
  const storeTypeChange = (event) => {
    setStoreType(event.target.value);
  }
  const mobileChange = (event) => {
    setMobile(event.target.value);
  }
  const countryChange = (event) => {
    setCountry(event.target.value);
  }
  const branchCodeChange = (event) => {
    setBranchCode(event.target.value);
  }
  const accountNoChange = (event) => {
    setAccountNo(event.target.value);
  }

  React.useEffect(() => {
    fetch(`http://localhost:3000/api/auth/displayUserDataInProfile`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: null
    })
      .then(res => res.json())
      .then((response) => {
        //////user/admin 
        setUser(response.response)
        setFirstName(response.response.firstName || '')
        setLastName(response.response.lastName || '')
        setPhoneNum(response.response.phoneNum || '')
        setRole(response.response.role || '')

        //////vendor
        setStoreName(response.response.storeName || '')
        setStoreLocation(response.response.storeLocation || '')
        setCity(response.response.address.city || '')
        setBankName(response.response.bank.bankName || '')
        setAccountTitle(response.response.bank.accountTitle || '')
        setStoreType(response.response.storeType || '')
        setMobile(response.response.mobile || '')
        setCountry(response.response.address.country || '')
        setBranchCode(response.response.bank.branchCode || '')
        setAccountNo(response.response.bank.accountNo || '')

        console.log('res', response.response, user);
      })
      .catch((err) => { console.log(err) });

  }, [])

  async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const UpdateData = (event) => {
    event.preventDefault();
    let data;
    if (role === 'user' || role === 'admin') {
      const { firstName, lastName, phoneNum, email, oldPassword, newPassword, confirmPassword } = event.target.elements;
      data = {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNum: phoneNum.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value
      };
    }
    if (role === 'vendor') {
      const { storeName,
        storeType,
        storeLocation,
        email,
        oldPassword,
        newPassword,
        confirmPassword,
        mobile,
        // address,
        city,
        // province,
        country,
        cnicNo,
        // cnicName,
        bankName,
        branchCode,
        accountTitle,
        accountNo } = event.target.elements;
      data = {
        storeName: storeName.value,
        storeType: storeType.value,
        storeLocation: storeLocation.value,
        email: email.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
        mobile: mobile.value,
        // address: address.value,
        city: city.value,
        // province: province.value,
        country: country.value,
        cnicNo: cnicNo.value,
        // cnicName: cnicName.value,
        bankName: bankName.value,
        branchCode: branchCode.value,
        accountTitle: accountTitle.value,
        accountNo: accountNo.value,
      };
    }

    postData('http://localhost:3000/api/auth/updateUserProfileData', data).then((response) => {
      if (response.status == 200) {
        console.log("aaa", response.message);
        setDiagStatus(true);
        setMsg(`${response.message}`);
      }
      else {
        console.log("bbbb", response.Error);
        setAuth(false)
        setDiagStatus(true);
        setMsg(`${response.Error}`)
      }

      // return response;
    });
  }
  React.useEffect(() => {
    props.getCartCount()
  })
  const handleOpen = () => {
    setDiagStatus(true);
  };

  const handleClose = () => {
    setDiagStatus(false);
  };

  const handleLogout = (event) => {
    console.log("Token is ", event.view.sessionStorage.removeItem("token"))
    if (event.view.sessionStorage.token == undefined) {
      setAuth(false)

    }
    setDiagStatus(true);
    setMsg('LoggedOut Successfully');

  };

  const renderDialog = () => {
    return <CustomSnackBar message={msg} handleClose={handleClose} open={handleOpen} />;
  };

  return (
    <>
      {role === 'user' ?
        <Header {...props} />
        :
        <div>
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {role === 'vendor' ?
              <div className="col-lg-4 col-4">
                <a href="/VendorDash" className="brand-wrap" style={{ fontSize: "22px", textDecoration: "none" }}>
                  <b>OnliteShop Vendor</b>
                </a>
              </div>
              :
              <div className="col-lg-4 col-4">
                <a href="/Admin/Dashboard" className="brand-wrap" style={{ fontSize: "22px", textDecoration: "none" }}>
                  <b>OnliteShop Admin</b>
                </a>
              </div>
            }

            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block" />

              <div className="widget-header icontext">

                <div>
                  <AccountMenu logout={props.handleLogout} />
                </div>

              </div>
            </ul>
          </nav>
        </div>
      }

      <section className="py-2 my-2">
        <div className="container">
          <h1 className="mb-2">Account Settings</h1>
          <div className="bg-white shadow rounded-lg d-block d-sm-flex">
            <div className="profile-tab-nav border-right">
              <div className="p-4">

                <h4 className="text-center">{firstName}</h4>
              </div>
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
                  <i className="fa fa-home text-center mr-1"></i>
                  Account
                </a>
                <a className="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                  <i className="fa fa-key text-center mr-1"></i>
                  Password
                </a>

              </div>
            </div>
            {/* ////==============User===============/// */}

            <form action="" onSubmit={UpdateData}>
              <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                  <h3 className="mb-4">Account Settings</h3>
                  {role === 'vendor' ?
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Store Name</label>
                            <input type="text" className="form-control" name="storeName" value={storeName} onChange={storeNameChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Store Type</label>
                            <input type="text" className="form-control" name="storeType" value={storeType} onChange={storeTypeChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={user?.email} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>cnicNo</label>
                            <input type="text" className="form-control" name="cnicNo" value={user?.cnic.cnicNo} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>ContactNo</label>
                            <input type="text" className="form-control" name="mobile" value={mobile} onChange={mobileChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>StoreLocation</label>
                            <input type="text" className="form-control" name="storeLocation" value={storeLocation} onChange={storeLocationChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" name="city" value={city} onChange={cityChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" name="country" value={country} onChange={countryChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>bankName</label>
                            <input type="text" className="form-control" name="bankName" value={bankName} onChange={bankNameChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>BranchCode</label>
                            <input type="text" className="form-control" name="branchCode" value={branchCode} onChange={branchCodeChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>AccountTitle</label>
                            <input type="text" className="form-control" name="accountTitle" value={accountTitle} onChange={accountTitleChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>AccountNo</label>
                            <input type="text" className="form-control" name="accountNo" value={accountNo} onChange={accountNoChange} />
                          </div>
                        </div>

                      </div>
                    </>
                    :
                    <div className="row">

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" className="form-control" name="firstName" value={firstName} onChange={firstNameChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input type="text" className="form-control" name="lastName" value={lastName} onChange={lastNameChange} />
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input type="text" className="form-control" name="email" value={user?.email} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone number</label>
                          <input type="text" className="form-control" name="phoneNum" value={phoneNum} onChange={phoneNumChange} />
                        </div>
                      </div>
                    </div>
                  }
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">
                      {
                        role === 'user' ?
                        <a href="/" style={{
                          textDecoration: 'none',
                          color: 'black'
                        }}>Cancel</a>
                        :
                        role === 'vendor' ?
                          <a href="/VendorDash" style={{
                            textDecoration: 'none',
                            color: 'black'
                          }}>Cancel</a>
                          :
                          <a href="/Admin/Dashboard" style={{
                            textDecoration: 'none',
                            color: 'black'
                          }}>Cancel</a>
                      }
                    </button>
                  </div>
                </div>
                <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                  <h3 className="mb-4">Password Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Old password</label>
                        <input type="password" className="form-control" name="oldPassword" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>New password</label>
                        <input type="password" className="form-control" name="newPassword" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Confirm new password</label>
                        <input type="password" className="form-control" name="confirmPassword" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">
                      {role === 'user' ?
                      <a href="/" style={{
                        textDecoration: 'none',
                        color: 'black'
                      }}>Cancel</a>
                      :
                      role === 'vendor' ?
                        <a href="/VendorDash" style={{
                          textDecoration: 'none',
                          color: 'black'
                        }}>Cancel</a>
                        :
                        <a href="/Admin/Dashboard" style={{
                          textDecoration: 'none',
                          color: 'black'
                        }}>Cancel</a>
                    }</button>
                  </div>
                </div>

              </div>
              {diagStatus ? renderDialog() : null}
            </form>

          </div>

        </div>


      </section>
      {role === 'user' ?
        <Footer />
        :
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; OnliteShop.pk 2021</span>
            </div>
          </div>
        </footer>
      }
    </>
  );
}

export default EditProfile;