// import { useState } from 'react';
import './Tile.css'

function Tile({value, status, onClickFunc}) {
    return (
        <div className={"tile "+ status} onClick={onClickFunc}>
            <img src={require(`./${value}`)} alt={"error, supposed to display "+value}/>
        </div>
    )
}

export default Tile;