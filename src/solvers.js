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
  var solutionBoard = new Board(matrix);
  return solutionBoard;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) { // take in a number
  var solution = []; // return a matrix (2D array) that is n by n

  var solutionBoard = buildTestBoard(n);

  var matrix = solutionBoard.rows(); // access by matrix[0][0] to matrix[n][n]
  //console.log(matrix);
  // matrix[0][0] = 1;

  var recursiveSolution = function(row) {
  var currentRow = row;
    for(var currentCol = 0; currentCol < n; currentCol++){
      matrix[currentRow][currentCol] = 1; // Place a piece on [row][col]
      var hasConflict = solutionBoard.hasColConflictAt(currentCol); // check for conflict at this column

      if (!hasConflict) {
        if(row === n-1){ // if this breaks, make sure we need n-1
          solution.push(matrix);
          // return;
        } // end if (last row)
          else {
          recursiveSolution(currentRow+1); // set currentBoardPosition = 0
        } // end else (not last row)
      } // end if (hasConflict)
      matrix[currentRow][currentCol] = 0;
    } // end for (iterate through rows)
  } // end recursiveSolution()

  recursiveSolution(0);

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution[0];
};


// return the number of 4 x 4 chessboards that exist, with 4 rooks placed so that none can attack
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = []; // return a matrix (2D array) that is n by n

  var solutionBoard = buildTestBoard(n);

  var matrix = solutionBoard.rows(); // access by matrix[0][0] to matrix[n][n]
  console.log(matrix)
  // matrix[0][0] = 1;

  var recursiveSolution = function(row) {
  // 1) Place a piece on [current row] [Column 0]   <== set currentBoardPosition = 1
    var currentRow = row;
    for(var currentCol = 0; currentCol < n; currentCol++){
      matrix[currentRow][currentCol] = 1;
      var hasConflict = solutionBoard.hasColConflictAt(currentCol); // check for conflict at this column

      if (!hasConflict) {
        if(row === n-1){ // if this breaks, make sure we need n-1
          solution.push(matrix);
          // return;
        } // end if (last row)
          else {
          recursiveSolution(currentRow+1); // set currentBoardPosition = 0
        } // end else (not last row)
      } // end if (hasConflict)
      matrix[currentRow][currentCol] = 0;
    } // end for (iterate through rows)
  }
  recursiveSolution(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
