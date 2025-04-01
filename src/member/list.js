import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store";
import Pagination from "../component/pagination";

function Member() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [listNumber, setListNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPop, setIsPop] = useState(false);
  const [detailId, setDetailId] = useState("");
  const [userName, setUserName] = useState("");
  const [simulTime, setSimulTime] = useState("");
  const [learnTime, setLearnTime] = useState("");
  const [optimizeTime, setOptimizeTime] = useState("");

  const itemsPerPage = 5;
  const setMenuCheckNumber = useStore((state) => state.setMenuCheckNumber);

  useEffect(() => {
    setMenuCheckNumber([0, 0]);
    GetList();
  }, [currentPage]);

  const GetList = () => {
    axios
      .get(`http://115.145.165.212:8000/v1/user/list`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${sessionStorage.getItem(
            "token"
          )},${sessionStorage.getItem("sessionKey")}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setListNumber(data.length); // 전체 개수 저장

        // 현재 페이지에 해당하는 데이터 필터링
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

        setList(paginatedData);
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  };

  const viewDetail = (id) => {
    setIsPop(true);
    axios
      .get("http://115.145.165.212:8000/v1/user/detail?user_id=" + id)
      .then((response) => {
        console.log(response);
        setDetailId(response.data.result.user_id);
        setUserName(response.data.result.name);
        setSimulTime(response.data.result.simulation_run_total_duration);
        setLearnTime(response.data.result.learn_run_total_duration);
        setOptimizeTime(response.data.result.optimization_run_total_duration);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let pop;

  if (isPop) {
    pop = (
      <>
        <div className="detail_pop">
          <div className="detail_pop_itself">
            <h2>회원 상세 정보</h2>
            <div
              className="detail_pop_itself_X"
              onClick={() => {
                setIsPop(false);
              }}
            >
              x
            </div>
            <table>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>{detailId}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{userName}</td>
                </tr>
                <tr>
                  <th>시뮬레이션 총시간</th>
                  <td>{simulTime} h</td>
                </tr>
                <tr>
                  <th>학습 총시간</th>
                  <td>{learnTime} h</td>
                </tr>
                <tr>
                  <th>최적화 총시간</th>
                  <td>{optimizeTime} h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="content_pannel">
        <h1>회원목록</h1>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>가입일자</th>
              <th>승인여부</th>
              <th>권한</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {list.map((data, i) => (
              <tr key={i}>
                <td>{data.user_id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.dt_created}</td>
                <td>{data.is_approved ? "승인" : "미승인"}</td>
                <td>
                  {data.groups.length > 0
                    ? data.groups.map((group) => group.name).join(", ")
                    : ""}
                </td>
                <td>
                  <button onClick={() => viewDetail(data.user_id)}>보기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          listNumber={listNumber}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {pop}
    </>
  );
}

export default Member;
