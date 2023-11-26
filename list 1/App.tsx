import { useState } from "react";
import "./App.css";

interface List {
  text: string;
  isDone: boolean;
}

export function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<List[]>([
    { text: "number one", isDone: false },
    { text: "number two", isDone: false },
  ]);
  function handleTextInput(e) {
    setInput(e.target.value);
  }
  function handleAdd(input: string) {
    if (input == "") return;
    const copy = [...list];
    copy.push({ text: input, isDone: false });
    setList(copy);
    setInput("");
  }
  function handleDelete(index: number) {
    const copy = [...list];
    copy.splice(index, 1);
    setList(copy);
  }
  function handleToggleDone(index: number, e) {
    const copy = [...list];
    copy[index].isDone = e.target.checked;
    setList(copy);
  }
  function handleMoveUp(index: number) {
    const copy = [...list];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setList(copy);
  }
  function handleMoveDown(index: number) {
    const copy = [...list];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    setList(copy);
  }
  return (
    <div>
      <h1>List that moves ?!?!?!</h1>
      {list.map((value, index) => {
        return (
          <p
            style={{
              textDecoration: value.isDone ? "line-through" : null,
              color: value.isDone ? "gray" : "black",
            }}
          >
            <input
              type="checkbox"
              onClick={(e) => {
                handleToggleDone(index, e);
              }}
            />
            {value.text}{" "}
            <button
              onClick={() => {
                handleDelete(index);
              }}
            >
              delete
            </button>
            {index !== 0 && (
              <button
                onClick={() => {
                  handleMoveUp(index);
                }}
              >
                move up
              </button>
            )}
            {index !== list.length - 1 && (
              <button
                onClick={() => {
                  handleMoveDown(index);
                }}
              >
                move down
              </button>
            )}
          </p>
        );
      })}

      <input type="text" value={input} onChange={handleTextInput} />
      <button
        onClick={() => {
          handleAdd(input);
        }}
      >
        Add
      </button>
    </div>
  );
}
