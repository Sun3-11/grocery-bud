import React, { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";
import { ToastContainer, toast } from "react-toastify";

// const getLocalStorage = () => {
//   let items = localStorage.getItem("items");
//   if (items) {
//     return JSON.parse(items);
//   }
//   return [];
// };
const setLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};
const defaultList = JSON.parse(localStorage.getItem("items")) || [];
const App = () => {
  // getLocalStorage();
  // const [items, setItems] = useState(getLocalStorage());
  const [items, setItems] = useState(defaultList);

  const addItem = (itemName) => {
    const newItem = {
      id: nanoid(),
      name: itemName,
      completed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("Item added to the list successfully! ^^");
    //tow way of doing the same thing
    // setItems((prevItems) => {
    //   return [
    //     ...prevItems,
    //     {
    //       id: new Date().getTime().toString(),
    //       title: newItem,
    //       completed: false,
    //     },
    //   ];
    // });
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("Item removed from the list :)");
  };

  const editItem = (id, newName, completed) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName, completed };
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("Item edit :)");
  };

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form setItems={setItems} addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};

export default App;
