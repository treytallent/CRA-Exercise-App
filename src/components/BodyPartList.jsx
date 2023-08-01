import React from "react"

export default function BodyPartList({ name, setListBodyPart }) {
   return (
      <li className="part-container">
         <img
            role="button"
            className="part-btn"
            src={`../src/icons/${name}.svg`}
            onClick={() => {
               setListBodyPart({ name })
            }}
         ></img>
         <p className="part-name">{name}</p>
      </li>
   )
}
