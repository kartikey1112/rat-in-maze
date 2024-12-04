import React, { useState } from "react";
import Maze from "./Maze";
import SpeedInput from "./atoms/SpeedInput";

const App = () => {
  const [value, setValue] = useState(3);
  const [maze, setMaze] = useState(
    Array.from({ length: value }, () => Array(value).fill(1))
  );
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setSolved] = useState(false);
  const [speed, setSpeed] = useState(300);
  const handleMazeSizeChange = (newSize) => {
    setValue(newSize);
    setMaze(Array.from({ length: newSize }, () => Array(newSize).fill(1)));
  };

  const updateCell = (row, col, newValue) => {
    const updatedMaze = maze.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? newValue : cell
      )
    );
    setMaze(updatedMaze);
  };

  return (
    <div
      className={`App ${value > 6 ? "h-100 " : "h-dvh "}  
        h-sm-vh 
      `}
    >
      <div className="mx-auto w-fit py-14 flex flex-col justify-center items-center gap-5 ">
        <h1 className="text-5xl text-white font-mono mb-4">Rat in a Maze</h1>
        <div className="flex gap-2">
          <label htmlFor="numberInput" className="text-2xl text-white">
            Enter the size of Maze:
          </label>
          <input
            id="numberInput"
            className="text-center rounded-md"
            type="number"
            value={value}
            onChange={(e) => {
              let tar = e.target.value;
              let newValue = parseFloat(tar.charAt(tar.length - 1));
              if (!isNaN(newValue)) {
                newValue = Math.max(3, Math.min(8, newValue));
                handleMazeSizeChange(newValue);
              }
            }}
            min="3"
            max="8"
            disabled={isSolving || isSolved}
          />
        </div>
        <SpeedInput
          speed={speed}
          setSpeed={setSpeed}
          isSolved={isSolved}
          isSolving={isSolving}
        />
        <Maze
          maze={maze}
          updateCell={updateCell}
          isSolving={isSolving}
          setIsSolving={setIsSolving}
          setValue={setValue}
          setMaze={setMaze}
          speed={speed}
          setSpeed={setSpeed}
          setSolved={setSolved}
        />
      </div>
    </div>
  );
};

export default App;
