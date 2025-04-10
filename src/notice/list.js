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
  const [iswritepop, setiswritepop] = useState(false);
  const [writeTitle, setWriteTitle] = useState("");
  const [writeContent, setWriteContent] = useState("");
  const [isdetail, setisdetail] = useState(false);
  const [detailTitle, setDetailTitle] = useState("");
  const [detailContent, setDetailContent] = useState("");
  const [detailDate, setDetailDate] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isrecorrect, setisrecorrect] = useState(false);
  const [render, setrender] = useState("");

  const itemsPerPage = 5;
  const setMenuCheckNumber = useStore((state) => state.setMenuCheckNumber);

  useEffect(() => {
    setMenuCheckNumber([3, 0]);
    GetList();
  }, [currentPage]);

  useEffect(() => {
    setrender(
      list.map((data, i) => {
        return (
          <tr key={i}>
            <td>
              <input
                type="radio"
                id={data.id}
                name="select"
                checked={selectedId === data.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedId(data.id);
                  } else {
                    setSelectedId("");
                  }
                }}
              />
            </td>
            <td style={{ textAlign: "left" }}>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  seeDetailView(data.id);
                }}
              >
                {data.title}
              </a>
            </td>
            <td>관리자</td>
            <td>{data.createdAt.split("T")[0]}</td>
          </tr>
        );
      })
    );
  }, [list, selectedId]);

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

        setSelectedId("");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        navigate("/login");
      });
  };

  const sendPost = () => {
    setIsLoading(true);
    axios
      .post(`http://localhost:3000/notice`, {
        title: writeTitle,
        content: writeContent,
      })
      .then((response) => {
        console.log(response);
        setiswritepop(false);
        setIsLoading(false);
        GetList();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        navigate("/login");
      });
  };

  const sendPostRecorrect = () => {
    setIsLoading(true);
    axios
      .put(`http://localhost:3000/notice/${selectedId}`, {
        title: detailTitle,
        content: detailContent,
      })
      .then((response) => {
        console.log(response);
        setisrecorrect(false);
        setIsLoading(false);
        alert("수정되었습니다.");
        GetList();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        navigate("/login");
      });
  };

  const seeDetailView = (id) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/notice/${id}`)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setDetailTitle(response.data.title);
        setDetailContent(response.data.content);
        setDetailDate(response.data.createdAt.split("T")[0]);
        setisdetail(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        navigate("/login");
      });
  };

  const recorrect = (id) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/notice/${id}`)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setDetailTitle(response.data.title);
        setDetailContent(response.data.content);
        setDetailDate(response.data.createdAt.split("T")[0]);
        setisrecorrect(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        navigate("/login");
      });
  };

  let writePop;

  if (iswritepop) {
    writePop = (
      <>
        <div className="write_pop_wrap">
          <div className="write_pop">
            <div
              className="detail_pop_itself_X"
              onClick={() => {
                setiswritepop(false);
              }}
            >
              x
            </div>
            <div className="wirte_pop_title">공지사항 작성</div>
            <input
              type="text"
              placeholder="제목을 입력해 주세요"
              value={writeTitle}
              onChange={(e) => {
                setWriteTitle(e.target.value);
              }}
            />
            <textarea
              placeholder="내용을 입력해 주세요"
              value={writeContent}
              onChange={(e) => {
                setWriteContent(e.target.value);
              }}
            ></textarea>
            <div className="button_area">
              <button className="write_btn" onClick={sendPost}>
                작성완료
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  let recorrect_pop;

  if (isrecorrect) {
    recorrect_pop = (
      <>
        <div className="write_pop_wrap">
          <div className="write_pop">
            <div
              className="detail_pop_itself_X"
              onClick={() => {
                setisrecorrect(false);
              }}
            >
              x
            </div>
            <div className="wirte_pop_title">공지사항 수정</div>
            <input
              type="text"
              placeholder="제목을 입력해 주세요"
              value={detailTitle}
              onChange={(e) => {
                setDetailTitle(e.target.value);
              }}
            />
            <textarea
              placeholder="내용을 입력해 주세요"
              value={detailContent}
              onChange={(e) => {
                setDetailContent(e.target.value);
              }}
            ></textarea>
            <div className="button_area">
              <button className="write_btn" onClick={sendPostRecorrect}>
                수정완료
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  let detail_view;

  if (isdetail) {
    detail_view = (
      <>
        <div className="write_pop_wrap">
          <div className="write_pop">
            <div
              className="detail_pop_itself_X"
              onClick={() => {
                setisdetail(false);
              }}
            >
              x
            </div>

            <div className="wirte_pop_title">공지사항 상세</div>
            <span style={{ fontSize: "12px" }}>{detailDate}</span>
            <br />
            <br />
            <span
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "black",
                lineHeight: "22px",
                display: "block",
                height: "auto",
              }}
            >
              {detailTitle}
            </span>
            <br />
            <span
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "black",
                lineHeight: "19px",
                display: "block",
                height: "auto",
              }}
            >
              {detailContent}
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="content_pannel">
        <h1>공지사항 리스트</h1>
        <div className="button_area">
          <button
            className="write_btn"
            onClick={() => {
              if (selectedId === "") {
                alert("수정할 항목을 선택해 주세요.");
              } else {
                recorrect(selectedId);
              }
            }}
          >
            수정
          </button>
          {"  "}
          <button className="write_btn">삭제</button>
          {"  "}
          <button
            className="write_btn"
            onClick={() => {
              setiswritepop(true);
            }}
          >
            글쓰기
          </button>
        </div>
        <table>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "70%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>선택</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>{render}</tbody>
        </table>
        <Pagination
          listNumber={listNumber}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {recorrect_pop}
      {detail_view}
      {writePop}
      {loading}
    </>
  );
}

export default List;
