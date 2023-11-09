// onstante que dara las diferentes funciones
// children es el primer valor en el array

export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}` // llamamos a square para visualizar el css y si esta activo isSelected mostrara el css del turno en que se encuentre
  // esto hace un renderizado condicional en cuanto a quien le toca

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
