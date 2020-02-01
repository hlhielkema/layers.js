// constructor: Matrix
function Matrix(columns, rows, data) {
    this.columns = columns; // number of columns
    this.rows = rows; // number of rows
    this.data = data; // [[x, ..], ..] -> [row 1, row 2, ...]
    if (data === null || data === undefined) {
        this.data = [];                
        for (var y = 0; y < this.rows; y++) {            
            var row = [];
            this.data.push(row);
            for (var x = 0; x < this.columns; x++) {
                if (x === y) {
                    row.push(1);
                }
                else {
                    row.push(0);
                }
            }
        }
    }
}

// Print the matrix to the console
Matrix.prototype.print = function() {    
    for (var y = 0; y < this.rows; y++) {
        var line = '';
        for (var x = 0; x < this.columns; x++) {
            if (x !== 0) {
                line += ' ';
            }
            line += this.data[y][x];
        }    
        console.log(line);        
    }  
}

// Create a matrix3d value for the transform css property
Matrix.prototype.toCssTransform = function() {
    if (this.columns !== 4 || this.rows !== 4) {
        throw 'Only supported for 4x4 matrix';
    }
    var str = 'matrix3d(';
    for (var y = 0; y < this.rows; y++) {    
        if (y !== 0) {
            str += ', '
        }
        for (var x = 0; x < this.columns; x++) {
            if (x !== 0) {
                str += ', '
            }            
            str += this.data[y][x];                                      
        }  
    }
    return str + ')';
}

// Multiply the current matrix by a second matrix and return the new matrix
Matrix.prototype.multiply = function(b) {
    var a = this;    
    if (a.columns !== b.rows || b.columns !== a.rows) {
        throw 'invalid operation';
    }
    var result = [];
    for (var ry = 0; ry < a.rows; ry++) {
        var line = [];
        for (var rx = 0; rx < b.columns; rx++) {
            var p = 0;
            for (var ax = 0; ax < a.columns; ax++) {
                p += a.data[ry][ax] * b.data[ax][rx];
            }
            line.push(p);        
        }
        result.push(line);
    }
    return new Matrix(b.columns, a.rows, result);
}

// Rotate the matrix by r radians on the X axis
Matrix.prototype.rotateX = function(r) {
    return this.multiply(new Matrix(4, 4, [
        [ 1, 0, 0, 0],
        [ 0, Math.cos(r), Math.sin(r), 0],
        [ 0, -Math.sin(r), Math.cos(r), 0], 
        [ 0, 0, 0, 1]
    ]));
}

// Rotate the matrix by r radians on the Y axis
Matrix.prototype.rotateY = function(r) {
    return this.multiply(new Matrix(4, 4, [
        [ Math.cos(r), 0, -Math.sin(r), 0],
        [ 0, 1, 0, 0],
        [ Math.sin(r), 0, Math.cos(r), 0], 
        [0 , 0, 0, 1]
    ]));
}

// Rotate the matrix by r radians on the Z axis
Matrix.prototype.rotateZ = function(r) {
    return this.multiply(new Matrix(4, 4, [
        [ Math.cos(r), Math.sin(r), 0, 0], 
        [ -Math.sin(r), Math.cos(r), 0, 0],
        [ 0, 0, 1, 0], 
        [ 0, 0, 0, 1]
    ]));
}

// Translate
Matrix.prototype.translate3D = function(x, y, z) {
    return this.multiply(new Matrix(4, 4, [
        [ 1, 0, 0, 0], 
        [ 0, 1, 0, 0],
        [ 0, 0, 1, 0], 
        [ x, y, z, 1]
    ]));
}


/*


var deg = function(d) {
    return (2 * Math.PI) * (d / 360);
}

var mx = new Matrix(4, 4, null); 

//mx = mx.rotateZ(Math.PI * 0.25);

mx = mx.translate3D(100, 100, 0);

console.log('--- mx ---');
mx.print();


console.log('--- CSS ---');
console.log(mx.toCssTransform());

document.querySelector('.shape').style.transform = mx.toCssTransform();

*/