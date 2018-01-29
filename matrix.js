class Matrix {
	constructor(rows = 0, cols = 0) {
		this.rows = rows;
		this.cols = cols;
		this.data = [];
		for (let i = 0; i < this.rows; i++) {
			this.data.push([]);
			for (let j = 0; j < this.cols; j++) {
				this.data[i].push(0);
			}
		}
	}

	randomize() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.data[i][j] = ((Math.round(Math.random() * 100) / 100));
			}
		}
	}

	set(matrix) {
		if (matrix instanceof Matrix) {
			this.rows = matrix.rows;
			this.cols = matrix.cols;
			this.data = matrix.data;
		} else { // Assuming matrix is an array of arrays
			let new_rows = matrix.length;
			if (new_rows == 0) {
				this.constructor(0, 0);
				return;
			}
			let new_cols = matrix[0].length;
			if (new_cols == 0) {
				this.constructor(0, 0);
				return;
			}
			for (var i = 0; i < new_rows; i++) {
				if (matrix[i].length != new_cols) {
					console.error("Matrix rows must have the same number of columns.");
					return;
				}
			}
			this.rows = new_rows;
			this.cols = new_cols;
			this.data = matrix;
		}
	}

	print() {
		console.table(this.data);
	}

	// Static Methods
	static add(a, b) {
		if (a instanceof Matrix && b instanceof Matrix) {
			if (a.rows == b.rows && a.cols == b.cols) {
				let results = new Matrix(a.rows, a.cols);
				for (var i = a.rows - 1; i >= 0; i--) {
					for (var j = a.cols - 1; j >= 0; j--) {
						results.data[i][j] = a.data[i][j] + b.data[i][j];
					}
				}
				return results;
			} else {
				console.error("Both matrices in add must be of the same dimensions.");
			}
		} else {
			console.error("Both parameters in add must be of class Matrix.");
		}
	}

	static dot(a, b) {
		if (a instanceof Matrix && b instanceof Matrix) {
			if (a.cols == b.rows) {
				let results = new Matrix(a.rows, b.cols);
				for (var i = results.rows - 1; i >= 0; i--) {
					for (var j = results.cols - 1; j >= 0; j--) {
						let sum = 0;
						for (var k = 0; k < a.cols; k++) {
							sum += (a.data[i][k] * b.data[k][j]);
						}
						results.data[i][j] = sum;
					}
				}
				return results;
			} else {
				console.error("A's cols must match B's rows.");
			}
		} else {
			console.error("Both parameters in add must be of class Matrix.");
		}
	}

	static scale(a, b) {
		if (a instanceof Matrix && typeof b === 'number') {
			let results = new Matrix(a.rows, a.cols);
			for (var i = results.rows - 1; i >= 0; i--) {
				for (var j = results.cols - 1; j >= 0; j--) {
					results.data[i][j] = a.data[i][j] * b;
				}
			}
			return results;
		} else {
			console.error(
				`The first parameter must be of class Matrix and
                     the second of number.`
			);
		}
	}

	static transpose(a) {
		if (a instanceof Matrix) {
			let results = new Matrix(a.cols, a.rows);
			for (var i = results.rows - 1; i >= 0; i--) {
				for (var j = results.cols - 1; j >= 0; j--) {
					results.data[i][j] = a.data[j][i];
				}
			}
			return results;
		} else {
			console.error("Parameter must be of class Matrix.");
		}
	}

	static mult(a, b) {
		if (a instanceof Matrix && b instanceof Matrix) {
			if (a.rows == b.rows && a.cols == b.cols) {
				let results = new Matrix(a.rows, a.cols);
				for (var i = a.rows - 1; i >= 0; i--) {
					for (var j = a.cols - 1; j >= 0; j--) {
						results.data[i][j] = a.data[i][j] * b.data[i][j];
					}
				}
				return results;
			} else {
				console.error("Both matrices in add must be of the same dimensions.");
			}
		} else {
			console.error("Both parameters in add must be of class Matrix.");
		}
	}

	static map(a, b) {
		if (a instanceof Matrix && typeof b === "function") {
			let results = new Matrix(a.rows, a.cols);
			for (var i = a.rows - 1; i >= 0; i--) {
				for (var j = a.cols - 1; j >= 0; j--) {
					results.data[i][j] = b(a.data[i][j]);
				}
			}
			return results;
		} else {
			console.error(
				`Parameter A must be of class Matrix and B must be of type
                     'function'.`
			);
		}
	}

	static sum(a) {
		if (a instanceof Matrix) {
			let sum = 0;
			for (var i = a.rows - 1; i >= 0; i--) {
				for (var j = a.cols - 1; j >= 0; j--) {
					sum += a.data[i][j];
				}
			}
			return sum;
		} else {
			console.error(`Parameter must be of class Matrix.`);
		}
	}

	// Class methods
	add(b) {
		if (b instanceof Matrix) {
			if (this.rows == b.rows && this.cols == b.cols) {
				for (var i = this.rows - 1; i >= 0; i--) {
					for (var j = this.cols - 1; j >= 0; j--) {
						this.data[i][j] += b.data[i][j];
					}
				}
			} else {
				console.error("Matrix in add must be of the same dimensions.");
			}
		} else {
			console.error("Parameter in add must be of class Matrix.");
		}
	}

	dot(b) {
		if (b instanceof Matrix) {
			if (this.cols == b.rows) {
				let results = new Matrix(this.rows, b.cols);
				for (var i = results.rows - 1; i >= 0; i--) {
					for (var j = results.cols - 1; j >= 0; j--) {
						let sum = 0;
						for (var k = 0; k < this.cols; k++) {
							sum += (this.data[i][k] * b.data[k][j]);
						}
						results.data[i][j] = sum;
					}
				}
				this.set(results);
			} else {
				console.error("A's cols must match B's rows.");
			}
		} else {
			console.error("Parameter in add must be of class Matrix.");
		}
	}

	scale(b) {
		if (typeof b === 'number') {
			for (var i = this.rows - 1; i >= 0; i--) {
				for (var j = this.cols - 1; j >= 0; j--) {
					this.data[i][j] *= b;
				}
			}
		} else {
			console.error("Parameter must be of type number.");
		}
	}

	transpose() {
		let results = new Matrix(a.cols, a.rows);
		for (var i = results.rows - 1; i >= 0; i--) {
			for (var j = results.cols - 1; j >= 0; j--) {
				results.data[i][j] = a.data[j][i];
			}
		}
		this.set(results);
	}

	mult(b) {
		if (b instanceof Matrix) {
			if (this.rows == b.rows && this.cols == b.cols) {
				for (var i = this.rows - 1; i >= 0; i--) {
					for (var j = this.cols - 1; j >= 0; j--) {
						this.data[i][j] *= b.data[i][j];
					}
				}
			} else {
				console.error("Matrix in add must be of the same dimensions.");
			}
		} else {
			console.error("Parameter in add must be of class Matrix.");
		}
	}

	map(b) {
		if (typeof b === 'function') {
			for (var i = this.rows - 1; i >= 0; i--) {
				for (var j = this.cols - 1; j >= 0; j--) {
					this.data[i][j] = b(this.data[i][j]);
				}
			}
		} else {
			console.error("Parameter must be of type function.");
		}
	}

	sum() {
		let sum = 0;
		for (var i = this.rows - 1; i >= 0; i--) {
			for (var j = this.cols - 1; j >= 0; j--) {
				sum += this.data[i][j];
			}
		}
		return sum;
	}
}
