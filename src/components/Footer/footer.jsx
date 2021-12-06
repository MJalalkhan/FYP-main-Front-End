import './footer.css'
const Footer = () => {
  return (
    <footer className="section-footer bg-dark text-white">
      <div className="container">
        <section className="footer-top padding-y-lg text-white">
          <div className="row">
            <aside className="col-md col-6">
              <h5 className="title text-white">Brands</h5>
              <ul className="list-unstyled">
                <li> <a href="#">Adidas</a></li>
                <li> <a href="#">Puma</a></li>

              </ul>
            </aside>
            <aside className="col-md col-6">
              <h5 className="title text-white">Company</h5>
              <ul className="list-unstyled">
                <li> <a href="#">About us</a></li>
                <li> <a href="#">Career</a></li>

              </ul>
            </aside>
            <aside className="col-md col-6">
              <h5 className="title text-white">Help</h5>
              <ul className="list-unstyled">
                <li> <a href="#">Contact us</a></li>
                <li> <a href="#">Money refund</a></li>

              </ul>
            </aside>
            <aside className="col-md col-6">
              <h5 className="title text-white">Account</h5>
              <ul className="list-unstyled">
                <li> <a href="#"> User Login </a></li>
                <li> <a href="#"> User register </a></li>

              </ul>
            </aside>
            <aside className="col-md">
              <h5 className="title text-white">Social</h5>
              <ul className="list-unstyled">
                <li><a href="#"> <i className="fab fa-facebook" /> Facebook </a></li>
                <li><a href="#"> <i className="fab fa-twitter" /> Twitter </a></li>
                <li><a href="#"> <i className="fab fa-instagram" /> Instagram </a></li>

              </ul>
            </aside>
          </div>
        </section>
        <hr className="mb-4" />
        <section className="footer-bottom text-center">
          <p>
            {" "}
            &copy; 2021 OnliteShop.pk, All rights reserved{" "}
          </p>
          <br />
        </section>
      </div>
    </footer>
  );
}

export default Footer;