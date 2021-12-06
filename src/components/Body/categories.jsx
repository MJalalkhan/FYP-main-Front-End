const Categories = () => {
  return (

    <section className="section-main bg padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <nav className="card">
              <ul className="menu-category">
                <li><a href="#">Best clothes</a></li>
                <li><a href="#">Automobiles</a></li>
                <li><a href="#">Home interior</a></li>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Technologies</a></li>
                <li><a href="#">Digital goods</a></li>
                <li><a href="#">Online goods</a></li>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Technologies</a></li>
              </ul>
            </nav>
          </aside>
          <div className="col-md-9">
            <div
              id="carousel1_indicator"
              className="slider-home-banner carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carousel1_indicator"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carousel1_indicator"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carousel1_indicator"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="assets/images/banners/slide1.jpg"
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="assets/images/banners/slide2.jpg"
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="assets/images/banners/slide3.jpg"
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carousel1_indicator"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carousel1_indicator"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;