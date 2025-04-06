import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store";
import Pagination from "../component/pagination";
import Loading from "../component/loading";

function Simulation() {
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const setMenuCheckNumber = useStore((state) => state.setMenuCheckNumber);

  const [listNumber, setListNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMenuCheckNumber([1, 0]);
    getList();
  }, [currentPage]);

  const getList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://115.145.165.212:8000/v1/web/simulation/get-simulation-list`,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${sessionStorage.getItem(
              "token"
            )},${sessionStorage.getItem("sessionKey")}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setListNumber(data.length); // 전체 개수 저장

        // 현재 페이지에 해당하는 데이터 필터링
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

        setList(paginatedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        navigate("/login");
      });
  };
  let loading;
  if (isLoading) {
    loading = <Loading />;
  }
  return (
    <>
      <div className="content_pannel">
        <h1>시뮬레이션</h1>
        <table>
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>진행단계</th>
              <th>결과</th>
              <th>시작일자</th>
            </tr>
          </thead>
          <tbody>
            {list.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.stage}</td>
                <td>{data.result}</td>
                <td>{data.dt_created.split("T")[0]}</td>
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
      {loading}
    </>
  );
}

export default Simulation;
