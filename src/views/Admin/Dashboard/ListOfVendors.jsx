// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as React from 'react';
import AccountMenu from '../../../AccountSettingMenu';

const ListOfVendors = (props) => {
    const [product, setProduct] = useState([]);
    const [disable, setDisable] = useState([]);
    const [deleteSellerState, setDeleteSellerState] = useState([]);


    // const history = useHistory();
    function getData(event) {
        console.log("Event", event.productID);
        // history.push(`/order?id=${event.productID}`);
    }
    function deleteSeller(event) {
        console.log("Event", event.sellerID);
        fetch(`http://localhost:3000/api/auth/deleteSeller/${event.sellerID}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            body: null
        })
            .then(res => res.json())
            .then((response) => {
                setDeleteSellerState(response)

                console.log('res', response);
            })
            .catch((err) => { console.log(err) });
        // history.push(`/Order?id=${event.productID}`);
    }
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

    function updateSeller(id, isDisable) {
        setDisable(isDisable)
		const obj = {
			isDisable: isDisable,
		};
		postData(`http://localhost:3000/api/auth/updateSellerStatus/${id}`, obj).then((response) => {
			if (response.status === 200) {
				// setDiagStatus(true);
				// setMsg(`${response.message}`);
				console.log(response.message, "product added");
			}
			// return response;
		});

	}

    React.useEffect(() => {
        fetch(`http://localhost:3000/api/auth/displayAllSellers`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            body: null
        })
            .then(res => res.json())
            .then((response) => {
                setProduct(response.response)

                console.log('res', response.response);
            })
            .catch((err) => { console.log(err) });

    }, [deleteSellerState])

    return (

        <div id="wrapper">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/Admin/Dashboard">
                    <div className="sidebar-brand-text mx-3">OnliteShop Admin</div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a className="nav-link" href="/Admin/Dashboard">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span>
                    </a>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item ">
                    <a className="nav-link" href="/ListOfVendors">
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
                        <span>List Of Vendors</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="/ListofUsers" aria-expanded="true" aria-controls="collapseTwo">
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
                        <span>List Of Users</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="/ListOfAdmins" aria-expanded="true">
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
                        <span>List Of Admins</span>
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

                    <div className="container-fluid p-3">
                        <h3>List Of Vendors :</h3>
                        <div class="">
                            <div class="row">
                                <div class="col-12 table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">id</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">StoreName</th>
                                                <th scope="col">Actions(Enable/Disable)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product.map((x, index) => {
                                                    return <tr key={index}>
                                                        <th scope="row">{x._id}</th>
                                                        <td>{x.email}</td>
                                                        <td>{x.storeName}</td>
                                                        <td>
                                                            <div style={{ display: "-webkit-inline-box" }}>
                                                                <button type="button" class="btn btn-primary ml-1 mr-1" ><i class="far fa-eye"></i></button>
                                                                <button type="button" class="btn btn-danger ml-1 mr-1" onClick={() => deleteSeller({ sellerID: x._id, ...x })}><i class="far fa-trash-alt"></i></button>
                                                                <div class="form-check form-switch ml-1">
                                                                <input class="form-check-input mt-2" checked={x.disable} onClick={(e) => updateSeller(x._id, e.target.checked)} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                                                </div>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
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

export default ListOfVendors;