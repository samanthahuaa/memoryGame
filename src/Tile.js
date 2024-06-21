import './Tile.css'

export default function Tile({value, status, onClick}) {
    return (
        <div class="tile {status}" onClick={onClick}>
            <h1>{value}</h1>
        </div>
    )
}
