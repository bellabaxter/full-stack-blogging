import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";


export default function Home() {
  const [posts , setPosts] = useState([])

  const cat = useLocation().search;

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        //const res=await axios.get(`https://full-stack-blogging.onrender.com/api/posts${cat}`)
        const res=await axios.get(`http://localhost:8000/api/posts${cat}`);
        setPosts(res.data)
      } catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.slice(0, 400) + "...";
  };
  

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../uploads/${post?.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.content)}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
