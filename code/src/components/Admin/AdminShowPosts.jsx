import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Link,
  // , useNavigate
} from "react-router-dom";
// import axios from "axios";
const AdminShowPosts = ({ data }) => {
  //   const navigate = useNavigate();

  async function deleteGame(id) {
    // const response = await axios.delete(GAMES_API + id);
    // navigate("/", { replace: true });
  }

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.title}</td>
      <td>{data.category}</td>
      <td>
        {Object.keys(data).length > 0 && data != null ? (
          <img
            src={"https://bits-bolts.000webhostapp.com/uploads/" + data.avatar}
            alt={data.title}
            width="50"
            height="50"
          />
        ) : (
          <img
            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            alt={data.title}
            width="50"
            height="50"
          />
        )}
      </td>
      <td>{data.date}</td>
      <td>{data.description}</td>
      <td>
        <Link to={"/dashboard/e-post/" + data.id}>
          <FontAwesomeIcon icon={["fas", "pencil"]} />
        </Link>
      </td>
      <td>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteGame(data.id);
          }}
        >
          <FontAwesomeIcon icon={["fas", "close"]} />
        </button>
      </td>
    </tr>
  );
};

export default AdminShowPosts;
