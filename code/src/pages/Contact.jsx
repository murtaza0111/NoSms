import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { checkToken } from "../settings/utils/CheckSession";
import { messageDialogue } from "../settings/utils/message";
import {
  validateContactForm,
  validateEmail,
  validateName,
} from "../settings/utils/validation";

const Contact = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/contact")) {
      }
    })();
  }, [navigate]);

  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();
    const field = e.target.name;
    const value = e.target.value;

    switch (field) {
      case "name": {
        if (validateName(value, 2)) {
          setData({ ...data, name: value });
          messageDialogue(".nameMsg", "none", "green", "Name is valid");
        } else {
          setData({ ...data, name: "" });
          messageDialogue(
            ".nameMsg",
            "block",
            "red",
            "Please enter valid Name"
          );
          break;
        }
        break;
      }
      case "email": {
        if (validateEmail(value, 0)) {
          setData({ ...data, email: value });
          messageDialogue(".emailMsg", "none", "green", "Email is valid");
        } else {
          setData({ ...data, email: "" });
          messageDialogue(
            ".emailMsg",
            "block",
            "red",
            "Please enter valid email"
          );
        }
        break;
      }
      case "subject": {
        if (validateName(value, 2)) {
          setData({ ...data, subject: value });
          messageDialogue(
            ".subjectMsg",
            "none",
            "green",
            "Description is valid"
          );
        } else {
          setData({ ...data, subject: "" });
          messageDialogue(
            ".subjectMsg",
            "block",
            "red",
            "Please enter valid Subject"
          );
        }
        break;
      }
      case "message": {
        if (validateName(value, 25)) {
          setData({ ...data, message: value });
          messageDialogue(
            ".messageMsg",
            "none",
            "green",
            "Description is valid"
          );
        } else {
          setData({ ...data, message: "" });
          messageDialogue(
            ".messageMsg",
            "block",
            "red",
            "Please enter valid description"
          );
        }
        break;
      }

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm(data)) {
      messageDialogue(
        ".formMsg",
        "block",
        "red",
        "All (*) fields are required"
      );
    } else {
      messageDialogue(
        ".formMsg",
        "block",
        "green",
        "Form submitted successfuly"
      );
    }
  };

  return (
    <>
      <Nav isActive={"contact"} />
      <Header isActive={"contact"} />
      <main className="contact">
        <section className="contact__section">
          <form
            onSubmit={handleSubmit}
            noValidate
            encType="multipart/form-data"
            className="contact__section__form"
          >
            <span className="formMsg"></span>

            <div className="contact__section__form__group">
              <div className="contact__section__form__group__left">
                <input
                  placeholder="Name"
                  type="text"
                  className="form-control name"
                  name="name"
                  aria-describedby="nameHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text nameMsg"></div>
              </div>
            </div>

            <div className="contact__section__form__group">
              <div className="contact__section__form__group__left">
                <input
                  placeholder="Email"
                  type="email"
                  className="form-control email"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text emailMsg"></div>
              </div>
            </div>

            <div className="contact__section__form__group">
              <div className="contact__section__form__group__left">
                <input
                  placeholder="Subject"
                  type="text"
                  className="form-control subject"
                  name="subject"
                  aria-describedby="subjectHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text subjectMsg"></div>
              </div>
            </div>

            <div className="contact__section__form__group">
              <div className="contact__section__form__group__left">
                <textarea
                  placeholder="Message"
                  type="text"
                  className="form-control message"
                  name="message"
                  aria-describedby="messageHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                ></textarea>
                <div className="form-text messageMsg"></div>
              </div>
            </div>
            <button type="submit" className="contact__section__form--button">
              Send
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
