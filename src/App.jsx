import React, { useState, useEffect } from "react";
import List from "./Components/List";
import Alert from "./Components/Alert";
import { FaPlus } from "react-icons/fa";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Please enter a value.");
    } else {
      showAlert(true, "success", "Item added to your list!");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        completed: false,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const setCheck = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed.");
    setList(list.filter((item) => item.id !== id));
  };

  const clearList = () => {
    showAlert(true, "danger", "List emptied.");
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="grocery-list grocery-list--container">
      <h1>To-do list app</h1>

      {list.length > 0 && (
        <div className="grocery-list__item-container">
          <List items={list} removeItem={removeItem} setCheck={setCheck} />
          <button className="grocery-list__clear" onClick={clearList}>
            clear
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grocery-list__form">
        {alert.show && (
          <Alert
            msg={alert.msg}
            type={alert.type}
            removeAlert={showAlert}
            list={list}
          />
        )}
        <input
          type="text"
          placeholder="e.g. eggs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          <FaPlus />
        </button>
      </form>
    </section>
  );
}

export default App;
