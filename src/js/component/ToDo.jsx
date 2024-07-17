import React, { useState, useEffect } from "react";
import {postData} from "./postData";

export default function ToDo() {
  const [items, setItems] = useState([]);
  const [userState, setUserState] = useState("");

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("https://playground.4geeks.com/todo/users/billystorm01", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        //console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
      })
      .then((data) => {
        if (data.detail == "User billystorm01 doesn't exist.") {
          fetch("https://playground.4geeks.com/todo/users/billystorm01", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((resp) => {
            return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
          }).then((data) => { 
            setItems([]);
          });
            } else {
          setItems(data.todos)
        }
      })
      .catch((error) => {
        // Error handling
        console.error(error);
      });
  }

  function deleteItem(id) {
    fetch("https://playground.4geeks.com/todo/todos/"+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        //console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
      })
      .then((data) => {
        // Here is where your code should start after the fetch finishes
       // This will print on the console the exact object received from the server
       getData();
      })
      .catch((error) => {
        // Error handling
        console.error(error);
      });
  }

  function handleItems() {
    fetch("https://playground.4geeks.com/todo/todos/billystorm01", {
      method: "POST",
      body: JSON.stringify({
        "label": userState,
        "is_done": false
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        //console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
      })
      .then((data) => {
        // Here is where your code should start after the fetch finishes
        console.log(data); // This will print on the console the exact object received from the server
        getData();
      })
      .catch((error) => {
        // Error handling
        console.error(error);
      });
  }

  function handleDelete(index) {
    deleteItem(index);
  }

  function handleClear() {
fetch("https://playground.4geeks.com/todo/users/billystorm01", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((resp) => {
    getData();
  })
  .catch((error) => {
    // Error handling
    console.error(error);
  });

  }

  return (
    <div>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleItems();
            setUserState("");
          }
        }}
        className="addTask col-12"
        placeholder="What needs to be done?"
        value={userState}
        onChange={(e) => setUserState(e.target.value)}
      ></input>
      {items.map((item, ind) => (
        <div key={ind} className="row taskItemRow">
          <p key={ind} className="taskItem col-8 me-0">
            {item.label} - {item.id}
          </p>
          <p className="filler col-2 mx-0"></p>
          <button
            className="deleteBtn col-1 mx-0"
            onClick={() => handleDelete(item.id)}
          >
            <i className="fas fa-times icon" style={{ fontSize: "20px" }}></i>
          </button>
        </div>
      ))}
      <p className="footer col-12">
        {items.length} items remain <button onClick={handleClear}>Clear List</button>
      </p>
    </div>
  );
}

{
}
