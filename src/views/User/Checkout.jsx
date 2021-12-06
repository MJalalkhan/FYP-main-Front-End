import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CheckOutForm = (props) => {
    const [product, setProduct] = useState([]);
    const history = useHistory();

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

    const CheckOut = (event) => {
        console.log('event', event.target);
        event.preventDefault();
        const { firstName,
            lastName,
            userName,
            email,
            address,
            mobile,
            country,
            province,
            totalBill,
            zip } = event.target.elements;
        const obj = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            email: email.value,
            address: address.value,
            mobile: mobile.value,
            country: country.value,
            province: province.value,
            zip: zip.value,
            // totalBill: totalBill.value

        };
        console.log(obj);

        postData('http://localhost:3000/api/auth/checkout', obj).then((response) => {
            if (response.status === 200) {
                history.push('/')
                console.log("Response message", response.message);
            }

        });

    };
    React.useEffect(() => {
        fetch(`http://localhost:3000/api/auth/displayAllItems`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
            .then(res => res.json())
            .then((response) => {
                setProduct(response.response);
            })
            .catch((err) => { console.log("Error", err) });
    }, [])
    return (
        <>
            <Header {...props} />
            <section>
                <div className="container mb-5" get>
                    <div className="py-5 text-center">
                        <h2>Checkout form</h2>
                    </div>
                    <div className="row">
                        <h4 className="mb-3">Payment</h4>

                        <aside className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <dl className="dlist-align">
                                        <dt>Total price:</dt>
                                        <dd className="text-right" name="totalBill">Rs{product.map(x => x.price).reduce((a, b) => { if (!a) a = 0; if (!b) b = 0; a = parseFloat(a); b = parseFloat(b); return a + b; }, 0)}</dd>
                                    </dl>
                                   
                                    <dl className="dlist-align">
                                        <dt>Total:</dt>
                                        <dd className="text-right  h5"><strong>Rs{product.map(x => x.price).reduce((a, b) => { if (!a) a = 0; if (!b) b = 0; a = parseFloat(a); b = parseFloat(b); return a + b; }, 0)}</strong></dd>
                                    </dl>
                                    <hr />
                                    <p className="text-center mb-3">
                                        <img src="assets/images/misc/payments.png" height="26" />
                                    </p>

                                </div>
                            </div>

                        </aside>

                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing Address</h4>
                            <hr className="mb-4" />
                            <form className="needs-validation" noValidate="" onSubmit={CheckOut}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label for="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" name="firstName" placeholder="" required />
                                        <div className="invalid-feedback"> Valid first name is required. </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" name="lastName" placeholder="" required />
                                        <div className="invalid-feedback"> Valid last name is required. </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label for="username" >Username</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">@</span>
                                            </div>
                                            <input type="text" className="form-control" id="username" name="userName" placeholder="Username" required />
                                            <div className="invalid-feedback" style={{ width: '100%' }}> Your username is required. </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="mobile">ContacNo.</label>
                                        <input type="text" className="form-control" id="mobile" name="mobile" placeholder="ContactNo" required />
                                        <div className="invalid-feedback"> Valid last name is required. </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label for="email">Email </label>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="you@example.com" required />
                                    <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
                                </div>
                                <div className="mb-3">
                                    <label for="address">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" required />
                                    <div className="invalid-feedback"> Please enter your shipping address. </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label for="country">Country</label>
                                        <select className="custom-select d-block w-100" id="country" name="country" required>
                                            <option value="">Choose...</option>
                                            <option>United States</option>
                                        </select>
                                        <div className="invalid-feedback"> Please select a valid country. </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label for="province">State/Province</label>
                                        <select className="custom-select d-block w-100" id="province" name="province" required>
                                            <option value="">Choose...</option>
                                            <option>California</option>
                                        </select>
                                        <div className="invalid-feedback"> Please provide a valid state. </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label for="zip">Zip</label>
                                        <input type="text" className="form-control" id="zip" name="zip" placeholder="" required="" />
                                        <div className="invalid-feedback"> Zip code required. </div>
                                    </div>
                                </div>
                                {/* <div className="row">{product.map(x=>x.price).reduce((a,b)=>{if(!a)a=0;if(!b)b=0; a=parseFloat(a);b=parseFloat(b);return a+b;},0)}</div> */}
                                {/* <hr className="mb-4" /> */}
                                <button className="btn btn-primary btn-lg btn-block" type="submit" >CHECKOUT</button>
                            </form>
                        </div>
                    </div>


                </div>
            </section>
            <Footer />
        </>
    );
}

export default CheckOutForm;