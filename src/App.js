import './App.css';
import { useState } from 'react';
import Tile from './Tile'

function App() {
  const [firstCard, setfirstCard] = useState('');
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState([{value: 1, status: ''}, {value: 2, status: ''}, {value: 3, status: ''}, {value: 4, status: ''}, {value: 5, status: ''}, {value: 6, status: ''}]);

  function tileOnClick(status, value) {
    if (status !== 'permFlipped') {
      if (status != null) {
        status = null;
      } else {
        status = 'flipped';
        checkMatch(value);
      }
    }
  }
  
  function checkMatch(inputValue) {
    if (firstCard == null) {
      setfirstCard(inputValue);
    } else {
      let tempTiles = [];
      if (firstCard === inputValue) {
        setScore(score + 1);
        for (let i=0; i<tiles.length; i++) {
          if (tiles[i].value === inputValue) {
            tiles[i].status = 'permFlipped';
          }
// ALERT - need to make sure the order of the array stays the same so it renders on the screen in the same orientation; don't want to modify the state var, want to just copy the data into the temp and set the state at the end. no solution yet, must think
        }
        // tempTiles = tiles.filter((value, status) => value === inputValue).map((value, status) => status = 'permFlipped');
        // tempTiles.concat(tiles.filter((value, status) => value !== inputValue))
      } else {
        tempTiles = tiles.filter((value, status) => status !== 'permFlipped').map((value, status) => status = null);
      }
      setTiles(tempTiles);
    }
  }

  return (
    <div className="App">
      {tiles.map((value, status) =>
        {<Tile value={value} status={status} onClick={tileOnClick}/>}
      )}
    </div>
  );
}

export default App;
