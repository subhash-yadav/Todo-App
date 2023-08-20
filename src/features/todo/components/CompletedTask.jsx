import React from "react";
import "./CompletedTask.scss";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, selectTodos, updateTodoAsync } from "../todoSlice";
const CompletedTask = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleComplete = (e, todo) => {
    dispatch(updateTodoAsync({ ...todo, completed: false }));
  };
  const filteredCompletedTodos = todos.filter((todo) => {
    return todo.completed === true;
  });
  return (
    <>
      <div className="todo">
        {
          <h1 className="todo-heading">{filteredCompletedTodos.length ? "CompletedTask List" : "Not Any Task Completed"}</h1>
        }

        {filteredCompletedTodos?.map((todo) => {
          return (
            <div key={todo.id}>
              <div className="list">
                <div className="list-head">
                  <div className="list-head__content">
                    <button
                      className="undoBtn"
                      type="checkbox"
                      onClick={(e) => handleComplete(e, todo)}
                    >
                      Undo
                    </button>
                    <h3 className="title">{todo.title}</h3>
                  </div>
                  <div className="list-head__icons">
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
      </div>
    </>
  );
};

export default CompletedTask;
