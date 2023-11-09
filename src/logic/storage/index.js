export const saveGameToStorage = ({ board, turn }) => {
// guardamos en el local storage
// guardar aqui partida
  window.localStorage.setItem('board', JSON.stringify(board)) // guarda en el local storage el newBoard en formato JSON
  window.localStorage.setItem('turn', turn) // guarda en el local storage el newTurn en formato JSON
}

export const resetGameStorage = () => {
// reseteamos el juego
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
