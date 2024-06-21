import './Tile.css'

function Tile({value, status, onClickFunc}) {
    return (
        <div className={"tile "+ status} onClick={onClickFunc}>
            <h1>{value}</h1>
        </div>
    )
}

export default Tile;