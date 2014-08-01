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
window.findNQueensSolution = function(n, typeOfReturn) {
  var solution = []; // storage for matrices of valid 'nXn' soutions
  var nBoardObject = buildTestBoard(n);
  var matrix = nBoardObject.rows(); // access by matrix[0][0] to matrix[n][n]

  var recursiveSolution = function(row) {
  var currentRow = row;
    for(var currentCol = 0; currentCol < n; currentCol++){
      matrix[currentRow][currentCol] = 1; // Place a piece on [row][col]

/* *****************************************************************************************
*
* ______            _        ______         _                 _
* | ___ \          (_)       | ___ \       | |               | |
* | |_/ / ___  __ _ _ _ __   | |_/ /___  __| |_   _ _ __   __| | __ _ _ __   ___ _   _
* | ___ \/ _ \/ _` | | '_ \  |    // _ \/ _` | | | | '_ \ / _` |/ _` | '_ \ / __| | | |
* | |_/ /  __/ (_| | | | | | | |\ \  __/ (_| | |_| | | | | (_| | (_| | | | | (__| |_| |
* \____/ \___|\__, |_|_| |_| \_| \_\___|\__,_|\__,_|_| |_|\__,_|\__,_|_| |_|\___|\__, |
*              __/ |                                                              __/ |
*             |___/                                                              |___/
*
*  ****************************************************************************************
*/
      // var majDiagToCheck = (currentCol - currentRow);
      //   if (majDiagToCheck < 0) majDiagToCheck = 0; // if less than 0, set to 0
      // var minDiagToCheck = (currentCol + currentRow)
      //   if (majDiagToCheck >= n) majDiagToCheck = n-1; // if n or more, set to n-1

// debugger;

      var hasConflicts = nBoardObject.hasAnyQueensConflicts();

      // var hasColConflict = nBoardObject.hasColConflictAt(currentCol); // we'll only ever have 1 item / row - don't need to check row conflicts
      // var hasMajConflict = nBoardObject.hasMajorDiagonalConflictAt(majDiagToCheck); // check for Major diag conflicts
      // var hasMinConflict = nBoardObject.hasMinorDiagonalConflictAt(minDiagToCheck); // check for Major diag conflicts

      // if (!hasColConflict && !hasMajConflict && !hasMinConflict) {
      if (!hasConflicts) {
        if(row === n-1){
          solution.push(_.map(matrix, _.clone));
        } // end if (last row)
          else {
          recursiveSolution(currentRow+1); // set currentBoardPosition = 0
        } // end else (not last row)
      } // end if (hasConflict)
      matrix[currentRow][currentCol] = 0; // Non-solution: reset this square back to 0
    } // end for (iterate through rows)
  } // end recursiveSolution()

  recursiveSolution(0); // call the recursive function, which will populate 'solution' with all solution permutations

  if (typeOfReturn === 'count') { // if we've called this from countNRooksSolutions
    return solution.length; // the number of solution boards
  }
  if (typeOfReturn === 'all') { // if we've called this from countNRooksSolutions
    return solution; // the number of solution boards
  }
  if (solution.length === 0) { // if no solutions
    return {'n' : n}; // return an empty object of size n
  } // end if no solutions
  return solution[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) return 1;
  return findNQueensSolution(n, 'count');
};

window.allNQueensSolutions = function(n) {
  if (n === 0) return 1;
  return findNQueensSolution(n, 'all');
};


