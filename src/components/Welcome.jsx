import React from 'react'
import {UseSelector, useSelector } from 'react-redux'

const Welcome = () => {
  const {user} =useSelector((state)=>state.auth);
  console.log("user", typeof(user))
  
  return (
    <div >
           <h2  style={{
            margin: 0,
            color: "rgba(0, 0, 0, 1)",
            fontFamily: "Poppins",
            fontWeight:"500",
            fontSize: "24px",
            lineHeight: "36px",
          }}>Hello {user && user.name}👋🏼</h2>
        <br></br>
    </div>
  )
}

export default Welcome