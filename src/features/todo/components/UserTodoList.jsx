import React, { useEffect, useState } from "react";
import "./UserTodoList.scss";
import { VscAdd } from "react-icons/vsc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import UserTodoForm from "./UserTodoForm";
import {
  deleteTodoAsync,
  getEditId,
  selectEditId,
  selectTodos,
  updateTodoAsync,
} from "../todoSlice";
const UserTodoList = () => {
  const dispatch = useDispatch();
  const [inputField, setInputField] = useState(false);
  const todos = useSelector(selectTodos);
  const editId = useSelector(selectEditId);
  useEffect(() => {
    if (editId) {
      setInputField(true);
    }
  }, [editId]);
  const handleComplete = (e, todo) => {
    dispatch(updateTodoAsync({ ...todo, completed: true }));
  };

  const filterPendingTodo = todos.filter((todo) => todo.completed === false);
  return (
    <>
      <div className="todo">
        {
          <h1 className="todo-heading">{filterPendingTodo.length?" Pending Task " :"Please Add Your task here"}</h1>
       }

        {filterPendingTodo?.map((todo) => {
          return (
            <div key={todo.id}>
              <div className="list">
                <div className="list-head">
                  <div className="list-head__content">
                    <input
                      className="inputCheckbox"
                      type="checkbox"
                      onChange={(e) => handleComplete(e, todo)}
                    />
                    <h3 className="title">{todo.title}</h3>
                  </div>
                  <div className="list-head__icons">
                    <AiFillEdit
                      className="edit"
                      onClick={() => dispatch(getEditId(todo.id))}
                    />
                    <AiFillDelete
                      className="delete"
                      onClick={() => dispatch(deleteTodoAsync(todo.id))}
                    />
                  </div>
                </div>
                <div className="list-body">
                  <p className="list-body__desc">{todo.description}</p>
                </div>
              </div>
            </div>
          );
        })}

        {!inputField && (
          <div className="todo-btn" onClick={() => setInputField(true)}>
            <VscAdd className="todo-btn__addIcon" />
            <button className="todo-btn__addBtn"> Add task</button>
          </div>
        )}

        {inputField && <UserTodoForm setInputField={setInputField} />}
      </div>
    </>
  );
};

export default UserTodoList;
