import React, { useEffect } from "react";
import "./UserTodoForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addNewTodoAsync,
  clearSelectedTodo,
  fetchTodoByIdAsync,
  getEditId,
  selectEditId,
  selectedTodoById,
  updateTodoAsync,
} from "../todoSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
const UserTodoForm = ({ setInputField }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const editId = useSelector(selectEditId);
  const selectedTodo = useSelector(selectedTodoById);
  useEffect(() => {
    if (editId) {
      dispatch(fetchTodoByIdAsync(editId));
    } else {
      dispatch(clearSelectedTodo());
    }
  }, [editId, dispatch]);
  useEffect(() => {
    if (selectedTodo && editId) {
      setValue("title", selectedTodo.title);
      setValue("description", selectedTodo.description);
    }
  }, [selectedTodo, editId, setValue]);

  const handleEdit = () => {
    dispatch(clearSelectedTodo());
    setTimeout(() => {
      dispatch(getEditId(null));
    }, 100);
  };
  return (
    <div className="todo">
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          const newTodo = {
            title: data.title,
            description: data.description,
            completed: false,
            user: user.id,
          };
          if (editId) {
            dispatch(updateTodoAsync({ ...newTodo, id: editId }));
            reset();
          } else {
            dispatch(addNewTodoAsync(newTodo));
            reset();
          }
        })}
      >
        <div className="form-input">
          <input
            className="form-input__title"
            {...register("title", { required: "Task Name is Required" })}
            type="text"
            placeholder="Task Name"
          />
          <textarea
            className="form-input__desc"
            {...register("description")}
            placeholder="Description"
          ></textarea>
        </div>
        {errors.title && (
          <span className="errorMessage">*{errors.title.message}</span>
        )}
        <div className="form-btn">
          <button
            className="form-btn__cancel"
            onClick={() => {
              setInputField(false);
              dispatch(getEditId(null));
            }}
          >
            Cancel
          </button>
          <button className="form-btn__save" type="submit" onClick={handleEdit}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserTodoForm;
