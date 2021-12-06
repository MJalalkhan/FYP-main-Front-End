import React, { useState } from "react";
import { useHistory } from "react-router";
import AccountMenu from "../../AccountSettingMenu";
import CustomSnackBar from "../../views/snackbar";

const Header = (props,{ cartItemCount, getCartCount }) => {
  const token = sessionStorage.getItem("token");
  const [isAuth, setAuth] = useState(!(token == null || token == ""))
  const history= useHistory()
  const [diagStatus, setDiagStatus] = useState(false);
  const [msg, setMsg] = useState('');

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
    event.view.sessionStorage.removeItem("token")
    if (event.view.sessionStorage.token == undefined) {
      setAuth(false)
      console.log('Logout done');
      history.push("/");
    }
    setDiagStatus(true);
    setMsg('LoggedOut Successfully');

  };

  const renderDialog = () => {
    return <CustomSnackBar message={msg} handleClose={handleClose} open={handleOpen} />;
  };
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-4">
              <a href="/" className="brand-wrap" style={{ fontSize: "22px", textDecoration: "none" }}>
                <b>OnliteShop.pk</b>
              </a>
            </div>
            <div className="col-lg-6 col-sm-12">
              <form action="#" className="search">
                <div className="input-group w-100">
                  <input type="text" className="form-control" placeholder="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="widgets-wrap float-md-right p-20 float-right">
                {isAuth && <div className="widget-header  mr-3">
                  <a href="/cart" className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart"></i></a>
                  <span className="badge badge-pill badge-danger notify">{cartItemCount}</span>
                </div>}
                <div className="widget-header icontext">

                  {!isAuth ?
                    <>
                      <div className="text">
                        <span className="text-muted">Welcome!</span>
                        <div>
                          <a href="/UserSignIn">Sign in</a> |
                          <a href="/UserSignUp"> Register</a>
                        </div>
                      </div>
                    </>
                    :

                    <div>
                      <AccountMenu logout={handleLogout}/>
                    </div>}

                </div>
              </div>
            </div>
          </div>
        </div>
        {diagStatus ? renderDialog() : null}
      </section>


      <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="main_nav">
            <ul className="navbar-nav ">
              <li className="nav-item dropdown">
                <a className="nav-link" href="#">ALL PRODUCTS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#">WOMEN FASHION</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">SPORTS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">BABIES &amp; KIDS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">ELECTRONICS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">MENS FASHION</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">HOME APPLIANCES</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">STATIONARY</a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>

    </header>
  );
}

export default Header;
