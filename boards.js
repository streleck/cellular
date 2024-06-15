
const boardOperations = {
    createRowOfZeroes: function (numberOfColumns) {
        const newRow = []
        for (let i=0; i<numberOfColumns; i++) {
            newRow.push(0)
        }
        return newRow
    },

    createRowOf: function (numberOfColumns, thing = 0) {
        const newRow = []
        for (let i=0; i<numberOfColumns; i++) {
            newRow.push(thing)
        }
        return newRow
    },

    addPaddingLeft: function (board, amountOfPadding, padWith = 0) {
        return board.map((row) => {
            for (let i=0; i<amountOfPadding; i++) {
                row.unshift(padWith)
            }
            return row
        })
    },

    addPaddingRight: function (board, amountOfPadding, padWith = 0) {
        return board.map((row) => {
            for (let i=0; i<amountOfPadding; i++) {
                row.push(padWith)
            }
            return row
        })
    },

    addPaddingTop: function (board, amountOfPadding, padWith = 0) {
        const newBoard = [...board]
        const numberOfColumns = board[0].length
        for (let i=0; i<amountOfPadding; i++) {
            newBoard.unshift(this.createRowOf(numberOfColumns, padWith))
        }
        return newBoard
    },

    addPaddingBottom: function (board, amountOfPadding, padWith) {
        const newBoard = [...board]
        const numberOfColumns = board[0].length
        for (let i=0; i<amountOfPadding; i++) {
            newBoard.push(this.createRowOf(numberOfColumns, padWith))
        }
        return newBoard
    },

    addPadding: function (board, amountOfPadding, padWith = 0) {
        let newBoard = [...board]
        newBoard = this.addPaddingLeft(newBoard, amountOfPadding, padWith)
        newBoard = this.addPaddingRight(newBoard, amountOfPadding, padWith)
        newBoard = this.addPaddingTop(newBoard, amountOfPadding, padWith)
        newBoard = this.addPaddingBottom(newBoard, amountOfPadding, padWith)
        return newBoard
    },

    combineHorizontal: function (left, right) {
        if (left.length !== right.length) {
            throw new Error('boards must have same number of rows to combine horizontally')
        }

        const final = []
        for (let row = 0; row < left.length; row++) {
            final.push([...left[row], ...right[row]])
        }
        return final
    },

    combineVertical: function (top, bottom) {
        if (top[0].length !== bottom[0].length) {
            throw new Error('boards must have same number of rows to combine vertically')
        }

        return [...top, ...bottom]
    },

    rotateCounterClockwise: function (board) {
        const final = []
        const numRowsFinal = board[0].length
        const numColumnsFinal = board.length
        for (let row = numRowsFinal-1; row >= 0; row--) {
            const newRow = []
            for (let column = 0; column < numColumnsFinal; column++) {
                newRow.push(board[column][row])
            }
            final.push(newRow)
        }
        return final
    },
    
    rotateClockwise: function (board) {
        const final = []
        const numRowsFinal = board[0].length
        const numColumnsFinal = board.length
        for (let row = 0; row < numRowsFinal; row++) {
            const newRow = []
            for (let column = numColumnsFinal-1; column >= 0; column--) {
                newRow.push(board[column][row])
            }
            final.push(newRow)
        }
        return final
    },

    flipHorizontal: function (board) {
        const final = []
        const numRowsFinal = board.length
        const numColumnsFinal = board[0].length
        for (let row = 0; row < numRowsFinal; row++) {
            const newRow = []
            for (let column = numColumnsFinal-1; column >= 0; column--) {
                newRow.push(board[row][column])
            }
            final.push(newRow)
        }
        return final
    },

    flipVertical: function (board) {
        const final = []
        const numRowsFinal = board.length
        const numColumnsFinal = board[0].length 
        for (let row = numRowsFinal-1; row >= 0; row--) {
            const newRow = []
            for (let column = 0; column < numColumnsFinal; column++) {
                newRow.push(board[row][column])
            }
            final.push(newRow)
        }
        return final
    },

    placeAt: function (baseBoard, insertedBoard, row, column) {
        let final = []
        const endingRow = row + insertedBoard.length - 1
        const endingColumn = column + insertedBoard[0].length - 1
        for (let i = 0; i < baseBoard.length; i++) {
            const newRow = []
            for (let j = 0; j < baseBoard[0].length; j++) {
                const useInsert = (
                    i >= row &&
                    i <= endingRow &&
                    j >= column &&
                    j <= endingColumn
                )
                newRow.push(
                    useInsert
                    ? insertedBoard[i - row][j - column]
                    : baseBoard[i][j]
                )
            }
            final.push(newRow)
        }
        return final
    },

    placeMultiple: function(baseBoard, ...placements) {
        let final = [...baseBoard]
        console.log('begin:', final)
        for(let placement of placements) {
            console.log(
                'before',
                {placement},
                {final},
            )
            final = boardOperations.placeAt(final, ...placement)
            console.log(
                'after',
                {final}
            )
        }
        return final
    },

    gridOf: function (seedBoard, copiesHorizontal, copiesVertical) {
        let final
        let seedRow = [...seedBoard]
        for(let i = 1; i < copiesHorizontal; i++) {
            seedRow = boardOperations.combineHorizontal(seedRow, seedBoard)
        }
        final = seedRow
        for (i = 1; i < copiesVertical; i++) {
            final = boardOperations.combineVertical(seedRow, final)
        }
        return final
    },

    convertPlaintextString: function (plaintextString) {
        let final = plaintextString.split('%%')

        const longestRow = final.reduce((longestRowFound, current) => {
            return Math.max(longestRowFound, current.length)
        }, 0)

        final = final.map((row) => {
            const convertedRow = row.split('').map((plaintextCell) => {
                switch (plaintextCell) {
                    case 'O':
                        return true
                    case '.':
                        return false
                    default:
                        return false
                }
            })
            const endingFalses = boardOperations.createRowOf((longestRow - convertedRow.length), false)
            return [...convertedRow, ...endingFalses]
        })

        return final
    }
}

