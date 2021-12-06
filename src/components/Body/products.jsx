import * as React from 'react';
import { useState } from 'react';


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isAuth: (sessionStorage.getItem("token") != (null || undefined) && sessionStorage.getItem("token") != "") ? false : true
        }
        this.getData();
        this.AddToCart();
    }
    getData() {
        fetch('http://localhost:3000/api/auth/getAllProducts', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`

            },
            body: null
        })
            .then(res => res.json())
            .then((response) => {
                // if (response.status == 200) {
                this.setState({ products: response })
                // }
                // console.log(response);
            })
            .catch((err) => { console.log(err) });
    }

    AddToCart(event) {
        if (!event) { return }

        fetch('http://localhost:3000/api/auth/AddToCart', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`

            },

            body: JSON.stringify(event)

        })

            .then(res => res.json())
            .then((response) => {
                // if(!sessionStorage.token){
                //     history.pushState('./userSignIn')
                // }
                this.props.getCartCount();

                console.log(event);

            })
            .catch((err) => { console.log(err) });
    }


    render = () => (
        <section className="padding-bottom-sm">
            <div className="container">
                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">Products</h4>
                </header>
                <div className="row row-sm">
                    {this.state.products &&
                        this.state.products.map((x, index) => {
                            const url = "/ViewSingleItem?id=" + x._id;
                            return <div className="col-xl-2 col-lg-3 col-md-4 col-6" key={index}>
                                <figure className="card card-sm card-product-grid">
                                    <div className="img-wrap">
                                        <a href={url} class="img-wrap">
                                            <img src={x.productImage} />
                                        </a>
                                        <a className="btn-overlay" href={url}><i className="fa fa-search-plus"></i> Quick view</a>
                                    </div>
                                    <figcaption className="info-wrap">
                                        <a href={url} className="title text-decoration-none">{x.productName}</a>
                                        <div class="price">${x.price}</div>

                                        {!this.state.isAuth && <div className="text-center">
                                            <button type="button" class="btn btn-outline-primary btn-md w-100" type="submit" onClick={() => this.AddToCart({ productID: x._id,storeId:x.storeId, ...x })}>Add to Cart</button>
                                        </div>}
                                    </figcaption>
                                </figure>
                            </div>
                        })
                    }
                </div>


            </div>
        </section>
    );
}

export default Products;