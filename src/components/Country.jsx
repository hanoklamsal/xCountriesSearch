import React from 'react'

const Country = ({name,flag}) => {
  return (
    <div style={{
        textAlign:"center",
        verticalAlign:"middle",
        border:"solid 1px gray",
        borderRadius:"10px",
        padding:"10px",
        height:"130px",
        width:"130px",
        }}>
        <img style={{height:"50px",width:"50px",}} src={flag}/>
        <p>{name}</p>
    </div>
  )
}

export default Country