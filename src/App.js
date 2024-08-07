import './App.css';
import { useState, useEffect } from 'react';
import Tile from './Tile'
import Delay from './Delay'

function App() {
  const [firstCard, setfirstCard] = useState(null);
  const [tiles, setTiles] = useState(randomizeArray());
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    if (score === 3) {
      alert("You won!")
    }
  }) 

  function randomizeArray() {
    let array = [{value: "bear.jpg", status: null}, {value: "bear.jpg", status: null}, {value: "frog.jpg", status: null}, {value: "frog.jpg", status: null}, {value: "owl.png", status: null}, {value: "owl.png", status: null}];
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

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

    tempTiles[id].status = "flipped";
    if (firstCard == null) {
      setfirstCard({value: inputValue, id: id});
    } else {
      //////////
      //while (delay) {

      //}
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

  function restart() {
    if (score != 3) {
      alert("You have not finished the game yet!")
    } else {
      setScore(0);
      setTiles(randomizeArray());
    }
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  return (
    <div className="App">
      <head>
        <title>lil memory game</title>
      </head>
      <body>
        <center><h2>Score: {score}</h2></center>
        <div className="board">
          {tiles.map((tile, index) => {
            return (
              <Tile key={index} value={tile.value} status={tile.status} onClickFunc={() => tileOnClick(index, tile.status, tile.value)}/>
            )
            
          })}
        </div>
        <button onClick={restart}>Restart</button>
      </body>
    </div>
  );
}

export default App;
