import { WINNER_COMBOS } from '../constants.js'

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) { // se creo boardToCheck para checar todos los combos de winner_combos
    const [a, b, c] = combo // usamos los datos de los arrays donde los evaluaremos
    if (
      boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
    ) {
      // retornara quien es el ganador
      return boardToCheck[a]
    }
  }
  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null) // si en el tablero todos los squares tienen que es diferente a null se acaba el juego
}
