import React from "react"

export default function BodyPartList({ name, setListBodyPart }) {
   const styles = { background: "../icons/abs.svg" }

   return (
      <li className="part-container">
         <button
            className="part-btn"
            style={styles}
            onClick={() => {
               setListBodyPart({ name })
            }}
         ></button>
         <p className="part-name">{name}</p>
      </li>
   )
}
