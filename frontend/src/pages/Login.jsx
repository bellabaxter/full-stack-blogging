import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return(
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <button>Login </button>
                <p>This is an error!</p>
                <span>Don't have an account? To register <Link to ="/register">Click here</Link></span>

            </form>
        </div>
    );
}