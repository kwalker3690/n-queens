// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var currentRows = this.rows(); // this is our array or arrays
      var reducedRow = _.reduce(currentRows[rowIndex], function(memo, num){ return memo + num; }, 0);

      if (reducedRow > 1) {
        return true; // there IS a row conflict
      }
      return false; // no row
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var currentRows = this.rows(); // this is our array or arrays
      for (var i = 0; i < currentRows.length; i++) {
        if ( this.hasRowConflictAt(i) ) {
          return true;
        } // end if
      } // end for(currentRows)

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var currentRows = this.rows();
      var result = 0;
      for(var i = 0; i < currentRows.length; i++){ //iterate through rows
        result += currentRows[i][colIndex]; // adding current value (0 or 1) to result
      }// end for

      if(result > 1){
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var currentRows = this.rows();
      for(var i = 0; i < currentRows.length; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },

















    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var currentRows = this.rows(); // the matrix of the current board
      var result = 0;

      var currentCol = majorDiagonalColumnIndexAtFirstRow;
        if (majorDiagonalColumnIndexAtFirstRow === 0) { // we will enter this loop if we are checking the FIRST COLUMN ONLY
          for (var i = 0; i < currentRows.length; i++) { // this is the row we'll be checking down
            currentCol = 0; // reset currentCol to the initial position (first column)
            result = 0; // reset result for each row check

            for(var j = i; j < currentRows.length; j++){ // this for loop steps to the next diagonal for a check
              result += currentRows[j][currentCol];
              currentCol++;

              if (result > 1) {
                return true;
              } // end if (result > 1)
            } // end for (check this particular diagonal)
        } // end for
        return false; // result has not been === true.
      } // end if (on last column)

      for(var i = 0; i < currentRows.length; i++){ // this for loop steps to the next diagonal for a check
        result += currentRows[i][currentCol];
        currentCol++; // increment up each column

        if (result > 1) {
          return true;
        } // end if (result > 1)
      } // end for
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var currentRows = this.rows();
      for(var i = 0; i < currentRows.length; i++){ // THIS will iterate down the rows to be sure every position on the board is caught
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },

// AnyMajor will pass each column into MajorAt ==> 0, 1, 2, 3, etc.
  // MajorAt will accumulate the values starting at [0][columnIn], going down [+1][+1], [+2][+2], [+3][+3], etc.
  // It will *not* check down the rows: [1][0]..., [2][0]..., etc.

















// AnyMajor will pass each column into MajorAt ==> 0, 1, 2, 3, etc.
  // MajorAt will accumulate the values starting at [0][columnIn], going down [+1][+1], [+2][+2], [+3][+3], etc.
  // It will *not* check down the rows: [1][0]..., [2][0]..., etc.


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var currentRows = this.rows();
      var result = 0;
      // debugger;
      var currentCol = minorDiagonalColumnIndexAtFirstRow;
        if (minorDiagonalColumnIndexAtFirstRow === currentRows.length-1) { // we will enter this loop if we are checking the LAST COLUMN ONLY
          for (var i = 0; i < currentRows.length; i++) { // this is the row we'll be checking down
            currentCol = minorDiagonalColumnIndexAtFirstRow; // reset currentCol to the initial position (last column)
            result = 0; // reset result for each row check

            for(var j = i; j < currentRows.length; j++){ // this for loop steps to the next diagonal for a check
              result += currentRows[j][currentCol];
              currentCol--;

              if (result > 1) {
                return true;
              } // end if (result > 1)
            } // end for (check this particular diagonal)
        } // end for
        return false; // result has not been === true.
      } // end if (on last column)




      for(var i = 0; i < currentRows.length; i++){ // this for loop steps to the next diagonal for a check
        result += currentRows[i][currentCol];
        currentCol--;

        if (result > 1) {
          return true;
        } // end if (result > 1)
      } // end for
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var currentRows = this.rows();
      for(var i = 0; i < currentRows.length; i++){
        if(this.hasMinorDiagonalConflictAt(i)){ // check for minor diagonal conflict at each COLUMN 0 - n
          return true;
        }
      } // end for (iterate down through rows)
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/

  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
