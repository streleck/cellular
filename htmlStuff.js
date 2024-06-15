const htmlStuff = {
    createNewBoard: (board) => {
        const boardElement = document.createElement('div');
        boardElement.classList.add('board');
        const rowCount = board.length;
        const columnCount = board[0].length;

        for (let row = 0; row < rowCount; row++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            boardElement.appendChild(rowElement);
            for (let column = 0; column < columnCount; column++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add(`x${row},y${column}`);
                cellElement.classList.add('cell');
                rowElement.appendChild(cellElement);
            }
        }

        return boardElement;
    },

    updateBoardDisplay: (boardElement, board) => {
        const rowCount = board.length
        const columnCount = board[0].length

        for (let row = 0; row < rowCount; row++) {
            for (let column = 0; column < columnCount; column++) {
                const cellElement = boardElement.getElementsByClassName(`x${row},y${column}`)[0]
                cellElement.setAttribute('data', `${board[row][column]}`)
            }
        }
    },

    colorHombre: (htmlNodeBoard) => {
        const startingColor = [255, 0, 0]
        const endColor = [0, 255, 255]
        
        const numberOfRows = htmlNodeBoard.childElementCount
        const numberOfColumns = htmlNodeBoard.firstChild.childElementCount
        
        const stepSize = [
            ( ( endColor[0] - startingColor[0] ) / numberOfRows ),
            ( ( endColor[1] - startingColor[1] ) / numberOfColumns),
            ( ( endColor[2] - startingColor[2] ) / ( numberOfRows + numberOfColumns ) )
        ]

        for (let row=0; row<numberOfRows; row++) {
            for(let column=0; column<numberOfColumns; column++) {
                const red = startingColor[0] + ( row * stepSize[0] )
                const green = startingColor[1] + ( column * stepSize[1] )
                const blue = startingColor[2] + ( ( row + column ) * stepSize[2] )
                const cell = htmlNodeBoard.childNodes[row].childNodes[column]
                cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
            }
        }
    },
}
