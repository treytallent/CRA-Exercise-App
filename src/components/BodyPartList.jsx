import React from "react"

export default function BodyPartList({ name, setListBodyPart }) {
   console.log(name)

   return (
      <li className="part-container">
         <button
            className="part-btn"
            onClick={() => {
               setListBodyPart({ name })
            }}
         ></button>
         <p className="part-name">{name}</p>
      </li>
   )
}
