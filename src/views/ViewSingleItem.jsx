// import './App.css';
import * as react from 'react';
import queryString from 'query-string';
// import { useState } from 'react';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';

export class SingleItem extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        // const[data,setData]=useState('')

        fetch(`http://localhost:3000/api/auth/getSingleProduct/${productId}`, {
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
                this.setState({ product: response.response })
                // }
                console.log('res', response);
            })
            .catch((err) => { console.log(err) });

    }


    render = () => (
        <div className="App">
            <Header {...this.props} />
            <section className="section-content padding-y bg">
                <div className="container">
                    {this.state.product && (<div>
                        <article className="card">
                            <div className="card-body">
                                <div className="row">
                                    <aside className="col-md-6">
                                        <article className="gallery-wrap">
                                            <div className="card img-big-wrap">
                                                <a href="#"> <img src={this.state.product.productImage} /></a>
                                            </div>
                                            {/* <div className="thumbs-wrap">
                                          <a href="#" className="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                          <a href="#" className="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                          <a href="#" className="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                          <a href="#" className="item-thumb"> <img src="assets/images/items/3.jpg" /></a>
                                      </div> */}
                                        </article>
                                    </aside>
                                    <main className="col-md-6">
                                        <article>
                                            <a href="#" className="text-primary btn-link">Clothes</a>
                                            <h3 className="title">{this.state.product.productName}</h3>
                                            <div>
                                                <ul className="rating-stars">
                                                    <li className="stars-active">
                                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>

                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </li>
                                                </ul>
                                                <span className="label-rating mr-3 text-muted">7/10</span>

                                            </div>

                                            <hr />

                                            <div className="mb-3">
                                                <h6>Short description</h6>
                                                <ul className="list-dots mb-0">
                                                    <li>Made in Russia</li>
                                                    <li>Wolf leather </li>
                                                    <li>Rubber material bottom</li>
                                                    <li>Dark blue color</li>
                                                </ul>
                                            </div>

                                            <div className="form-group">
                                                <label className="text-muted">Available sizes</label>
                                                <div>
                                                    <label className="js-check btn btn-check active mr-1">
                                                        <input type="radio" name="option_size" value="option1" checked="" />
                                                        <span>Small</span>
                                                    </label>
                                                    <label className="js-check btn btn-check mr-1">
                                                        <input type="radio" name="option_size" value="option1" />
                                                        <span>Medium</span>
                                                    </label>
                                                    <label className="js-check btn btn-check mr-1">
                                                        <input type="radio" name="option_size" value="option1" />
                                                        <span>Large</span>
                                                    </label>

                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <var className="price h4">{this.state.product.product}</var> <br />
                                            </div>

                                            <div className="mb-4">
                                                <a href="#" className="btn btn-primary mr-1">Add to card</a>
                                            </div>

                                        </article>
                                    </main>
                                </div>
                            </div>
                        </article>
                        <article className="card mt-5">
                            <div className="card-body">

                                <hr />
                                <p>
                                    {this.state.product?.productDescription}
                                </p>
                            </div>
                        </article>
                    </div>
                    )}
                    {(!this.state.product) && <div>Loading...</div>}
                </div>


            </section>
            <Footer />
        </div>
    );

}
export default SingleItem;