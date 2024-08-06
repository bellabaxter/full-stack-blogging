// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/authContext.jsx";

// export default function Login() {
//     const [inputs, setInputs] = useState({
//         username: "",
//         password: "",
//       });
//       const [err, setError] = useState(null);
    
//       const navigate = useNavigate();
//       const { login } = useContext(AuthContext);
    
//       const handleChange = (e) => {
//         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//       };
//       // console.log(inputs);
    
//       const handleSubmit = async (e) => {
//          e.preventDefault();
//         try {
//           await login(inputs);
//           navigate("/");
//         } catch (err) {
//           setError(err.response?.data || "An unexpected error occurred");
//         }
//       };

//     return(
//         <div className="auth">
//             <h1>Login</h1>
//             <form>
//                 <input required type="text" placeholder="Username" name="username" onChange={handleChange}></input>
//                 <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
//                 <button onClick={handleSubmit}>Login</button>
//                 {err && <p>{err}</p>}
//                 <span>Don't have an account? To register <Link to ="/register">Click here</Link></span>

//             </form>
//         </div>
//     );
// }

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

export default function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            await login(inputs); // Call login function from context
            navigate("/"); // Navigate to home page on successful login
        } catch (err) {
            setError(err.response?.data || "An unexpected error occurred"); // Handle and set error message
        }
    };

    return (
        <div className="auth">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}> {/* Use onSubmit for form submission */}
                <input
                    required
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={inputs.username} // Controlled input
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={inputs.password} // Controlled input
                    onChange={handleChange}
                />
                <button type="submit">Login</button> {/* Change button type to submit */}
                {err && <p>{err}</p>} {/* Display error message if exists */}
                <span>
                    Don't have an account? To register <Link to="/register">Click here</Link>
                </span>
            </form>
        </div>
    );
}
