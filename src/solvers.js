/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

var buildTestBoard = function(n){
  var matrix = new Array(n);

  for(var i = 0; i < matrix.length; i++){
    matrix[i] = new Array(n);
    for(var j = 0; j < matrix.length; j++){
      matrix[i][j] = 0;
    }
  }
  var nBoardObject = new Board(matrix);
  return nBoardObject;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n, ifAllSolutionsReturn) { // take in a number BETWEEN 1 - infinity
  var solution = []; // storage for matrices of valid 'nXn' soutions
  var nBoardObject = buildTestBoard(n);
  var matrix = nBoardObject.rows(); // access by matrix[0][0] to matrix[n][n]

  var recursiveSolution = function(row) {
    var currentRow = row;
    for(var currentCol = 0; currentCol < n; currentCol++){
      matrix[currentRow][currentCol] = 1; // Place a piece on [row][col]

      var hasConflict = nBoardObject.hasColConflictAt(currentCol); // check for conflict at this column

      if (!hasConflict) {
        if(row === n-1){
          solution.push(_.map(matrix, _.clone));
        } // end if (last row)
          else {
          recursiveSolution(currentRow+1); // set currentBoardPosition = 0
        } // end else (not last row)
      } // end if (hasConflict)
      matrix[currentRow][currentCol] = 0;
    } // end for (iterate through rows)
  } // end recursiveSolution()

  recursiveSolution(0); // call the recursive function, which will populate 'solution' with all solution permutations

  if (ifAllSolutionsReturn) { // if we've called this from countNRooksSolutions
    return solution.length; // the number of solution boards
  }
  return solution[0];
};


// return the number of 4 x 4 chessboards that exist, with 4 rooks placed so that none can attack
window.countNRooksSolutions = function(n) {
  return findNRooksSolution(n, true);
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, ifAllSolutionsReturn) {
  var solution = []; // storage for matrices of valid 'nXn' soutions
  var nBoardObject = buildTestBoard(n);
  var matrix = nBoardObject.rows(); // access by matrix[0][0] to matrix[n][n]

  var recursiveSolution = function(row) {
  var currentRow = row;
    for(var currentCol = 0; currentCol < n; currentCol++){
      matrix[currentRow][currentCol] = 1; // Place a piece on [row][col]
      var hasConflict = (nBoardObject.hasColConflictAt(currentCol)
                      ||nBoardObject.hasMajorDiagonalConflictAt(currentCol)
                      ||nBoardObject.hasMinorDiagonalConflictAt(currentCol)); // check for conflict at this column and diagonals

      if (!hasConflict) {
        if(row === n-1){
          console.log(matrix)
          debugger;
          solution.push(_.map(matrix, _.clone));
        } // end if (last row)
          else {
          recursiveSolution(currentRow+1); // set currentBoardPosition = 0
        } // end else (not last row)
      } // end if (hasConflict)
      matrix[currentRow][currentCol] = 0;
    } // end for (iterate through rows)
  } // end recursiveSolution()

  recursiveSolution(0); // call the recursive function, which will populate 'solution' with all solution permutations

  if (ifAllSolutionsReturn) { // if we've called this from countNRooksSolutions
    return solution.length; // the number of solution boards
  }
  return solution[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) return 1;
  return findNQueensSolution(n, true);
};
