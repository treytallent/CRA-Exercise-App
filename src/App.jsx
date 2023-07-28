import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Loading from "./components/Loading"
import BodyPartList from "./components/BodyPartList"
import ExercisesList from "./components/ExercisesList"
import ExercisesNav from "./components/ExercisesNav"
import "./css/app.css"

//To do
//Allow users to add their own bodyparts and exercicses
//Open exercises to view the exercise gif
//Filter exercises by target muscle group and/or equipment
//Create icons for bodyParts and target muscle groups to replace the black squares

export default function App() {
   //The template used for user created exercises
   const customExercise = {
      bodyPart: "",
      equipment: "",
      gifUrl: "",
      id: "",
      name: "",
      target: "",
   }
   //Categories of different body parts used to organise the exercise list
   const bodyParts = [
      { name: "back", id: uuidv4() },
      { name: "cardio", id: uuidv4() },
      { name: "chest", id: uuidv4() },
      { name: "lower arms", id: uuidv4() },
      { name: "lower legs", id: uuidv4() },
      { name: "neck", id: uuidv4() },
      { name: "shoulders", id: uuidv4() },
      { name: "upper arms", id: uuidv4() },
      { name: "upper legs", id: uuidv4() },
      { name: "waist", id: uuidv4() },
   ]
   const LOCAL_STORAGE_KEY = "exerciseApp.exercises"
   const exerciseFetch = loadExerciseData()
   const url = "https://exercisedb.p.rapidapi.com/exercises"
   const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "f9c545645cmsh90d1363e38d8f0dp18b394jsn8d89786e2099",
         "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
   }
   //If no local storage data, fetch from api.
   //Save API data to localStorage.
   //Set API data to the state.
   async function fetchApi() {
      const data = await fetch(url, options)
      if (data.ok) {
         const jsonData = await data.json()
         saveExerciseData(jsonData)
         setFetchedExerciseData(jsonData)
      } else {
         console.log("Error")
      }
   }
   function saveExerciseData(exercises) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exercises))
   }
   function loadExerciseData() {
      const dataJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
      return JSON.parse(dataJSON)
   }
   //Holds the initially fetched data.
   const [fetchedExerciseData, setFetchedExerciseData] = useState(exerciseFetch)
   //Holds the fetched data that is filtered by the clicked bodypart
   const [filteredData, setFilteredData] = useState()
   //Holds the name of the clicked bodypart
   const [listBodyPart, setListBodyPart] = useState()

   //Automatically triggers when the 'bodyPartList' value is updated.
   useEffect(() => {
      console.log("Running useEffect")
      if (listBodyPart) {
         bodyPartFilter()
      }
   }, [listBodyPart])

   //Upon load, load the exercise data from localStorage.
   //If no data is saved, call the fetchApi function.
   useEffect(() => {
      if (!fetchedExerciseData) {
         console.log("No data")
         fetchApi()
      }
   }, [])
   //The onClick event listener on 'bodyPartList' is used to update the 'listBodyPart' useState and contains the string value of the selected bodypart.
   //Filters down 'fetchedExerciseData' to an array matching the 'listBodyPart' string.
   //Is called by useEffect and the search bar inside of 'ExerciseNav'
   function bodyPartFilter() {
      const filteredDataArray = fetchedExerciseData.filter(
         i => i.bodyPart === listBodyPart.name
      )
      setFilteredData(filteredDataArray)
   }
   //
   return (
      <main className="main">
         {/* If no exercise data is currently stored, render the loading animation. */}
         {!fetchedExerciseData && <Loading />}
         {fetchedExerciseData && !listBodyPart && (
            // If data is stored and the exercise exercise list is not currently open, render the bodyPart list. */}
            <ul role="list" className="bodyPartList-container">
               {bodyParts.map(bodyPart => (
                  <BodyPartList
                     key={bodyPart.id}
                     name={bodyPart.name}
                     setListBodyPart={setListBodyPart}
                  ></BodyPartList>
               ))}
            </ul>
         )}
         {/* If data is stored and the exercise list is open, and filteredData
         has data, render the list of exercises. */}
         {fetchedExerciseData && listBodyPart && filteredData && (
            <>
               <ExercisesNav
                  listBodyPart={listBodyPart}
                  setListBodyPart={setListBodyPart}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  bodyPartFilter={bodyPartFilter}
               />
               <ul role="list" className="exercisesList-container">
                  {filteredData &&
                     filteredData.map(exercise => (
                        <ExercisesList
                           key={exercise.id}
                           name={exercise.name}
                           target={exercise.target}
                           equipment={exercise.equipment}
                           gifUrl={exercise.gifUrl}
                        ></ExercisesList>
                     ))}
               </ul>
            </>
         )}
      </main>
   )
}
