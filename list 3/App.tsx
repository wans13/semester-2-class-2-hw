import { useState } from "react";
import "./App.css";

interface List {
  apple: string;
  eatten: boolean;
}

function App() {
  const [list, setList] = useState<List[]>([
    { apple: "apple", eatten: false },
    { apple: "aPple", eatten: false },
    { apple: "APPLE", eatten: false },
    { apple: "aple", eatten: false },
    { apple: "Apple", eatten: false },
    { apple: "Apple?", eatten: false },
  ]);
  const [input, setInput] = useState("");
  function handleDeleteApple(index: number) {
    const appleList = [...list];
    appleList.splice(index, 1);
    setList(appleList);
  }
  function handleAppleInput(e) {
    setInput(e.target.value);
  }
  function handleAddApple() {
    if (input == "") return;
    const apple = [...list];
    apple.push({ apple: input, eatten: false });
    setList(apple);
    setInput("");
  }
  function handleEatApple(index: number, eat) {
    const apple = [...list];
    apple[index].eatten = eat.target.checked;
    setList(apple);
  }
  function handleAppleHigher(index: number) {
    const apple = [...list];
    const worm = apple[index - 1];
    apple[index - 1] = apple[index];
    apple[index] = worm;
    setList(apple);
  }
  function handleAppleLower(index: number) {
    const apple = [...list];
    const worm = apple[index + 1];
    apple[index + 1] = apple[index];
    apple[index] = worm;
    setList(apple);
  }
  return (
    <div>
      <h1>Apple list</h1>
      {list.map((value, index) => {
        return (
          <p
            style={{
              textDecoration: value.eatten ? "line-through" : null,
              color: value.eatten ? "red" : "black",
            }}
          >
            <input
              type="checkbox"
              onClick={(eat) => {
                handleEatApple(index, eat);
              }}
            />
            {value.apple}{" "}
            <button
              onClick={() => {
                handleDeleteApple(index);
              }}
            >
              Delete Apple
            </button>
            {index !== 0 && (
              <button
                onClick={() => {
                  handleAppleHigher(index);
                }}
              >
                Higher
              </button>
            )}
            {index !== list.length - 1 && (
              <button
                onClick={() => {
                  handleAppleLower(index);
                }}
              >
                Lower
              </button>
            )}
          </p>
        );
      })}
      <input
        type="text"
        value={input}
        onChange={handleAppleInput}
        placeholder="apple"
      />
      <button onClick={handleAddApple}>Add Apple</button>
    </div>
  );
}

export default App;
