class LinearRegression {
	constructor(input_size, learning_rate) {
		this.lr = learning_rate;
		this.weights = new Matrix(1, input_size);
		this.input_size = input_size;
	}

	get learning_rate() {
		return this.lr;
	}

	randomize_weights() {
		this.weights.randomize();
	}

	print() {
		this.weights.print();
	}

	guess(inputs) {
		if (Array.isArray(inputs[0])) {
			if (inputs[0].length != this.input_size) {
				console.error("Input size must be of length ", this.input_size);
				return;
			}
		} else {
			if (inputs.length != this.input_size) {
				console.error("Input size must be of length ", this.input_size);
				return;
			}
		}
		return Matrix.dot(inputs, Matrix.transpose(this.weights));
	}

	stochastic(inputs, true_outs) {
		if (!(inputs instanceof Matrix) || !(true_outs instanceof Matrix)) {
			console.error("Inputs and true outputs must be of instance Matrix.");
			return;
		}

	}

	mini_batch(inputs, true_outs) {
		if (!Array.isArray(true_outs)) {
			console.error("Inputs and true outputs must be of Arrays.");
			return;
		}
		if (inputs.length !== true_outs.length) {
			console.error("Inputs and true outputs must have the same length.");
			return;
		}

	}

	train(inputs, true_outs) {
		if (Array.isArray(inputs)) {
			return this.mini_batch(inputs, true_outs);
		} else {
			return this.stochastic(inputs, true_outs);
		}
	}
}
