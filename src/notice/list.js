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
  }, [currentPage]);

  let loading;

  if (isLoading) {
    loading = <Loading />;
  }

  return (
    <>
      <div className="content_pannel">
        <h1>공지사항 리스트</h1>
        <table>
          <colgroup>
            <col style={{ width: "90%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        {/* <Pagination
          listNumber={listNumber}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        /> */}
      </div>

      {loading}
    </>
  );
}

export default List;
