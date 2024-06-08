import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return(
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder="Username"></input>
                <input required type="email" placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
                <button>Register</button>
                <p>This is an error!</p>
                <span>Already have an account? Try logging in <Link to ="/login">Click here</Link></span>

            </form>
        </div>
    );
}