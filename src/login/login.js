import React, { useState } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store";
import Loading from "../component/loading";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const setToken = useStore((state) => state.setToken);
  const setUserName = useStore((state) => state.setUserName);

  const [isLoading, setIsLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {
      email: id,
      password: pw,
    };
    axios
      .post("http://115.145.165.212:8000/v1/user/admin/signin", data)
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("token", response.data.access_token);
        sessionStorage.setItem("refresh", response.data.refresh_token);
        sessionStorage.setItem("sessionKey", response.data.user.session_key);
        setToken(response.data.access_token);
        setUserName(response.data.user.name);

        sessionStorage.setItem("userName", response.data.user.name);
        navigate("/member");

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  let loading;
  if (isLoading) {
    loading = <Loading />;
  }
  return (
    <>
      <div className="login_wrap">
        <div className="login_wrap_cell">
          <div className="login_pannel">
            <h1>Compaid Admin</h1>
            <form
              onSubmit={(e) => {
                login(e);
              }}
            >
              <input
                type="text"
                placeholder="아이디"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="패스워드"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                }}
              />
              <input type="submit" value="로그인" className="button" />
            </form>
          </div>
        </div>
      </div>
      {loading}
    </>
  );
}

export default Login;
