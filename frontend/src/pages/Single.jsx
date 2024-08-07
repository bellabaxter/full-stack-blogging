import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

export default function Single() {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser,authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://full-stack-blogging.onrender.com/api/posts/${postId}`);
        // const res = await axios.get(
        //   `http://localhost:8000/api/posts/${postId}`
        // );
        setPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      //const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await axios.delete(`https://full-stack-blogging.onrender.com/api/posts/${postId}` ,config);
     // await axios.delete(`http://localhost:8000/api/posts/${postId}`,config);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`frontend/dist/uploads/${post?.postimg}`} alt="" />
        <div className="user">
          {post.userimg && <img src={post.userimg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>{" "}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}
