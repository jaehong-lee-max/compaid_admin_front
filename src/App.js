import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import Login from "./login/login";
import Main from "./main/main";
import Member from "./member/list";
import Lnb from "./component/lnb";
import "./App.css";
import useStore from "./store";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  }, [sessionStorage.getItem("token")]);

  return (
    <>
      <div className="wrap">
        {sessionStorage.getItem("token") && <Lnb />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/member" element={<Member />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
