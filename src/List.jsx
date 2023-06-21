import React from "react";
import { FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, setCheck }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title, completed } = item;

        return (
          <article key={id} className="grocery-item">
            <div>
              <input
                type="checkbox"
                id={id}
                onClick={() => setCheck(id)}
                checked={completed ? true : false}
              />
              <label htmlFor={id} className="title">
                {title}
              </label>
            </div>

            <div className="btn-container">
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
