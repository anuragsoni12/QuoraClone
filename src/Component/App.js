
import "../App.css";

import { useState , useEffect } from "react";

import  {HomePage}  from "./HomePage";

function App() {
  
  let initialDatabase ;
  if(localStorage.getItem('database') === null){
    initialDatabase = [];
  }
  else{
    initialDatabase = JSON.parse(localStorage.getItem('database'));
  }
  
  const addQuestion = (question) => {
    console.log('inserted ques' , question);
    let item = {};
    item.question = question;
    item.answers = [];
    setDataBase([...database , item]);
  }
  const deleteQuestion = (item) => {
    console.log('delete ques', item);
    setDataBase(database.filter((element)=>{
      return element !== item;
    }));
    console.log('delete ques', item);
  }

  const deleteAnswer = (answer , item) => {
    for(let entry in database){
      let ques = database[entry].question;
      if(ques === item.question && database[entry].answers !== undefined){
        database[entry].answers = database[entry].answers.filter((ele)=>{
          return ele !== answer;
        });
        break;
      }
    }
    setDataBase([...database]);
  }

  const addAnswer = (answer,item) => {
    for(let entry in database){
      let ques = database[entry].question;
      if(ques === item.question){
        database[entry].answers.push(answer);
      }
    }
    setDataBase([...database]);

  }
  const [database , setDataBase] = useState(initialDatabase);
  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database])
  
  
  return (
    <div className="cont">
   
 

  <HomePage name="Add Question" addQuestion={addQuestion} deleteQuestion={deleteQuestion} addAnswer={addAnswer} deleteAnswer={deleteAnswer}  database={database} />
       
    

</div>
  );
}

export default App;
