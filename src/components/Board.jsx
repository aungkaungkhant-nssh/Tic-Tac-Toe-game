import React from 'react'
import Square from './Square'

function Board({onClick,square}) {
    const renderSquare=(i)=>{
        return <Square value={square[i]} onClick={()=>onClick(i)}/>
    }
    return (
        <div>
            <div className="border-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="border-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="border-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

export default Board
