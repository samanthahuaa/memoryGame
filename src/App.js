import './App.css';
import { useState } from 'react';
import Tile from './Tile'

function App() {
  const [firstCard, setfirstCard] = useState(null);
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState([{value: 1, status: null}, {value: 1, status: null}, {value: 2, status: null}, {value: 2, status: null}, {value: 3, status: null}, {value: 3, status: null}]);

  function tileOnClick(id, status, value) {
    console.log("clicked");
    console.log(status);
    console.log(value);
    if (status !== "permFlipped") {
      let tempTiles = structuredClone(tiles);
      if (status === "flipped") {
        tempTiles[id].status = null
        setfirstCard(null);
      } else {
        tempTiles[id].status = "flipped";
        checkMatch(id, value);
      }
      setTiles(tempTiles);
    }
    console.log(status);
    console.log("done")
  }
  
  function checkMatch(id, inputValue) {
    if (firstCard == null) {
      setfirstCard({value: inputValue, id: id});
    } else {
      let tempTiles = structuredClone(tiles);
      if (firstCard.value === inputValue && id !== firstCard.id) {
        setScore(score + 1);
        for (let i=0; i<tempTiles.length; i++) {
          if (tempTiles[i].value === inputValue) {
            tempTiles[i].status = "permFlipped";
          }
// ALERT - need to make sure the order of the array stays the same so it renders on the screen in the same orientation; don't want to modify the state var, want to just copy the data into the temp and set the state at the end. no solution yet, must think
        }
        // tempTiles = tiles.filter((value, status) => value === inputValue).map((value, status) => status = 'permFlipped');
        // tempTiles.concat(tiles.filter((value, status) => value !== inputValue))
      } else {
        for (let i=0; i<tempTiles.length; i++) {
          if (tempTiles[i].status !== "permFlipped") {
            tempTiles[i].status = "";
          }
        }
        // tempTiles = tiles.filter((value, status) => status !== 'permFlipped').map((value, status) => status = null);
      }
      setTiles(tempTiles);
      setfirstCard(null);
    }
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
