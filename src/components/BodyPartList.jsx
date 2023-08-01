import React from "react"

export default function BodyPartList({ name, setListBodyPart, imgUrl }) {
   return (
      <li className="part-container">
         <img
            role="button"
            className="part-btn"
            onClick={() => {
               setListBodyPart({ name })
            }}
         ></img>
         <p className="part-name">{name}</p>
      </li>
   )
}
