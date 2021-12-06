import * as react from "react";
// import queryString from 'query-string';
import Header from "../Header/header";
import Footer from "../Footer/footer";

export class Cart extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
    this.getData();
    //this.deleteFromCart();
  }

  getData() {
    fetch(`http://localhost:3000/api/auth/displayAllItems`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: null,
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({ product: response.response });
        console.log("res", response.response, response.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteFromCart(event){
      console.log('hhhh',event._id);
    
      fetch(`http://localhost:3000/api/auth/DeleteFromCart/`+event._id  , {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify(event)
      })
          .then(res => res.json())
          .then((response) => {
              // if(!localStorage.token){
              //     history.pushState('./userSignIn')
              // }
             this.getData()
              console.log(event);
          })
          .catch((err) => { console.log(err) });
  }

  render = () => (
    <div className="App">
      <Header {...this.props} />
      {/* HEADER */}
      <section className="section-pagetop bg">
        <div className="container">
          <h2 className="title-page">Shopping cart</h2>
        </div>
      </section>

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width="120">
                        Quantity
                      </th>
                      <th scope="col" width="120">
                        Price
                      </th>
                      <th scope="col" className="text-right" width="200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.product &&
                      this.state.product.map((x, index) => {
                        if (!x.productID) return null;
                        return (
                          <tr key={index}>
                            <td>
                              {/* {console.log("here"+index,this.state.product[index])} */}
                              <figure className="itemside">
                                <div className="aside">
                                  <img
                                    src={this.state.product[index].productImage}
                                    className="img-sm"
                                  />
                                </div>
                                <figcaption className="info">
                                  <a href="#" className="title text-dark">
                                    {this.state.product[index].productName}
                                  </a>
                                  <p className="text-muted small">
                                    Size: XL, Color: blue, <br /> Brand: Gucci
                                  </p>
                                </figcaption>
                              </figure>
                            </td>
                            <td>
                              <select
                                className="form-control"
                                name="productQuantity"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </td>
                            <td>
                              <div className="price-wrap">
                                <var className="price">
                                  {this.state.product.price}
                                </var>
                                <small className="text-muted">
                                  {" "}
                                  {this.state.product[index].price} / item
                                </small>
                              </div>
                            </td>
                            <td>                                
                              <button type="button" class="btn btn-info" onClick={() => this.deleteFromCart({ productID: x._id, ...x })}>Remove</button>
                            </td>
                            
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <div className="card-body border-top">
                  <a  href={(this.state.product.length<1)?"#":"/CheckOut"}
                
                    className="btn btn-primary float-md-right"
                  >
                    {" "}
                    Make Purchase <i className="fa fa-chevron-right" ></i>{" "}
                  </a>
                  <a href="/" className="btn btn-light">
                    {" "}
                    <i className="fa fa-chevron-left"></i> Continue shopping{" "}
                  </a>
                </div>
              </div>  

              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Free
                  Delivery within 1-2 weeks
                </p>
              </div>
            </main>

            <aside className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total price:</dt>
                    <dd className="text-right">
                      Rs
                      {this.state.product
                        .map((x) => x.price)
                        .reduce((a, b) => {
                          if (!a) a = 0;
                          if (!b) b = 0;
                          a = parseFloat(a);
                          b = parseFloat(b);
                          return a + b;
                        }, 0)}
                    </dd>
                  </dl>
                  {/* <dl className="dlist-align">
                              <dt>Discount:</dt>
                              <dd className="text-right">Rs 15000</dd>
                              </dl> */}
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right  h5">
                      <strong>
                        Rs
                        {this.state.product
                          .map((x) => x.price)
                          .reduce((a, b) => {
                            if (!a) a = 0;
                            if (!b) b = 0;
                            a = parseFloat(a);
                            b = parseFloat(b);
                            return a + b;
                          }, 0)}
                      </strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="assets/images/misc/payments.png" height="26" />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-name bg padding-y">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
          We will gladly accept any unworn, unwashed merchandise with original tags within 30 Days of purchase for a refund or an exchange. Please return goods with a copy of the invoice and mention the reason for returning the items.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
export default Cart;
