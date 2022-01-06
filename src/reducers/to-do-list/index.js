import {
  GET_LIST_DATA,
  ADD_DATA,
  DELETE_DATA,
  EDIT_DATA,
  UPDATE_STATUS,
} from "../../actions/to-do-list.action";

const initialState = {
  getListDataResult: false,
  getListDataLoading: false,
  getListDataError: false,
};

const ToDoList = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_DATA:
      return {
        ...state,
        getListDataResult: action.payload.data,
        getListDataLoading: action.payload.loading,
        getListDataError: action.payload.errorMessage,
      };

    case ADD_DATA:
      const date = new Date().toISOString().split("T");
      return {
        ...state,
        getListDataResult: [
          ...state.getListDataResult,
          {
            id: action.payload.data.id,
            title: action.payload.data.title,
            description: action.payload.data.description,
            status: 0,
            createdAt: `${date[0]} ${date[1]}`,
          },
        ],
      };

    case DELETE_DATA:
      const items = state.getListDataResult.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        getListDataResult: items,
      };

    case EDIT_DATA:
      const idx = state.getListDataResult.findIndex(
        (x) => x.id === action.payload.data.id
      );
      const updateValue = state.getListDataResult[idx];
      updateValue["title"] = action.payload.data.title;
      updateValue["description"] = action.payload.data.description;

      return {
        ...state,
        getListDataResult: [
          ...state.getListDataResult.slice(0, idx),
          updateValue,
          ...state.getListDataResult.slice(idx + 1),
        ],
      };

    case UPDATE_STATUS:
      const index = state.getListDataResult.findIndex(
        (x) => x.id === action.payload.id
      );
      const updateStatus = state.getListDataResult[index];
      updateStatus["status"] = 1;

      return {
        ...state,
        getListDataResult: [
          ...state.getListDataResult.slice(0, index),
          updateStatus,
          ...state.getListDataResult.slice(index + 1),
        ],
      };

    default:
      return state;
  }
};

export default ToDoList;
