import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import './stories.scss'

const Stories = () => {
  const {currentUser} = useContext(AuthContext)

  const stories = [
    {
      id:1,
      name:"Firas Sriha",
      img: "https://images.pexels.com/photos/3841412/pexels-photo-3841412.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id:2,
      name:"Belsem Sriha",
      img: "https://images.pexels.com/photos/3841412/pexels-photo-3841412.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id:3,
      name:"Yesmine Sriha",
      img: "https://images.pexels.com/photos/6963589/pexels-photo-6963589.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id:4,
      name:"Kamel Sriha",
      img: "https://images.pexels.com/photos/9693361/pexels-photo-9693361.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
   
  ]
  return (
    <div className='stories'>
       <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
    {stories.map(story=>(
      <div className="story" key={story.id}>
        <img src={story.img} alt="ok" />
        <span>{story.name}</span>
      </div>
))}
    </div>
  )
}

export default Stories
