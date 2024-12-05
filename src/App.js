import React, { useState } from "react";
import Maze from "./Maze";
import SpeedInput from "./atoms/SpeedInput";
import githubIcon from "./assets/github.svg"

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
      className={`App ${value > 6 ? "h-100 " : "h-dvh " }  
        h-sm-vh px-5 py-5
      `}
    >
      <div className="mx-auto w-fit py-6 flex flex-col justify-center items-center gap-5 ">
        <h1 className="text-5xl text-white font-mono ">Rat in a Maze</h1>
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
      
      <div className="flex items-end justify-start flex-wrap overflow-hidden">
        <div className="flex md:flex-col flex-row gap-3 items-start">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-md"></div>
            <span className="text-lg text-white font-medium">Obstacle</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-yellow-300 rounded-md"></div>
            <span className="text-lg text-white font-medium">Visited</span>
          </div>
        
        </div>
        <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-green-500 rounded-md"></div>
            <span className="text-lg text-white font-medium">Correct Path</span>
          </div>
          <div className="flex gap-2 items-center w-9 h-9">
          <img
                      src={githubIcon}
                      alt="github icon"
                      className=" rat w-full object-cover"
                    />
            <a href="https://github.com/kartikey1112/rat-in-maze" className="text-lg text-white font-medium">Github</a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default App;
