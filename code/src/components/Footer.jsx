import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

const Footer = ({ isSticky }) => {
  // const { height, width } = useWindowDimensions();
  library.add(fab);
  return (
    <footer
      className="footer sticky-bottom  text-center text-lg-start text-white"
    >
      <div className="container p-4 pb-0">
        <section className="">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h2 className="text-uppercase">NoSms</h2>

              <p>
                NoSms stands for Noroff Social media Site. It's an online social
                media platform for users to register themselves and interact
                with other studednts from Noroff.
              </p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0"></div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Primary</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="/" className="text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Register/Login</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="/signin" className="text-white">
                    Signin
                  </a>
                </li>
                <li>
                  <Link to="/signup" className="text-white">
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="mb-4" />

        <section className="">
          <p className="d-flex justify-content-center align-items-center">
            <span className="me-3">Register for free</span>
            <Link
              type="button"
              className="btn btn-outline-light btn-rounded"
              to="/signup"
            >
              Sign up!
            </Link>
          </p>
        </section>

        <hr className="mb-4" />
        <section className="mb-4 text-center">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon="fa-brands fa-facebook" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon="fa-brands fa-twitter" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon="fa-brands fa-instagram" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            {" "}
            <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />
          </a>
        </section>
      </div>

      <div className="text-center p-3">
        © 2022 Copyright :
        <Link className="text-white" to="/">
          nosms@email.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
