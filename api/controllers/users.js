import {db} from "../connect.js"
import jwt from "jsonwebtoken"
export const getUser = (req,res)=>{
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = ?"
    db.query(q, [userId], (err,data)=>{
        if (err) return res.status(404).json("user not found");
        const {password, ...info} = data[0]
        return res.status(200).json(info)
    })
}


export const updateUser = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged in");

    jwt.verify(token, "secretkey", (err,userInfo)=>{
        if(err) return res.status(403).json("token is invalid!");
       
    
        const q = "UPDATE users SET `name`=?,`email`=?,`city`=?,`website`=? ,`profilePic`=? ,`coverPic`=? WHERE id=?"
    db.query(q
        ,[
        req.body.name,
        req.body.email,
        req.body.city,
        req.body.website,
        req.body.pic,
        req.body.cover,
        userInfo.id
    ], (err,data)=>{
        if(err) return res.status(500).json(err);
        console.log(userInfo)
        if(data.affectedRows > 0) return res.json("User has been updated");
        return res.status(403).json("You can update only your profile info");
    })
    
    })
}