import React from "react";
import { FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, setCheck }) => {
  return (
    <>
      {items.map((item) => {
        const { id, title, completed } = item;

        return (
          <article key={id} className="grocery-list__item">
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

            <button type="button" onClick={() => removeItem(id)}>
              <FaTrash />
            </button>
          </article>
        );
      })}
    </>
  );
};

export default List;
