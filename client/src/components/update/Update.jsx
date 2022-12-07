import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { makeRequest } from "../../axios";
import "./update.scss"

const Update = ( {setOpenUpdate, user}) => {
  const [cover,setCover]= useState(null);
  const [pic,setPic] = useState();
  const [inputs,setInputs] = useState({
    name: "",
    email:"",
    city:"",
    website:""
  })
  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  }
  
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data
    } catch (err){
      console.log(err);
    }
  }

  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation((user)=>{
  return makeRequest.put("/users", user)
},{
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})


  const handleSubmit = async (e) => {
      e.preventDefault();
      let coverUrl;
      let profilePicUrl;
      profilePicUrl = pic ? await upload(pic) : user.profilePic
      coverUrl = cover ? await upload(cover) : user.coverPic;
      console.log("is this the cover");
      console.log(pic);
console.log(coverUrl);
console.log(profilePicUrl);

      mutation.mutate({...inputs, pic:profilePicUrl, cover:coverUrl});
      setOpenUpdate(false);
  }




  return (
    <div className="update">
        <form>
          <input type="file" onChange={e=>setPic(e.target.files[0])} /> 
          <input type="file" onChange={e=>setCover(e.target.files[0])}/>
          <input required type="text" onChange={handleChange} placeholder='name' name="name"/>
          <input required type="email" onChange={handleChange} placeholder='email' name="email"/>
          <input required type="text" onChange={handleChange} placeholder= 'city' name="city"/>
          <input required type="text" onChange={handleChange} placeholder='website' name="website"/>
            <button onClick={handleSubmit}>Update</button>
        </form>
      
      
      
        <button onClick={()=>setOpenUpdate(false)}> X</button>
      
    </div>
  )
}

export default Update
