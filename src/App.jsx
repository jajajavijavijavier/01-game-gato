import { useState } from 'react'
import confetti from 'canvas-confetti'
import fondoUno from './imgs/fondoRosa.mp4'
import fondoDos from './imgs/fondoMorado.mp4'
import fondoTres from './imgs/fondoBlanco.mp4'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/winnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App () {
  let [fondo, setFondo] = useState(fondoUno)

  const cambiarFondo = (nuevoFondo) => {
    setFondo(nuevoFondo)
  }

  // funcion que permite guardar el estado de la partida en el local storage en un json
  const [board, setBoard] = useState(() => {
    console.log('inicializar estado')
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) { return JSON.parse(boardFromStorage) }
    return Array(9).fill(null)
  })

  // guardar aqui turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // Esto es un estado inicial como (board)que se activara con el (setBoard) en el array de nuestro espacios con valores nulos
  // const board = Array(9).fill(null)  - esto hace un listado del 1 al 10 en forma de array

  // -- null es que
  const [winner, setWinner] = useState(null)

  const resetGame = () => { // reseteamos los estados a iniciales
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // -- no actualiza el contenido de la funcion si esta ocupada por X O
    if (board[index] || winner) return

    // -- Actualiza el tablero
    const newBoard = [...board] // todos los elementos que tenga el board metemelos en un array
    newBoard[index] = turn // nos dara en que posicion esta dando el O o X ,al newBoard le damos el index y en este guardamos que turno tiene
    setBoard(newBoard) // muestra en el square el newBoard y esto lo actualiza

    // -- Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X // es un if de si es X el siguiente turno es de O
    setTurn(newTurn)

    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // -- Checar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) // ganador
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>Game of Cat</h1>
      <button className='botonesReinicio' onClick={resetGame}> Reset Game </button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

      <div className='colores'>
        <button className='color1' onClick={() => cambiarFondo(fondoDos)}> </button>
        <button className='color2' onClick={() => setFondo(fondoDos)}> </button>
        <button className='color3' onClick={() => setFondo(fondoDos)}> </button>
      </div>

      <div className='vid'>
        <video loop autoPlay muted>
          <source src={fondo} type='video/mp4' />
        </video>
      </div>

      <section>
        <div className='honoresNico'>
          <h1> Animacion creada por : </h1>
          <h2> @migliorereyes </h2>
        </div>
      </section>

    </main>
  )
}

export default App
