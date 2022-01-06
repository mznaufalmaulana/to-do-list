import axios from "axios";

export const GET_LIST_DATA = "GET_LIST_DATA";
export const ADD_DATA = "ADD_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const EDIT_DATA = "EDIT_DATA";
export const UPDATE_STATUS = "UPDATE_STATUS";

export const getListData = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_DATA,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      url: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list",
      timeout: 12000,
    })
      .then((response) => {
        dispatch({
          type: GET_LIST_DATA,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_DATA,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addData = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DATA,
      payload: {
        loading: false,
        data: data,
        errorMessage: false,
      },
    });
  };
};

export const deleteData = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_DATA,
      payload: {
        loading: false,
        id: id,
        errorMessage: false,
      },
    });
  };
};

export const editData = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_DATA,
      payload: {
        loading: false,
        data: data,
        errorMessage: false,
      },
    });
  };
};

export const updateStatus = (id) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_STATUS,
      payload: {
        loading: false,
        id: id,
        errorMessage: false,
      },
    });
  };
};
