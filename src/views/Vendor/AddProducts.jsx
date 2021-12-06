import React from 'react';
import { useState } from 'react';
//Bootstrap4.5
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomSnackBar from '../snackbar';
import AccountMenu from '../../AccountSettingMenu';
const AddProduct = (props) => {
  const token = sessionStorage.getItem("token");
  // const [isAuth, setAuth] = useState(!(token == null || token == ""))
  const [diagStatus, setDiagStatus] = useState(false);
  const [msg, setMsg] = useState('');

  const [imageData, setImageData] = useState("");


  const handleOpen = () => {
    setDiagStatus(true);
  };

  const handleClose = () => {
    setDiagStatus(false);
  };

  async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`

      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }



  const convertImage = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.addEventListener(
      'load',
      () => {
        if (reader.result)
          setImageData(reader.result);
      },
      false
    );

    reader.readAsDataURL(file);

  }
  const Add = (event) => {
    event.preventDefault();
    console.log('here', event.target);
    const { productName, price, stock, productDescription } = event.target.elements;
    const obj = {
      productName: productName.value,
      productImage: imageData,
      price: price.value,
      stock: stock.value,
      // storeId: storeId.value,
      productDescription: productDescription.value
    };

    postData('http://localhost:3000/api/auth/AddProduct', obj).then((response) => {
      if (response.status === 200) {
        setDiagStatus(true);
        setMsg(`${response.message}`);
        console.log(response.message, "product added");
      }
      // return response;
    });
  }
  const renderDialog = () => {
    return <CustomSnackBar message={msg} handleClose={handleClose} open={handleOpen} />;
  };


  return (

    <div id="wrapper">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/VendorDash">
          <div className="sidebar-brand-text mx-3">OnliteShop Vendor</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <a className="nav-link" href="/VendorDash">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </a>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item ">
          <a className="nav-link" href="/ListOfOrders">
            {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-card-list"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </svg>
            <span>Orders</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="/AddProduct" aria-expanded="true" aria-controls="collapseTwo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart4"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
            <span>Add Products</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="/ListOfProducts" aria-expanded="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-card-list"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </svg>
            <span>List Of Products</span>
          </a>
        </li>

        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
      </ul>

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars" />
            </button>

            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>

            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block" />
              <div className="widget-header icontext">
                <div>
                  <AccountMenu logout={props.handleLogout} />
                </div>

              </div>
            </ul>
          </nav>

          <div className="container-fluid">
            <div className="MainDiv">

              <div className="container main-container">
                <form onSubmit={Add} className="mt-5 mb-5">
                  <div className="row">
                    {/* <div className="col-lg-12"> */}
                    <h2 className="text-center mt-2 mb-2">OnliteShop.pk - Add Product</h2>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" className="form-control" name="productName" id="productname" placeholder="Enter Product Name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Product Price(Rs)</label>
                        <input type="text" className="form-control" name="price" id="price" placeholder="Product Price" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Stock</label>
                        <input type="text" className="form-control" name="stock" id="stock" placeholder="Product Quantity" />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>Store Id</label>
                        <input type="text" className="form-control" name="storeId" id="storeId" placeholder="StoreId" />
                      </div>
                    </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="image">Product Image:</label>
                        <input onChange={(e) => convertImage(e)} type="file" className="form-control" name="productImage" id="image" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="comment">Product Description:</label>
                        <textarea className="form-control" name="productDescription" rows="5" id="productdesc" ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                    

                  </div>
                  {diagStatus ? renderDialog() : null}
                </form>
              </div>


            </div>
          </div>
        </div>

        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; OnliteShop.pk 2021</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AddProduct;
