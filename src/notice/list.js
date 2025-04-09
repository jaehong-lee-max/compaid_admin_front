import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store";
import Pagination from "../component/pagination";
import Loading from "../component/loading";

function List() {
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
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 5;
  const setMenuCheckNumber = useStore((state) => state.setMenuCheckNumber);

  useEffect(() => {
    setMenuCheckNumber([3, 0]);
    GetList();
  }, [currentPage]);

  let loading;

  if (isLoading) {
    loading = <Loading />;
  }
  const GetList = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/notice`)
      .then((response) => {
        console.log(response);
        const data = response.data;
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

  return (
    <>
      <div className="content_pannel">
        <h1>공지사항 리스트</h1>
        <table>
          <colgroup>
            <col style={{ width: "80%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {list.map((data, i) => (
              <tr key={i}>
                <td style={{ textAlign: "left" }}>{data.title}</td>
                <td>관리자</td>
                <td>{data.createdAt.split("T")[0]}</td>
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

export default List;
