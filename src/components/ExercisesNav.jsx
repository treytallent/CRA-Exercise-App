import React from "react"
import ExercisesNavFilter from "./ExercisesNavFilter"

export default function ExercisesNav({
   listBodyPart,
   setListBodyPart,
   filteredData,
   setFilteredData,
   bodyPartFilter,
}) {
   function closeList() {
      setListBodyPart()
   }

   //Creates a filter on the chosen bodypart list of exercises using the input value
   //However, using this data to re-render the rendered exercises will not work once a value has been entered and removed because the list has been overwritten.
   function searchFilter(searchInput) {
      const searchFilteredData = filteredData.filter(exercise =>
         exercise.name.includes(searchInput)
      )
      setFilteredData(searchFilteredData)
      if (searchInput.length == 0) {
         bodyPartFilter()
      }
   }

   function createFilterList() {
      const { target } = filteredData

      const filterList = filteredData.filter(exercise => exercise.target)
   }
   createFilterList()

   return (
      <div className="exercisesNav-heading-container">
         <h2 className="exercisesNav-heading">{`${listBodyPart.name} Exercises`}</h2>
         <button onClick={closeList} className="exercisesNav-close-btn">
            &times;
         </button>
         <input
            type="text"
            onChange={e => {
               searchFilter(e.target.value)
            }}
            className="exercisesNav-searchbar"
            placeholder="Search"
         ></input>
         {/* To do: create two drop down menus which filter results by the selected target muscle or the selected equipment */}
         <ul className="exercisesNav-filter"></ul>
         <ul className="exercisesNav-filter"></ul>
      </div>
   )
}
