// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import moment from "moment";

// export default function Write() {
//   const state = useLocation().state;
//   const [value, setValue] = useState(state?.content || "");
//   const [title, setTitle] = useState(state?.title || "");
//   const [file, setFile] = useState(null);
//   const [cat, setCat] = useState(state?.cat || "");

//   const navigate = useNavigate();

//   const upload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       // const res = await axios.post("https://full-stack-blogging.onrender.com/api/upload", formData, {
//       //   withCredentials: true});
//       const res = await axios.post(
//         "http://localhost:8000/api/upload",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       return res.data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();

//     let imgUrl = await upload();

//     try {
//       state
//         ? //  ? await axios.put(`https://full-stack-blogging.onrender.com/api/posts/${state.id}`, {
//           await axios.put(
//             `http://localhost:8000/api/posts/${state.id}`,
//             {
//               title,
//               content: value,
//               cat,
//               img: imgUrl,
//             },
//             { withCredentials: true }
//           )
//         : // : await axios.post("https://full-stack-blogging.onrender.com/api/posts/", {
//           await axios.post(
//             "http://localhost:8000/api/posts/",
//             {
//               title,
//               content: value,
//               cat,
//               img: imgUrl,
//               date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//             },
//             { withCredentials: true }
//           );
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="add">
//       <div className="content">
//         <input
//           value={title}
//           type="text"
//           placeholder="Title"
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <div className="editorContainer">
//           <ReactQuill
//             className="editor"
//             theme="snow"
//             value={value}
//             onChange={setValue}
//           />
//         </div>
//       </div>
//       <div className="menu">
//         <div className="item">
//           <h1>Publish</h1>
//           <span>
//             <b>Status: </b> Draft
//           </span>
//           <span>
//             <b>Visibility: </b> Public
//           </span>
//           <input
//             style={{ display: "none" }}
//             type="file"
//             id="file"
//             name=""
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <label className="file" htmlFor="file">
//             Upload Image
//           </label>
//           <div className="buttons">
//             <button>Save as a draft</button>
//             <button onClick={handleClick}>Publish</button>
//           </div>
//         </div>
//         <div className="item">
//           <h1>Category</h1>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "art"}
//               name="cat"
//               value="art"
//               id="art"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="art">Art</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "science"}
//               name="cat"
//               value="science"
//               id="science"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="science">Science</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "technology"}
//               name="cat"
//               value="technology"
//               id="technology"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="technology">Technology</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "cinema"}
//               name="cat"
//               value="cinema"
//               id="cinema"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="cinema">Cinema</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "design"}
//               name="cat"
//               value="design"
//               id="design"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="design">Design</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "food"}
//               name="cat"
//               value="food"
//               id="food"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="food">Food</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Adjust the URL if needed, based on your deployment
      const res = await axios.post("http://localhost:8000/api/upload", formData, {
        withCredentials: true,
      });

      return res.data; // Assuming the backend returns { url, public_id }
    } catch (err) {
      console.log(err);
      return null; // Return null or handle error as needed
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let imgData = await upload();
    let imgUrl = imgData ? imgData.url : null; // Use the Cloudinary URL returned from the backend

    try {
      if (state) {
        // Update existing post
        await axios.put(
          //`http://localhost:8000/api/posts/${state.id}`,
          `https://full-stack-blogging-api.vercel.app/api/posts/${state.id}`,
          {
            title,
            content: value,
            cat,
            img: imgUrl, // Include image URL or data
          },
          { withCredentials: true }
        );
      } else {
        // Create a new post
        await axios.post(
          //"http://localhost:8000/api/posts/",
          "https://full-stack-blogging-api.vercel.app/api/posts/",
          {
            title,
            content: value,
            cat,
            img: imgUrl, // Include image URL or data
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          { withCredentials: true }
        );
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}
