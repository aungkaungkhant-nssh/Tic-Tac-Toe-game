import React from 'react'
import { useState } from 'react/cjs/react.development'
import Board from './Board'

function Game() {
    const [xIsNext,setXisNext]=useState(true)
    const [stepNumber,setStepNumber]=useState(0);
    const [history,setHistory]=useState([{square:Array(9).fill(null)}])
    const [status,setStatus]=useState({check:false,winner:""})
   
    const handleClick=(i)=>{
        if(!status.check){
            const previous=history.slice(0,stepNumber+1);
            let current=previous[previous.length-1];
            const square=current.square.slice();
            
        
            if(square[i]){
                return;
            }
            square[i]=xIsNext ? "X" : "O";
            
            setHistory(history.concat({square:square}))
            
            setStepNumber(previous.length);
            setXisNext(!xIsNext)
        }
    }
    ///winnner check
    if(!status.check){
        let win=cauclateWin(history[history.length-1].square);
         win && setStatus({check:true,winner:"Winner is "+win})
    }
    //history 
    const moves=history.map((step,move)=>{
        const desc = move ? 'Go to #' + move : 'Start the Game';
        return (
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{desc}</button>
            </li>
        )
    })
    ///jump history
    const jumpTo=(step)=>{
        setHistory(history.slice(0,step+1))

        setStepNumber(step)
        
        setXisNext((step%2)==0)
        setStatus({check:false,winner:""})
    }
    function cauclateWin(current){
        let lists=[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for(let i=0;i<lists.length;i++){
            const [a,b,c]=lists[i];
            if(current[a] && current[a]===current[b] && current[b]===current[c]){
                return current[a]
            }
        }
        return null;
    }
    
    
    return (
        <div className="game">
            <div className="game-board">
                <Board square={history[history.length-1].square} onClick={(i)=>handleClick(i)}/>
            </div>
            <div className="game-info">
                <div>{status.check ? status.winner :  xIsNext ? "Next Player is X":"Next Player is O"}</div>
                <ul>{moves}</ul>
            </div>
        </div>
    )
}

export default Game
