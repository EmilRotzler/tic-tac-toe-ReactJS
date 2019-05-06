import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// No reason for component if no state, 
// class Square extends React.Component {
//     // Square no longer keeps track of game state
//     // constructor(props){
//     //     super(props);
//     //     this.state = { value: null  };
//     // }

//     render() {
//       return (
//         <button 
//         className="square" 
//         onClick={() =>  this.props.onClick() }
//         >
//             {this.props.value}
//         </button>
//       );
//     }
//   }

// square function, square component REDACTED
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  // The board component
  class Board extends React.Component {
      // Board keeps track of state
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     }
    // }


    // Handles clicks
    // handleClick(i){
    //     const history = this.state.history;
    //     const current = history[history.length -1];
    //     const squares = this.state.squares.slice();
    //     // change nothing if square is already clicked
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //       }
    //     // Set the square to whoever is next
    //     squares[i] = this.state.xIsNext ? 'x' : 'o';
    //     // Update squares visual and change xIsNext
    //     this.setState({
    //         history: history.concat([{
    //             squares: squares,
    //           }]),
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    // Show value of square and call handleClick on click
    renderSquare(i) {
        return <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />;
    }

    // Render board with squares
   render() {
      //taken over by gamecheck and status update
      //const status = 'Next player: ' + (this.state.xIsNext ? 'x' : 'o');

     // Outdated winner calculation
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    //Old render DEPRECATED
      return (  
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
  }
}
  
  class Game extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              history: [{
                  squares: Array(9).fill(null),
              }],
              stepNumber: 0,
              xIsNext: true,
          }
      }

      handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = current.squares.slice();
        // change nothing if square is already clicked
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        // Set the square to whoever is next
        squares[i] = this.state.xIsNext ? 'x' : 'o';
        // Update squares visual and change xIsNext
        this.setState({
            history: history.concat([{
                squares: squares,
              }]),
              stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    };

    render() {
        const history = this.state.history;
        //const current = history[history.length - 1];
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
             'Go to move #' + move :
              'Go to game start';
              return(
                  <li key={move}>
                      <button onClick={() => this.jumpTo(move)} >{desc}</button>
                  </li>
              );
        });
    
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                />
      
              </div>
              <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
              </div>
            </div>
          );
    }
    
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

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