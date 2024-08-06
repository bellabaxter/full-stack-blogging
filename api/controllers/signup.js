import {db} from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


export const register = (req,res) => {
    const saltRounds = 10;
    //check exsisting user

    db.query("SELECT * FROM users WHERE email = ($1) OR username=($2)" ,
            [req.body.email , req.body.username],
            (err,data)=>{
                if(err) return res.json(err)
                if(data.rows.length>0) return res.status(409).json("User already exists");
    
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            db.query("INSERT INTO users (username, email, password) VALUES ($1,$2,$3)" ,
                [
                    req.body.username,
                    req.body.email,
                    hash,
                ], (err,data)=>{
                    if(err) return res.json(err)
                    return res.status(200).json("User has been registered.")
                }
            )
        });
    });
};


export const login = (req, res) => {
    //CHECK USER
  
    const q = "SELECT * FROM users WHERE username = ($1)";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.rows.length === 0) return res.status(404).json("User not found!");
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data.rows[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");

      const userId=data.rows[0].id;
      const token = jwt.sign({id :userId}, process.env.JWT_KEY);
      const { password, ...other } = data.rows[0];
      // res
      //   .cookie("access_token", token, {
      //     httpOnly: true, 
      //     // secure: true, // Set to true in production
      //     // sameSite: 'None' , // Adjust for cross-site requests
      //     // //domain: process.env.NODE_ENV === 'production' ? 'full-stack-blogging-front.onrender.com' : undefined, // Replace with your domain
      //   })
        return res.status(201).json({other, token})
        // res.status(200)
        // .json(other);
     });
  };

export const logout = (req, res) => {
    // res.clearCookie("access_token",{
    //   sameSite:"none",
    //   secure:true
    // }).status(200).json("User has been logged out.")
    res.status(200).json("User has been logged out.")
};