const boardRecipes = {
    glider: [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
    ].map((row) => {
        return row.map((cell) => {
            return !!cell
        })
    }),

    octagon2: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
    ],

    figureEight: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ].map((row) => {
        row.push(0)
        row.unshift(0)
        return row
    }),

    osc_48P22_1: '...OO...........%%...O.O..........%%..O....O.....O..%%...O.O.OO..OO.OO%%...O...O.......O%%............O.O.%%................%%...O.......OOO..%%..OOO.......O...%%................%%.O.O............%%O.......O...O...%%OO.OO..OO.O.O...%%..O.....O....O..%%..........O.O...%%...........OO...',

    quadOctagon2: function () {
        const octa = boardOperations.addPadding(this.octagon2, 1)
        return boardOperations.combineVertical(
            boardOperations.combineHorizontal(octa, rules.advanceGenerations(octa, 1)),
            boardOperations.combineHorizontal(rules.advanceGenerations(octa, 1), rules.advanceGenerations(octa, 2)),
        )
    },

    waterfall: function ({seedBoard, numberOfCopies, down, right}) {
        let final

        let seedRow = [...seedBoard]
        for(i=1; i<numberOfCopies; i++) {
            if (right) {
                seedRow = boardOperations.combineHorizontal(rules.advanceGenerations(seedBoard, i), seedRow)
            } else {
                seedRow = boardOperations.combineHorizontal(seedRow, rules.advanceGenerations(seedBoard, i))
            }
        }

        final = seedRow
        for (i=1; i<numberOfCopies; i++) {
            if (down) {
                final = boardOperations.combineVertical(rules.advanceGenerations(seedRow, i), final)
            } else {
                final = boardOperations.combineVertical(final, rules.advanceGenerations(seedRow, i))
            }
        }
        console.log(final)
        return final
    },

    randomBoard: function (rows, columns, density) {
        const final = []
        for (let i=0; i<rows; i++) {
            const newRow = []
            for (let j=0; j<columns; j++) {
                const randomValue = Math.random()
                if (randomValue <= density) {
                    newRow.push(true)
                } else {
                    newRow.push(false)
                }
            }
            final.push(newRow)
        }
        return final
    },
}

const boards = {
    octagon2: boardRecipes.octagon2,
    quadOctagon2: boardRecipes.quadOctagon2(),

    // gully: boardRecipes.waterfall({
    //     seedBoard: boardOperations.addPadding(boardRecipes.figureEight, 1),
    //     numberOfCopies: 16,
    //     down: true,
    //     right: true
    // }),

    // glidey: boardOperations.gridOf(
    //     boardOperations.addPadding(boardRecipes.glider, 1),
    //     20,
    //     20
    // ),

    // quilt: boardOperations.placeAt(
    //     boardOperations.gridOf(
    //         [[0]],
    //         26,
    //         22
    //     ),
    //     boardOperations.rotateClockwise(boardRecipes.glider),
    //     2,
    //     2
    // ),

    // quilt: boardOperations.placeMultiple(
    //     boardOperations.gridOf([[0]], 26, 22),
    
    //     [
    //         boardRecipes.glider,
    //         2,
    //         2
    //     ],
    //     [
    //         boardOperations.rotateCounterClockwise(boardRecipes.glider),
    //         17,
    //         3
    //     ],
    //     [
    //         boardOperations.flipHorizontal(boardRecipes.glider),
    //         2,
    //         21
    //     ],
    //     [
    //         boardOperations.flipVertical(
    //             boardOperations.rotateClockwise(boardRecipes.glider)
    //         ),
    //         17,
    //         20
    //     ]
        
    // ),

    silly: boardOperations.addPadding(
        boardOperations.convertPlaintextString(boardRecipes.osc_48P22_1),
        2,
        false
    )
}