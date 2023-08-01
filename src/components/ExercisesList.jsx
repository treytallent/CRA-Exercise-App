import React, { useState } from "react"

export default function ExercisesList({ name, target, equipment, gifUrl }) {
   const [isVisible, setVisible] = useState(false)
   const visibleStyle = {
      display: isVisible ? "" : "none",
   }
   function toggleVisible() {
      setVisible(prevIsVisible => !prevIsVisible)
   }

   return (
      <li className="exercise">
         <img
            className="exercise-icon"
            src={`../src/icons/${target}.svg`}
         ></img>
         <p className="exercise-name">{name}</p>
         <div className="chip-container">
            <p className="chip">{target}</p>
            <p className="chip">{equipment}</p>
         </div>
         <button
            className="exercise-button"
            onClick={() => {
               toggleVisible()
            }}
         >
            &gt;
         </button>
         <img className="exercise-gif" style={visibleStyle} src={gifUrl}></img>
      </li>
   )
}
