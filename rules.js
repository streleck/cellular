const rules = {
    countLiveNeighbors: (board, row, column) => {
        const startingRow = Math.max(row - 1, 0)
        const endingRow = Math.min(row + 1, board.length -1)
        const startingColumn = Math.max(column - 1, 0)
        const endingColumn = Math.min(column + 1, board[0].length -1)

        let totalLiveNeighborCount = 0
        for (let i = startingRow; i <= endingRow; i++) {
            for (let j = startingColumn; j <= endingColumn; j++) {
                if (i === row && j === column) {
                    continue
                }
                if (board[i][j]) {
                    totalLiveNeighborCount++
                }
            }
        }
        return totalLiveNeighborCount
    },

    countLiveNeighborsWrap: (board, row, column) => {
        const rows = [
            (row-1 >= 0) ? row-1 : board.length-1,
            row,
            (row+1 < board.length) ? row+1 : 0,
        ]
        const columns = [
            (column-1 >= 0) ? column-1 : board[0].length-1,
            column,
            (column+1 < board[0].length) ? column+1 : 0,
        ]
        
        let liveNeighborCount = 0
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (i === 1 && j === 1) {
                    continue
                }
                if (board[rows[i]][columns[j]]) {
                    liveNeighborCount++
                }
            }
        }
        return liveNeighborCount
    },

    gameOfLifeRules: (board, row, column, wrappingEnabled) => {
        const countLiveNeighbors = wrappingEnabled
            ? rules.countLiveNeighborsWrap
            : rules.countLiveNeighbors

        const squareIsAlive = board[row][column]
        const liveNeighbors = countLiveNeighbors(board, row, column)
        if (squareIsAlive) {
            return (liveNeighbors >= 2 && liveNeighbors <= 3)
        } else {
            return liveNeighbors === 3
        }
    },

    createBlankBoard: function (numRows, numColumns) {
        const board = []
        for (let i=0; i<numRows; i++) {
            const newRow = Array(numColumns)
            board.push(newRow)
        }
        return board
    },

    nextGeneration: (board, ruleSet, wrappingEnabled) => {
        const numRows = board.length
        const numColumns = board[0].length
        const newBoard = rules.createBlankBoard(numRows, numColumns)
        for (let row = 0; row < numRows; row++) {
            for (let column = 0; column < numColumns; column++) {
                const squareShouldLive = ruleSet(board, row, column, wrappingEnabled)

                newBoard[row][column] = squareShouldLive
            }
        }
        return newBoard
    },

    advanceGenerations: (board, numGenerations) => {
        board = [...board]
        for (let i=0; i<numGenerations; i++) {
            board = rules.nextGeneration(board, rules.gameOfLifeRules)
        }
        return board
    },

    nextLife: (board) => {
        return rules.nextGeneration(board, rules.gameOfLifeRules, true)
    }
}