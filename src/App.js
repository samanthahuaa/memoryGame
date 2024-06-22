import './App.css';
import { useState } from 'react';
import Tile from './Tile'

function App() {
  const [firstCard, setfirstCard] = useState(null);
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState([{value: 1, status: null}, {value: 1, status: null}, {value: 2, status: null}, {value: 2, status: null}, {value: 3, status: null}, {value: 3, status: null}]);

  function tileOnClick(id, status, value) {
    
    if (status !== "permFlipped") {
      if (status === "flipped") {
        let tempTiles = structuredClone(tiles);
        tempTiles[id].status = null
        setfirstCard(null);
        setTiles(tempTiles);
      } else {
        checkMatch(id, value);
      }
    }
  }
  
  function checkMatch(id, inputValue) {
    let tempTiles = structuredClone(tiles);

    if (firstCard == null) {
      setfirstCard({value: inputValue, id: id});
      tempTiles[id].status = "flipped";
    } else {
      if (firstCard.value === inputValue && id !== firstCard.id) {
        for (let i=0; i<tempTiles.length; i++) {
          if (tempTiles[i].value === inputValue) {
            tempTiles[i].status = "permFlipped";
          }
        }
        setScore(score + 1);
      } else {
        for (let i=0; i<tempTiles.length; i++) {
          if (tempTiles[i].status !== "permFlipped") {
            tempTiles[i].status = "";
          }
        }
      }
      
      setfirstCard(null);
    }
    setTiles(tempTiles);
  }

  return (
    <div className="App">
      <div className="board">
        {tiles.map((tile, index) => {
          return (
            <Tile key={index} value={tile.value} status={tile.status} onClickFunc={() => tileOnClick(index, tile.status, tile.value)}/>
          )
          
        })}
      </div>
      <h2>Score: {score}</h2>
      {/* <h2>firstCard: {firstCard}</h2> */}
    </div>
  );
}

export default App;
