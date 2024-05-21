import { useState } from "react"; //component uses state to 'remember', e.g. remember it got clicked

//props are component's arguments
function Square({ value, frozen, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      onContextMenu={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  isFreezeClicked,
  setIsFreezeClicked,
  squares,
  onPlay,
}) {
  function handleClick(i, e) {
    const nextSquares = squares.slice();
    /*
    check if the square is frozen(the square is frozen until it's clicked)
    if so, your move is ignored and the game goes on
     We unfreeze it for the future plays
    */
    if (squares[i].frozen === true) {
      nextSquares[i] = { ...nextSquares[i], frozen: false };
      onPlay(nextSquares);
      return;
    }

    /*
    check if the freezing mode is on(button triggered)
    freeze the cell, change the state of setIsFreezeClicked to default false
    and let your opponent play
    */
    if (isFreezeClicked) {
      nextSquares[i] = { ...nextSquares[i], frozen: true };
      setIsFreezeClicked(false);
      onPlay(nextSquares);
      return;
    }

    //exit if there is a winner already
    if (calculateWinner(squares)) return;

    //overwriting possible only if 2 squares are completed (avoiding possible infinite loop at the beggining)
    const nonEmptySquares = squares.filter((sq) => sq !== null).length;
    if (squares[i].value && nonEmptySquares < 3) return;

    //you can't overwrite if the new placement makes the game over(no matter who wins)
    const copySquares = squares.slice();
    copySquares[i] = { ...copySquares[i], value: xIsNext ? "X" : "O" };

    if (squares[i].value && calculateWinner(copySquares) !== null) return;

    /*
    Reasons React uses immutability to change data(i.e. we had to create a new array here):
    -keeping previous versions of the data and perhaps reusing them later
    -we can check if component's data has been changed
    */

    //event type "context menu" refers to right click on mouse
    if (e.type === "contextmenu" && squares[i].value) {
      //we are overwriting with empty square
      nextSquares[i] = { ...nextSquares[i], value: null };
    } else {
      nextSquares[i] = { ...nextSquares[i], value: xIsNext ? "X" : "O" };
    }

    //send modified squares to game component - game calls his onPlay handler -handlePlay
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    console.log(status);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //rendering
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0].value}
          frozen={squares[0].frozen}
          onSquareClick={(e) => handleClick(0, e)}
        />
        <Square
          value={squares[1].value}
          frozen={squares[1].frozen}
          onSquareClick={(e) => handleClick(1, e)}
        />
        <Square
          value={squares[2].value}
          frozen={squares[2].frozen}
          onSquareClick={(e) => handleClick(2, e)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3].value}
          frozen={squares[3].frozen}
          onSquareClick={(e) => handleClick(3, e)}
        />
        <Square
          value={squares[4].value}
          frozen={squares[4].frozen}
          onSquareClick={(e) => handleClick(4, e)}
        />
        <Square
          value={squares[5].value}
          frozen={squares[5].frozen}
          onSquareClick={(e) => handleClick(5, e)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6].value}
          frozen={squares[6].frozen}
          onSquareClick={(e) => handleClick(6, e)}
        />
        <Square
          value={squares[7].value}
          frozen={squares[7].frozen}
          onSquareClick={(e) => handleClick(7, e)}
        />
        <Square
          value={squares[8].value}
          frozen={squares[8].frozen}
          onSquareClick={(e) => handleClick(8, e)}
        />
      </div>
    </>
  );
}

export default function Game() {
  /*
  history array is 2D, with each array being a replica of then current array
  setSomething = function to change the state of Something
  useState is used for initialising Something
  */
  const [history, setHistory] = useState([
    Array(9).fill({ value: null, frozen: false }),
  ]);

  const [isFreezeClicked, setIsFreezeClicked] = useState(false);

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
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleFreezeButtonClick() {
    setIsFreezeClicked(true);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move " + move;
    } else {
      description = "Go to game start";
    }

    /*
      Keys tell React the identity of list's item to differentiate him from others.
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
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            isFreezeClicked={isFreezeClicked}
            setIsFreezeClicked={setIsFreezeClicked}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
      <div className="freeze-container">
        <button onClick={handleFreezeButtonClick}>Freeze</button>
        {isFreezeClicked && <p>Select a square to freeze</p>}
      </div>
    </>
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
    if (
      squares[a].value &&
      squares[a].value === squares[b].value &&
      squares[a].value === squares[c].value
    ) {
      return squares[a].value;
    }
  }
  return null;
}
