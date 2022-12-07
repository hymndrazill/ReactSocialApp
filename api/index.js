import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postsRoutes from "./routes/posts.js"
import commentsRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import relationshipsRoutes from "./routes/relationships.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import multer from "multer";

const app = express();




//middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", true);
    next()
})
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials:true
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })




// routes
app.post("/api/upload", upload.single('file'), (req,res)=>{
    const file = req.file
    res.status(200).json(file.filename)
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/likes", likesRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/relationships", relationshipsRoutes)


app.listen(8800,()=>{
    console.log("SERVER IS RUNNING.")
})