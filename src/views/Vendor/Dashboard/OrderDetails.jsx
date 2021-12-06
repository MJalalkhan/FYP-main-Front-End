import { useEffect } from "react";
import { useState } from "react";
import AccountMenu from "../../../AccountSettingMenu";
// import './order.css'

export default function OrderDetails(props) {
    const [order, setOrder] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/api/auth/displaySingleCustomer/${new URLSearchParams(window.location.search).get('id')}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            body: null
        })
            .then(res => res.json())
            .then((response) => {

                setOrder(response.response)

                console.log('res', response.response);
            })
            .catch((err) => { console.log(err) });
    }, []);

    return (
        <div id="wrapper">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " id="accordionSidebar">
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
                            className="bi bi-cart3"
                            viewBox="0 0 16 16"
                        >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
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

                    <div className="container-fluid overflow-auto">
                        <div className="">
                            {order != null && <div>{
                                <div className="conatainer p-2">
                                    <div className="col-12">

                                        <div className="d-flex flex-column justify-content-center align-items-center" id="order-heading">
                                            <div className="text-uppercase">
                                                <p>Order detail</p>
                                            </div>
                                            <div className="h4">{order.date}</div>
                                            <div className="pt-1">
                                                <p>OrderId #{order._id, order.productList} is currently<b className="text-dark"> processing</b></p>
                                            </div>
                                        </div>
                                        <div className="wrapper bg-white">
                                            <div className="table-responsive">
                                                <table className="table table-borderless">
                                                    <thead>
                                                        <tr className="text-uppercase text-muted">
                                                            <th scope="col">product Order Details</th>
                                                            {/* <th scope="col" className="text-right">total</th> */}
                                                        </tr>
                                                    </thead>

                                                </table>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ProductId</th>
                                                            <th scope="col">Product Name</th>

                                                            <th scope="col">Price</th>
                                                            <th scope="col">Image</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            order.productlist.map((x, index) => {
                                                                return <tr key={index}>
                                                                    <th scope="row">{x._id}</th>
                                                                    <td>{x.productName}</td>
                                                                    <td>{x.price}</td>
                                                                    <td>
                                                                        <div className="mx-3"> <img src={x.productImage} alt="apple" className="rounded-circle" width="30" height="30" /> </div>
                                                                    </td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>


                                            <div className="pt-2 border-bottom mb-3"></div>
                                            <div className="d-flex justify-content-start align-items-center pl-3">
                                                <div className="text-muted">Payment Method</div>
                                                <div className="ml-auto"> <img src="https:www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png" alt="" width="30" height="30" /> <label>Cash on Delivery</label> </div>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center py-1 pl-3">
                                                <div className="text-muted">Shipping</div>
                                                <div className="ml-auto"> <label>Free</label> </div>
                                            </div>

                                            <div className="table-responsive">
                                                <table className="table table-borderless">
                                                    <thead>
                                                        <tr className="text-uppercase text-muted">
                                                            <th scope="col">Customer Details</th>
                                                            {/* <th scope="col" className="text-right">total</th> */}
                                                        </tr>
                                                    </thead>

                                                </table>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">

                                                    <tbody>
                                                        <tr>
                                                            <td scope="row">FirstName</td>
                                                            <td>{order.customer.firstName}</td>

                                                        </tr>
                                                        <tr>
                                                            <td scope="row">LastName</td>
                                                            <td>{order.customer.lastName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">UserName</td>
                                                            <td>{order.customer.userName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Email</td>
                                                            <td>{order.customer.email}</td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Address</td>
                                                            <td>{order.customer.address}</td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Contactno</td>
                                                            <td>{order.customer.mobile}</td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Country</td>
                                                            <td>{order.customer.country}</td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Province</td>
                                                            <td>{order.customer.province}</td>
                                                        </tr>
                                                        <tr>
                                                            <td scope="row">Zip</td>
                                                            <td>{order.customer.zip}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                            }</div>}

                            {order == null && <div></div>}
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
    )
}