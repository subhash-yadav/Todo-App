import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserTodoList from "../features/todo/components/UserTodoList";
import CompletedTask from "../features/todo/components/CompletedTask";
import "./Home.scss";

const Home = () => {
  return (
    <Navbar>
      <div className="Home">
        <div className="Home-content">
          <div className="Home-content__pending">
            <UserTodoList />
          </div>
          <hr className="Home-content__hr" />
          <div className="Home-content__complete">
            <CompletedTask />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Home;
