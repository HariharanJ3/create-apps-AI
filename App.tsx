/* eslint-disable no-case-declarations */
import { useReducer } from "react";
import "./App.css";

interface IContentType {
  title: string;
  content: string;
}

const initialState: IContentType[] = [{ title: "", content: "" }];

type ActionType =
  | { type: "add_new" }
  | {
      type: "update_data";
      payload: { index: number; field: "title" | "content"; value: string };
    }
  | { type: "delete_item"; payload: { index: number } };

const reducer = (state: IContentType[], action: ActionType) => {
  switch (action.type) {
    case "add_new":
      return [...state, { title: "", content: "" }];
    case "update_data":
      const { index, field, value } = action.payload;
      const updatedState = state.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });
      return updatedState;
    case "delete_item":
      const { index: deleteIndex } = action.payload;
      const newState = state.filter((_, i) => i !== deleteIndex);
      return newState;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    dispatch({ type: "update_data", payload: { index, field, value } });
  };

  const handleDelete = (index: number) => {
    dispatch({ type: "delete_item", payload: { index } });
  };

  return (
    <div>
      {state.map(({ title, content }, key) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: `flex-start`,
            gap: 15,
          }}
        >
          {key}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => handleInputChange(key, "title", e.target.value)}
          />
          <textarea
            name="content"
            value={content}
            onChange={(e) => handleInputChange(key, "content", e.target.value)}
          />
          <button onClick={() => handleDelete(key)}>Delete</button>
        </div>
      ))}
      <button onClick={() => dispatch({ type: "add_new" })}>Submit</button>

      {/* Displaying updated state */}
      {state.map(({ title, content }, key) => (
        <div key={key}>
          {title}:{content}
        </div>
      ))}
    </div>
  );
}

export default App;
