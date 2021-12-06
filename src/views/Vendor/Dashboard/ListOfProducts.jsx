import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as React from 'react';
import AccountMenu from '../../../AccountSettingMenu';

const ListOfProducts = (props) => {
    const [product, setProduct] = useState([]);
    const [deleteProductState, setDeleteProductState] = useState([]);

    
    const history = useHistory();
    function deleteProduct(id) {
        console.log("Event", id);
        fetch(`http://localhost:3000/api/auth/deleteProduct/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            body: null
        })
            .then(res => res.json())
            .then((response) => {
                setDeleteProductState(response)
                console.log('res', response);
            })
            .catch((err) => { console.log(err) });
        // history.push(`/Order?id=${event.productID}`);
    }

    React.useEffect(() => {
        fetch(`http://localhost:3000/api/auth/getStoreProducts`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            body: null
        })
            .then(res => res.json())
            .then((response) => {
                setProduct(response)

                console.log('res', response);
            })
            .catch((err) => { console.log(err) });


    }, [deleteProductState])
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



                    <div className="container-fluid p-3 table-responsive">
                        <h3>List Of Products :</h3>
                        <table id="example" className="table table-striped" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Product Image</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Actions(Enable/Disable)</th>
                                </tr>
                            </thead>
                            <tbody>
                            {  
                            //  product==null|| product==[]?
                            //     <div><h3>No Product Added to store</h3></div>
                            //     :
                                 product.map((x, index) => {
                                 return <tr key={index}>
                                            <td>{x._id}</td>
                                            <td>{x.productName}</td>
                                            <td>                                                                        
                                                <div className="mx-3"> <img src={x.productImage} alt="img" className="rounded-circle" width="30" height="30" /> </div>
                                            </td>
                                            <td>Active</td>
                                            <td>{x.price}</td>
                                            <td>
                                                <td  className="p-0">
                                                    <div style={{ display: "-webkit-inline-box" }}>
                                                        <button type="button" className="btn btn-danger ml-1 mr-1" onClick={() => deleteProduct( x._id)}><i className="far fa-trash-alt"></i></button>
                                                        <div className="form-check form-switch ml-1">
                                                            <input className="form-check-input mt-2 " type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                                        </div>  
                                                    </div>
                                                </td>
                                            </td>
                                        </tr>
                                 })
                                }
                            </tbody>
                        </table>


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

export default ListOfProducts;