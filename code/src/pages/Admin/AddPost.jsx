import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminNav from "../../components/Admin/AdminNav";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { CATEGORIES } from "../../data";
import {
  addPostsToLocalStorage,
  getLoginCredentialsFromLocalStorage,
  getPostsFromLocalStorage,
} from "../../settings/utils/localStorage";
import { checkToken } from "../../settings/utils/CheckSession";
import { messageDialogue } from "../../settings/utils/message";
import {
  validateImage,
  validatePostsFormCredentials,
} from "../../settings/utils/validation";
import { UPLOAD_IMAGES } from "../../settings/api";

const AddPost = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        navigate("/dashboard/a-post", { replace: true });
      }
    })();
  }, [navigate]);

  const [data, setData] = useState({
    id: null,
    authorId: null,
    category: null,
    title: "",
    description: "",
    date: "",
    avatar: null,
  });

  const handleChange = async (e) => {
    e.preventDefault();
    const field = e.target.name;
    const value = e.target.value;

    switch (field) {
      case "title": {
        if (value.length > 2) {
          setData({ ...data, title: value });
          messageDialogue(".titleMsg", "none", "green", "Title is valid");
        } else {
          setData({ ...data, title: "" });
          messageDialogue(
            ".titleMsg",
            "block",
            "red",
            "Please enter valid Title"
          );
          break;
        }
        break;
      }
      case "category": {
        if (value != null) {
          setData({ ...data, category: value });
          messageDialogue(".categoryMsg", "none", "green", "Category is valid");
        } else {
          setData({ ...data, category: null });
          messageDialogue(
            ".categoryMsg",
            "block",
            "red",
            "Please select category"
          );
        }
        break;
      }
      case "description": {
        if (value.length > 2) {
          setData({ ...data, description: value });
          messageDialogue(
            ".descriptionMsg",
            "none",
            "green",
            "Description is valid"
          );
        } else {
          setData({ ...data, description: "" });
          messageDialogue(
            ".descriptionMsg",
            "block",
            "red",
            "Please enter valid Description"
          );
        }
        break;
      }
      case "date": {
        if (value.length > 2) {
          setData({ ...data, date: value });
          messageDialogue(".dateMsg", "none", "green", "Date is valid");
        } else {
          setData({ ...data, date: "" });
          messageDialogue(
            ".dateMsg",
            "block",
            "red",
            "Please enter valid Date"
          );
        }
        break;
      }
      case "postImage":
        {
          const { files } = e.target;
          if (files != null) {
            const file = files[0];
            if (validateImage(file)) {
              setData({ ...data, avatar: file });
            } else {
              setData({ ...data, avatar: "" });
              messageDialogue(
                ".postImageMsg",
                "block",
                "red",
                "Please select valid post image."
              );
            }
          } else {
            setData({ ...data, avatar: "" });
            messageDialogue(
              ".postImageMsg",
              "block",
              "red",
              "Please select valid post image."
            );
          }
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePostsFormCredentials(data)) {
      messageDialogue(
        ".formMsg",
        "block",
        "red",
        "All (*) fields are required"
      );
    } else {
      messageDialogue(".formMsg", "block", "green", "...adding");

      const getPosts = await getPostsFromLocalStorage();
      const author = await getLoginCredentialsFromLocalStorage();

      if (getPosts == null || getPosts.length <= 0) {
        const posts = [];
        const post = {
          ...data,
          id: 1,
          authorId: author.user,
          avatar: data.avatar.name,
        };
        posts.push(post);
        addPostsToLocalStorage(posts);

        messageDialogue(
          ".formMsg",
          "block",
          "green",
          "Post Added Successfully"
        );
        await uploadImage();
      } else if (getPosts.length > 0) {
        const found = getPosts.some(
          (post) =>
            post.title === data.title && post.description === data.description
        );
        if (found) {
          messageDialogue(".formMsg", "block", "red", "Post Already Exists");
        } else {
          const posts = getPosts;
          const post = {
            ...data,
            id: posts.length + 1,
            authorId: author.user,
            avatar: data.avatar.name,
          };
          posts.push(post);
          addPostsToLocalStorage(posts);
          await uploadImage();

          setData({
            id: null,
            authorId: null,
            category: null,
            title: "",
            description: "",
            date: "",
            avatar: null,
          });

          messageDialogue(
            ".formMsg",
            "block",
            "green",
            "Post Added Successfully"
          );
        }
      }
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("avatar", data.avatar, data.avatar.name);

      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      await axios.post(UPLOAD_IMAGES, formData);
    } catch (e) {}
  };

  return (
    <>
      <Nav isActive={"dashboard"} />
      <AdminHeader isActive={"a-post"} />
      <main className="dashboard">
        <aside className="dashboard__sidebar">
          <AdminNav isActive={"a-post"} />
        </aside>
        <section className="dashboard__main">
          <form
            onSubmit={handleSubmit}
            noValidate
            encType="multipart/form-data"
            className="signup__section__form"
          >
            <span className="formMsg"></span>

            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <input
                  placeholder="Title"
                  type="text"
                  className="form-control title"
                  name="title"
                  aria-describedby="titleHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text titleMsg"></div>
              </div>
            </div>

            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <input
                  placeholder="Date"
                  type="date"
                  className="form-control date"
                  name="date"
                  aria-describedby="dateHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text dateMsg"></div>
              </div>
            </div>
            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <select
                  className="form-control category"
                  name="category"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                >
                  <option value={null}>--Select Category--</option>
                  {CATEGORIES.map((category, index) => {
                    return (
                      <option
                        key={index}
                        value={category.id}
                        className="form-control"
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                <div className="form-text categoryMsg"></div>
              </div>
            </div>

            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <textarea
                  placeholder="Description"
                  type="text"
                  className="form-control description"
                  name="description"
                  aria-describedby="descriptionHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                ></textarea>
                <div className="form-text descriptionMsg"></div>
              </div>
            </div>
            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <input
                  placeholder="Post Image"
                  type="file"
                  className="form-control postImage"
                  name="postImage"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text postImageMsg"></div>
              </div>
            </div>

            <button type="submit" className="signup__section__form--button">
              Add Post
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
};
export default AddPost;
