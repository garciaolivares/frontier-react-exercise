import React from 'react';
import formInstructions from '../data/form_instructions.json';
import Wizard from './wizard/Wizard';
import "@fontsource/roboto";
import "./app.scss";

function App() {
  const job = formInstructions as Frontier.Job;
  return ( <Wizard job={job}/>);
}
export default App;
