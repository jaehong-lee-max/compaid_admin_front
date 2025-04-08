import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useStore from "../store";

function Lnb() {
  const navigate = useNavigate();
  const menuCheckNumber = useStore((state) => state.menuCheckNumber);
  const menuOpenClose = (e) => {
    if (e.target.classList.contains("upon")) {
      if (e.target.children[0].style.display === "none") {
        e.target.children[0].style.display = "block";
        e.target.classList.add("ac");
        return false;
      }
      if (e.target.children[0].style.display === "block") {
        e.target.children[0].style.display = "none";
        e.target.classList.remove("ac");
        return false;
      }
    }
  };

  useEffect(() => {
    if (menuCheckNumber !== "") {
      console.log(menuCheckNumber);
      let menuFirst = document.querySelector(".menu_wrap > ul").children;
      for (let i = 0; i < menuFirst.length; i++) {
        menuFirst[i].classList.remove("ac");
        menuFirst[i].children[0].style.display = "none";
        let ch = menuFirst[i].children[0].children;
        for (let ii = 0; ii < ch.length; ii++) {
          ch[ii].classList.remove("ac");
        }
      }
      menuFirst[menuCheckNumber[0]].classList.add("ac");
      menuFirst[menuCheckNumber[0]].children[0].style.display = "block";
      menuFirst[menuCheckNumber[0]].children[0].children[
        menuCheckNumber[1]
      ].classList.add("ac");
    }
  }, [menuCheckNumber]);

  const logout = () => {
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("sessionKey");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <>
      <div className="lnb">
        <h1>Compaid Admin</h1>
        <div className="logout" onClick={logout}></div>
        <b>{sessionStorage.getItem("userName")}</b> 님 환영합니다.
        <div className="menu_wrap">
          <ul>
            <li onClick={menuOpenClose} className="upon">
              유저
              <ul style={{ display: "none" }}>
                <li>
                  <Link to="/member">목록</Link>
                </li>
              </ul>
            </li>
            <li onClick={menuOpenClose} className="upon">
              시뮬레이션
              <ul style={{ display: "none" }}>
                <li>
                  <Link to="/simulation">메인</Link>
                </li>
              </ul>
            </li>
            <li onClick={menuOpenClose} className="upon">
              설정
              <ul style={{ display: "none" }}>
                <li>
                  <Link to="#">메인</Link>
                </li>
              </ul>
            </li>
            <li onClick={menuOpenClose} className="upon">
              공지사항 관리
              <ul style={{ display: "none" }}>
                <li>
                  <Link to="/notice">리스트 조회</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Lnb;
