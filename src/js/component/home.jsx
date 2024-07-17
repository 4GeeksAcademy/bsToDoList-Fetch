import React from "react";
import ToDo from "./ToDo";

//create your first component
const Home = () => {
  return (
    <div>
      <h1 id="heading">To-Do</h1>
      <div className="noteBox container col-4 px-0">
        <ToDo />
      </div>
    </div>
  );
};

export default Home;
