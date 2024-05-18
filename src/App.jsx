import { useState } from "react"; //component uses state to 'remember', e.g. remember it got clicked

//props are component's arguments
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    //exit if the square is not empty or there is a winner already
    if (squares[i] || calculateWinner(squares)) return;

    //here we copy the currect squares into the nextSquares
    const nextSquares = squares.slice();
    /*
    Reasons React uses immutability to change data(i.e. we had to create a new array here):
    -keeping previous versions of the data and perhaps reusing them later
    -we can check if component's data has been changed
    */
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }
  //each div tag represents one row
  //with an arrow function we make sure that when the square is clicked, the handler runs
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  /*
  history array here has only 1 item, and that is an array of 9 elements
  setSomething = function to change the state of Something
  useState is used for initialising Something
  */
  const [history, setHistory] = useState([Array(9).fill(null)]);

  //keeping track of which step the user is currently viewing
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 == 0;

  //rendering the currently selected move
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    /*
      when we "go back" in history, we want to erase the "future" we have 
      already been to
    */
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 == 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move " + move;
    } else {
      description = "Go to game start";
    }

    /*
      keys tell React the identity of list's item to differentiate him from others
      Lists are dynamic and they change, so when a list is re-rendered,
      React compares current list's key and previous list's key
    */

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//copied
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
