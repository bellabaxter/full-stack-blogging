import {db} from "../db.js";
import bcrypt from "bcrypt";

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


 export const login = (req,res) => {
    
}

export const logout = (req,res) => {
    
}