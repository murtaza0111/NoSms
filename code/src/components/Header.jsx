import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { POSTS } from "../data";
import { getPostsFromLocalStorage } from "../settings/utils/localStorage";
import { BASE_IMAGE_URL } from "../settings/api";
import c1 from "./../assets/images/carousel/c3.jpg";

const Header = ({ isActive }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      setPosts(await getPostsFromLocalStorage());
    })();
  }, []);

  return (
    <header>
      {isActive === "home" ? (
        <>
          <div className="card__details_carousel">
            {posts ? (
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="false"
              >
                <div className="carousel-indicators">
                  {posts.map((s, i) => {
                    return (
                      <button
                        key={i}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={i}
                        className={i === 0 ? "active" : ""}
                        aria-current={i === 0 ? "true" : ""}
                        aria-label={"Slide " + i}
                      ></button>
                    );
                  })}
                </div>
                <div className="carousel-inner">
                  {posts.map((s, i) => {
                    return (
                      <div
                        className={
                          i === 0 ? "carousel-item active" : "carousel-item"
                        }
                        key={i}
                      >
                        <img
                          src={BASE_IMAGE_URL + s.avatar}
                          className="d-block "
                          alt={s.title}
                          height={400}
                          width={1400}
                        />
                        <div className="carousel-caption d-none d-md-block">
                          <h5>{s.title}</h5>
                          <p>{s.description.substring(0, 30) + "..."}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            ) : (
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="false"
              >
                <div className="carousel-indicators">
                  {POSTS.map((s, i) => {
                    return (
                      <button
                        key={i}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={i}
                        className={i === 0 ? "active" : ""}
                        aria-current={i === 0 ? "true" : ""}
                        aria-label={"Slide " + i}
                      ></button>
                    );
                  })}
                </div>
                <div className="carousel-inner">
                  {POSTS.map((s, i) => {
                    return (
                      <div
                        className={
                          i === 0 ? "carousel-item active" : "carousel-item"
                        }
                        key={i}
                      >
                        <img
                          src={c1}
                          className="d-block "
                          alt={s.title}
                          height={400}
                          width={1400}
                        />
                        <div className="carousel-caption d-none d-md-block">
                          {/* <h5>{s.title}</h5>
                          <p>{s.description.substring(0,30)+"..."}</p> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            )}
          </div>
        </>
      ) : isActive === "detail" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "address-card"]} /> Detail
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon icon="fa-solid fa-house" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/about" className="active">
                <FontAwesomeIcon icon={["fas", "address-card"]} /> Detail
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "about" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "info"]} /> About
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon icon="fa-solid fa-house" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/about" className="active">
                <FontAwesomeIcon icon={["fas", "info"]} /> About
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "contact" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "phone"]} /> Contact
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon icon="fa-solid fa-house" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/contact" className="active">
                <FontAwesomeIcon icon={["fas", "phone"]} /> Contact
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "dashboard" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard" className="active">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "profile" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard" className="active">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/dashboard" className="active">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Profile
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "signin" ? (
        <>
          <h1>
            <FontAwesomeIcon icon="fa-solid fa-person-walking-arrow-right " />
            Signin
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon icon="fa-solid fa-house" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/signin" className="active ">
                <FontAwesomeIcon icon="fa-solid fa-person-walking-arrow-right " />
                Signin
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "signup" ? (
        <>
          <h1>
            <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Signup
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon icon="fa-solid fa-house" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/signup" className="active">
                <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Signup
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "people" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "users"]} /> Connect
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon icon="fa-solid fa-house" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/pmyk" className="active">
                <FontAwesomeIcon icon={["fas", "users"]} /> Connect
              </Link>
            </li>
          </ol>
        </>
      ) : null}
    </header>
  );
};

export default Header;
