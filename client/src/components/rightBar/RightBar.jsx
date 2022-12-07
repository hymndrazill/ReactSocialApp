import React from 'react'
import "./rightbar.scss"
const RightBar = () => {
  return (
    <div className='rightbar'>
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <span>Jane doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Delete</button>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <span>Jane doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Delete</button>
            </div>
          </div> 

        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                 <p>
                  <span>John doe</span>
                  Changed their picture
                 </p>
            </div>
            <span>1 min ago.</span>
          </div> 
          <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                 <p>
                  <span>John doe</span>
                  Changed their picture
                 </p>
            </div>
            <span>1 min ago.</span>
          </div> 
          <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                 <p>
                  <span>John doe</span>
                  Changed their picture
                 </p>
            </div>
            <span>1 min ago.</span>
          </div> 
        </div>
        <div className="item">  
        <span>Online Friends</span>
        <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />            
                 <div className="online"/>
                 <span>John doe</span>          
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />            
                 <div className="online"/>
                 <span>John doe</span>          
            </div>
          </div> <div className="user">
            <div className="userinfo">
              <img src="https://images.pexels.com/photos/1255061/pexels-photo-1255061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />            
                 <div className="online"/>
                 <span>Jane doe</span>          
            </div>
          </div>


        </div>

      </div>
    </div>
  )
}

export default RightBar
