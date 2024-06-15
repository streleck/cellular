
let board = boards.silly
console.log(board)

// let board = boards.gully.map((row) => {
    //     return row.map((cell) => {
        //         return !!cell
        //     })
        // })
        

const boardElement = htmlStuff.createNewBoard(board)
document.getElementById('board').appendChild(boardElement)
htmlStuff.colorHombre(boardElement)
htmlStuff.updateBoardDisplay(boardElement, board)

let limit = 500
this.haha = setInterval(() => {
    if (limit <= 0) {
        clearInterval(haha)
    }
    htmlStuff.updateBoardDisplay(boardElement, board)
    board = rules.nextLife(board)
    limit -= 1
}, 160)