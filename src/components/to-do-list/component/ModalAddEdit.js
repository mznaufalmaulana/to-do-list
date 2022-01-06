import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addData, editData } from "../../../actions/to-do-list.action";
import { Form, Button, Modal } from "react-bootstrap";

function ModalAddEdit({ show, onHide, type, dataModal }) {
  const { getListDataResult } = useSelector((state) => state.ToDoListReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    id: Number,
    title: String,
    description: String,
  });

  useEffect(() => {
    if (type === "edit") {
      setData({
        id: dataModal.id,
        title: dataModal.title,
        description: dataModal.description,
      });
    } else {
      setData({
        id: "",
        title: "",
        description: "",
      });
    }
  }, [show]);

  const save = () => {
    if (type === "add") {
      dispatch(
        addData({
          ...data,
          id:
            getListDataResult.length > 0
              ? getListDataResult[getListDataResult.length - 1].id + 1
              : 1,
        })
      );
    } else {
      dispatch(editData(data));
    }
    onHide();
  };

  return (
    <div className="container">
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title className="text-capitalize">{type} List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description}
              rows={3}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => save()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddEdit;
