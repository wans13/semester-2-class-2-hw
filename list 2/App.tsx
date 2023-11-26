import { useState } from "react";
import "./App.css";

interface List {
  title: string;
  completion: boolean;
}

export function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<List[]>([
    { title: "A", completion: false },
    { title: "c", completion: false },
    { title: "b", completion: false },
    { title: "d", completion: false },
  ]);
  function handleInputChanges(e) {
    setInput(e.target.value);
  }
  function handleAddEntry() {
    if (input == "") return;
    const copy = [...list];
    copy.push({ title: input, completion: false });
    setList(copy);
    setInput("");
  }
  function handleDeleteEntry(index: number) {
    const copy = [...list];
    copy.splice(index, 1);
    setList(copy);
  }
  function handleToggleDone(index: number, e) {
    const copy = [...list];
    copy[index].completion = e.target.checked;
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
      <h1>list number two</h1>
      {list.map((value, index) => {
        return (
          <p
            style={{
              textDecoration: value.completion ? "line-through" : null,
              color: value.completion ? "gray" : "black",
            }}
          >
            <input
              type="checkbox"
              onClick={(e) => {
                handleToggleDone(index, e);
              }}
            />
            {value.title}
            <button
              onClick={() => {
                handleDeleteEntry(index);
              }}
            >
              Delete Entry
            </button>

            {index !== 0 && (
              <button
                onClick={() => {
                  handleMoveUp(index);
                }}
              >
                &uarr;
              </button>
            )}
            {index !== list.length - 1 && (
              <button
                onClick={() => {
                  handleMoveDown(index);
                }}
              >
                &darr;
              </button>
            )}
          </p>
        );
      })}
      <input type="text" value={input} onChange={handleInputChanges} />
      <button onClick={handleAddEntry}>Add Entry</button>
    </div>
  );
}
