import React from "react"

export default function ExercisesList({ name, target, equipment, gifUrl }) {
   return (
      <li className="exercise">
         <img className="exercise-icon"></img>
         <p className="exercise-name">{name}</p>
         <div className="chip-container">
            <p className="chip">{target}</p>
            <p className="chip">{equipment}</p>
         </div>
         <button
            className="exercise-button"
            onClick={() => {
               console.log("Clicked")
            }}
         >
            o
         </button>
      </li>
   )
}
