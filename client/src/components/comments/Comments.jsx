import { useContext } from "react"
import {AuthContext } from "../../context/authContext"
import "./comments.scss"
import moment from "moment"
import {
  useMutation,
  useQueryClient,
  useQuery
} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useState } from "react"

const Comments = ({postId}) => {
    const {currentUser} = useContext(AuthContext)
    const [desc, setDesc] = useState('')

    
    const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" +postId).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation(
    (newComment)=>{
  return makeRequest.post("/comments", newComment)
},{
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['comments'] })
  },
})


  const handleClick = async (e) => {
      e.preventDefault();
      mutation.mutate({ desc, postId});
      setDesc("");
  }

  console.log(desc)


  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePicture} alt="" />
            <input 
              type="text"
              placeholder="Leave your comment here." 
              value={desc}
              onChange={(e)=>setDesc(e.target.value)} />
            <button onClick={handleClick}>Comment</button> 
        </div>
     { data?.map((comment) =>(
        <div className="comment" key={comment.id}>
            <img src={comment.profilePic} alt="" />
            <div className="info">
                <span> {comment.name}</span>
                <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments
