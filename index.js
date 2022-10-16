//Global variables
const boardRegions = document.querySelectorAll('#gameBoard span')
const turnPlayertitle = document.querySelector('#turnPlayer')
let vBoard = []
let turnPlayer = ''

function updateTurnTitle(){
  turnPlayertitle.innerText = turnPlayer
}

function initializeGame(){
  //Initialize global variables
  vBoard = [['','',''],['','',''],['','','']]
  turnPlayer = 'Player 1'
  //Adjust title
  turnPlayer.innerText = ''
  updateTurnTitle()
  //Clean the regions of game
  boardRegions.forEach( element => {
    element.classList.remove('win')
    element.innerText = ''
    element.addEventListener('click', boardEventClick)
  })
}

function getWinRegions(){
  let winRegions = []
  //rows
  if ( vBoard[0][0] && vBoard[0][0] == vBoard[0][1] && vBoard[0][0] == vBoard[0][2] ){
    winRegions.push("0.0", "0.1", "0.2")
  }
  if ( vBoard[1][0] && vBoard[1][0] == vBoard[1][1] && vBoard[1][0] == vBoard[1][2] ){
    winRegions.push("1.0", "1.1", "1.2")
  }
  if ( vBoard[2][0] && vBoard[2][0] == vBoard[2][1] && vBoard[2][0] == vBoard[2][2] ){
    winRegions.push("2.0", "2.1", "2.2")
  }
  //columns
  if ( vBoard[0][0] && vBoard[0][0] == vBoard[1][0] && vBoard[0][0] == vBoard[2][0] ){
    winRegions.push("0.0", "1.0", "2.0")
  }
  if ( vBoard[0][1] && vBoard[0][1] == vBoard[1][1] && vBoard[0][1] == vBoard[2][1] ){
    winRegions.push("0.1", "1.1", "2.1")
  }
  if ( vBoard[0][2] && vBoard[0][2] == vBoard[1][2] && vBoard[0][2] == vBoard[2][2] ){
    winRegions.push("0.2", "1.2", "2.2")
  }
  //diagonal
  if ( vBoard[0][0] && vBoard[0][0] == vBoard[1][1] && vBoard[0][0] == vBoard[2][2] ){
    winRegions.push("0.0", "1.1", "2.2")
  }
  if ( vBoard[0][2] && vBoard[0][2] == vBoard[1][1] && vBoard[0][2] == vBoard[2][0] ){
    winRegions.push("0.2", "1.1", "2.0")
  }
  return winRegions
}

function handleWinner( winRegions ){

  winRegions.forEach( item => {
    document.querySelector(`[data-region="${item}"]`).classList.add('win')
  })

  turnPlayertitle.innerText = `${turnPlayer} win 🎉`

  boardRegions.forEach( element => {
    disableBoardEventClick( element )
  })

}

function disableBoardEventClick( span ){
  span.removeEventListener('click', boardEventClick)
}

function boardEventClick( ev ){

  //Get clicked element
  const span = ev.currentTarget
  const region = span.dataset.region
  const rowColumnPair = region.split('.')
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  
  //Set region according to player
  if( turnPlayer == 'Player 1' ){
    span.innerText = 'X'
    vBoard[row][column] = 'X'
  }else{
    span.innerText = 'O'
    vBoard[row][column] = 'O'
  }

  //Disable board event click
  disableBoardEventClick(span)

  //Verify if someone win
  const winRegions = getWinRegions()

  if( winRegions.length > 0){
    handleWinner( winRegions )
  }else if( vBoard.flat().includes('') ){
    turnPlayer = turnPlayer === 'Player 1' ? 'Player 2' : 'Player 1'
    updateTurnTitle()
  }else{
    turnPlayertitle.innerText = 'EMPATE';
  }

}

//Initialize the game
document.querySelector('#start').addEventListener('click', initializeGame)