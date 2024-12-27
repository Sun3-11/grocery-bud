import React, { useState } from "react";

const SingleItem = ({ item, removeItem, editItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newName.trim() === "") {
      editItem(item.id, item.name, item.completed);
    } else if (newName.trim() !== item.name) {
      editItem(item.id, newName.trim(), false);
    } else {
      editItem(item.id, item.name, item.completed);
    }
    setIsEditing(false);
  };

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => editItem(item.id, item.name, !item.completed)}
      />
      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <p
          style={{
            textTransform: "capitalize",
            textDecoration: item.completed ? "line-through" : "none",
          }}
          onClick={handleEdit}
        >
          {item.name}
        </p>
      )}
      <button
        type="button"
        className="btn remove-btn"
        onClick={() => removeItem(item.id)}
      >
        remove
      </button>
    </div>
  );
};

export default SingleItem;
