import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getListData,
  updateStatus,
  deleteData,
} from "../../actions/to-do-list.action";
import { Button } from "react-bootstrap";
import moment from "moment";
import Add from "./component/ModalAddEdit";
import Swal from "sweetalert2";
require("./style.css");

function Index() {
  const { getListDataResult } = useSelector((state) => state.ToDoListReducer);
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    show: false,
    data: "",
    type: "",
  });

  useEffect(() => {
    // get list data to-do-list
    dispatch(getListData());
  }, [dispatch]);

  const del = (id) => {
    // delete data
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteData(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const update = (id) => {
    // melakukan update status
    dispatch(updateStatus(id));
  };

  return (
    <div className="container mt-5">
      <Add
        show={modal.show}
        onHide={() => setModal({ ...modal, show: false })}
        type={modal.type}
        dataModal={modal.data}
      />
      <div className="container page-todo bootstrap snippets bootdeys">
        <div className="tasks">
          <div className="task-list">
            <div className="inline">
              <h1>Tasks</h1>
              <Button
                onClick={() => setModal({ show: true, data: "", type: "add" })}
                type="add"
              >
                + Add List
              </Button>
            </div>
            <div className="priority high">
              <span>To Do</span>
            </div>
            {getListDataResult &&
              getListDataResult
                .sort((a, b) => (b.createdAt < a.createdAt ? 1 : -1))
                .map(
                  (item, idx) =>
                    item.status === 0 && (
                      <div className="task high" key={idx}>
                        <div className="desc">
                          <div className="title">{item.title}</div>
                          <div>{item.description}</div>
                        </div>
                        <div className="time">
                          <div className="date">
                            {moment(item.createdAt).format("MMM Do YYYY")}
                          </div>
                        </div>
                        <div className="m-3">
                          <button
                            className="btn btn-sm btn-success ml-1"
                            onClick={() => update(item.id)}
                          >
                            Done
                          </button>
                          <button
                            className="btn btn-sm btn-info ml-1"
                            onClick={() =>
                              setModal({ show: true, data: item, type: "edit" })
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger ml-1"
                            onClick={() => del(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                )}

            <div className="priority low">
              <span>Done</span>
            </div>
            {getListDataResult &&
              getListDataResult
                .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                .map(
                  (item, idx) =>
                    item.status === 1 && (
                      <div className="task low" key={idx}>
                        <div className="desc">
                          <div className="title">{item.title}</div>
                          <div>{item.description}</div>
                        </div>
                        <div className="time">
                          <div className="date">
                            {moment(item.createdAt).format("MMM Do YYYY")}
                          </div>
                        </div>
                        <div className="m-3">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              setModal({ show: true, data: item, type: "edit" })
                            }
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )
                )}

            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
