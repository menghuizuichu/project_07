import React, { useState } from 'react';
import './App.css';
import './style.css';

function App() {
  const [board, setBoard] = useState(Array(15).fill(null).map(() => Array(15).fill(null)));  // 15x15 的棋盘
  const [isNext, setIsNext] = useState(true);  // true表示是'X'的回合，false表示是'O'的回合
  const [winner, setWinner] = useState(null); // 存储当前获胜者

  // 判断是否有玩家获胜
  const checkWinner = (board) => {
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        if (board[row][col] !== null) {
          const current = board[row][col];
          
          // 横向检查
          if (col + 4 < 15 && board[row][col] === current &&
            board[row][col + 1] === current &&
            board[row][col + 2] === current &&
            board[row][col + 3] === current &&
            board[row][col + 4] === current) {
            return current;
          }
          
          // 纵向检查
          if (row + 4 < 15 && board[row][col] === current &&
            board[row + 1][col] === current &&
            board[row + 2][col] === current &&
            board[row + 3][col] === current &&
            board[row + 4][col] === current) {
            return current;
          }

          // 主对角线检查
          if (row + 4 < 15 && col + 4 < 15 && board[row][col] === current &&
            board[row + 1][col + 1] === current &&
            board[row + 2][col + 2] === current &&
            board[row + 3][col + 3] === current &&
            board[row + 4][col + 4] === current) {
            return current;
          }

          // 副对角线检查
          if (row - 4 >= 0 && col + 4 < 15 && board[row][col] === current &&
            board[row - 1][col + 1] === current &&
            board[row - 2][col + 2] === current &&
            board[row - 3][col + 3] === current &&
            board[row - 4][col + 4] === current) {
            return current;
          }
        }
      }
    }
    return null;
  };

  // 点击棋盘上的每个格子
  const handleClick = (row, col) => {
    if (board[row][col] || winner) return; // 如果该位置已被占用或已经有胜者，不能继续点击

    const newBoard = board.map((r, rowIndex) => (
      rowIndex === row ? r.map((cell, colIndex) => (colIndex === col ? (isNext ? 'X' : 'O') : cell)) : r
    ));

    const newWinner = checkWinner(newBoard);  // 检查是否有玩家获胜
    setBoard(newBoard);
    setIsNext(!isNext);
    setWinner(newWinner);
  };

  // 渲染棋盘
  const renderSquare = (row, col) => (
    <button className="square" onClick={() => handleClick(row, col)}>
      {board[row][col]}
    </button>
  );

  // 渲染棋盘
  const renderBoard = () => {
    const boardElements = [];
    for (let row = 0; row < 15; row++) {
      const rowElements = [];
      for (let col = 0; col < 15; col++) {
        rowElements.push(renderSquare(row, col));
      }
      boardElements.push(
        <div key={row} className="board-row">
          {rowElements}
        </div>
      );
    }
    return boardElements;
  };

  return (
    <div className="game">
      <div className="game-board">
        <h1>五子棋游戏</h1>
        {winner ? <div className="winner">胜者: {winner}</div> : <div className="next-player">{isNext ? '轮到 X' : '轮到 O'}</div>}
        <div className="board">
          {renderBoard()}
        </div>
      </div>
    </div>
  );
}

export default App;
