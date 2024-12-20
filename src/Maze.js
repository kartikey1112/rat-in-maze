import { useState, useEffect, useRef } from "react";
import ratImage from "./assets/rat.png";
import cheeseImage from "./assets/cheese.png";

const Maze = ({
  maze,
  updateCell,
  setIsSolving,
  isSolving,
  setValue,
  setMaze,
  speed,
  setSolved,
}) => {
  const [ratPosition, setRatPosition] = useState({ row: 0, col: 0 });
  const [visited, setVisited] = useState([]);
  const [solvedPath, setSolvedPath] = useState([]);
  const cancelSolveRef = useRef(false);

  // const resetAll =  () => {
  //   cancelSolveRef.current = true;
  //   setSolvedPath([])
  //   setIsSolving(false);
  //   setVisited(maze.map((row) => row.map(() => false)));
  //   setSolved(false);
  //   setRatPosition({ row: 0, col: 0 });
  //   const initialSize = 3;
  //   setValue(3);
  //   setMaze(
  //     Array.from({ length: initialSize }, () => Array(initialSize).fill(1))
  //   );
  // };

  const numRows = maze.length;
  const numCols = maze[0]?.length || 0;

  const directions = [
    { row: 1, col: 0 },
    { row: 0, col: 1 },
    { row: -1, col: 0 },
    { row: 0, col: -1 },
  ];

  useEffect(() => {
    if (maze.length > 0 && maze[0].length > 0) {
      setVisited(maze.map((row) => row.map(() => false)));
    }
  }, [maze]);

  const solveMaze = async (row, col, localVisited) => {
    if (cancelSolveRef.current) {
      return false;
    }

    if (row === numRows - 1 && col === numCols - 1) {
      setRatPosition({ row, col });
      setSolvedPath((path) => [...path, { row, col }]);
      return true;
    }

    if (!isSafe(row, col, localVisited)) return false;

    localVisited[row][col] = true;

    setRatPosition({ row, col });
    setVisited(localVisited.map((row) => [...row]));
    await delay(speed);

    for (const { row: dRow, col: dCol } of directions) {
      if (await solveMaze(row + dRow, col + dCol, localVisited)) {
        setSolved(true);
        setSolvedPath((path) => [...path, { row, col }]);
        return true;
      }
    }
    localVisited[row][col] = false;
    setVisited(localVisited.map((row) => [...row]));
    await delay(speed);
    return false;
  };

  const isSafe = (row, col, localVisited) => {
    return (
      row >= 0 &&
      col >= 0 &&
      row < numRows &&
      col < numCols &&
      maze[row] &&
      maze[row][col] === 1 &&
      !localVisited[row][col]
    );
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const startSolving = () => {
    cancelSolveRef.current = false;
    setIsSolving(true);
    const localVisited = maze.map((row) => row.map(() => false));
    solveMaze(0, 0, localVisited).then((solved) => {
      if (!solved && ! cancelSolveRef.current) 
      alert("No solution exists!");
      setIsSolving(false);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center px-6">
      <div className="grid grid-cols-1 gap-2">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((cell, colIndex) => {
              const isTarget =
                rowIndex === maze.length - 1 && colIndex === maze.length - 1;
              const isRat =
                ratPosition.row === rowIndex && ratPosition.col === colIndex;
              const isVisited =
                visited[rowIndex] && visited[rowIndex][colIndex];
              return (
                <div
                  key={colIndex}
                  className="w-8 h-8 block rounded-md relative cursor-pointer"
                  onClick={() => {
                    if (!isSolving && !isTarget) {
                      return updateCell(
                        rowIndex,
                        colIndex,
                        maze[rowIndex][colIndex] === 1 ? 0 : 1
                      );
                    }
                  }}
                >
                  {isRat ? (
                    <img
                      src={ratImage}
                      alt="Rat"
                      className="absolute rat inset-0 w-full object-cover"
                    />
                  ) : rowIndex === maze.length - 1 &&
                    colIndex === maze[0].length - 1 ? (
                    <img
                      src={cheeseImage} // Add your cheese image here
                      alt="Cheese"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full rounded-md ${
                        solvedPath.some(
                          (cell) =>
                            cell.row === rowIndex &&
                            cell.col  === colIndex
                        )
                          ? "bg-green-500"
                          : isVisited
                          ? "bg-yellow-300"
                          : cell === 1
                          ? "bg-white"
                          : "bg-gray-700"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={startSolving}
          disabled={isSolving}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {isSolving ? "Solving..." : "Start Solving"}
        </button>
        <button
          onClick={()=>{window.location.reload()}}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Reset
        </button>
      </div>
      <span className="text-sm text-white mt-3">Click on the cell to add obstacle</span>
    </div>
  );
};

export default Maze;
