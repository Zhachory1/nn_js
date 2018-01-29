class NN {
	constructor(nodes_per_layer, activation_class, learning_rate) {
		if (activation_class instanceof Activation) {
			if (nodes_per_layer.every(isIntegerAbove0)) {
				this.act = activation_class;
				this.weights = [];
				this.previous_error = [];
				for (var i = 0; i < nodes_per_layer.length - 1; i++) {
					let rows = nodes_per_layer[i + 1];
					let cols = nodes_per_layer[i];
					let new_weights = new Matrix(rows, cols);
					new_weights.randomize(0, 1);
					this.weights.push(new_weights);
				}
				if (typeof learning_rate === "number" && learning_rate > 0) {
					this.lr = learning_rate;
				} else {
					this.lr = 0.1;
				}
			} else {
				console.error("Array must contains integers above 0.");
			}
		} else {
			console.error(
				`Activation function must be class or subclass of
                     Activation.`
			);
		}
	}

	get learning_rate() {
		return this.lr;
	}

	randomize_weights(min = 0, max = 1) {
		for (var i = this.weights.length - 1; i >= 0; i--) {
			this.weights[i].randomize(min, max);
		}
	}

	print() {
		for (var i = this.weights.length - 1; i >= 0; i--) {
			console.log("From layer [", i, "] to layer [", i + 1, "].");
			this.weights[i].print();
		}
	}

	guess(inputs) {
		if (!Array.isArray(inputs)) {
			console.error("Inputs must be of type Array.");
			return;
		}
		let prev_out = Matrix.set(inputs);
		for (var i = 0; i < this.weights.length; i++) {
			if (prev_out.rows !== this.weights[i].cols) {
				console.error("Input size must be of size [", this.weights[i].cols,
					"] and not of size [", prev_out.rows, "].");
				return;
			}
			let pre_activate = Matrix.dot(this.weights[i], prev_out);
			prev_out = Matrix.map(pre_activate, this.act.activate);
		}
		return prev_out;
	}

	stochastic(inputs, true_outs) {
		if (!Array.isArray(inputs) || !Array.isArray(true_outs)) {
			console.error("Inputs and true outputs must be Arrays.");
			return;
		}
		if (inputs.length !== this.weights[0].cols) {
			console.error("Input size must be of size [", this.weights[0].cols,
				"] and not of size [", inputs.length, "].");
			return;
		}
		// Get outs of every layer. Feed forward
		let prev_out = [Matrix.set(inputs)];
		for (var i = 0; i < this.weights.length; i++) {
			let pre_activate = Matrix.dot(this.weights[i], prev_out[i]);
			prev_out.push(Matrix.map(pre_activate, this.act.activate));
		}

		// Get errors of layers. Back propagate
		let errors = Array(this.weights.length).fill(new Matrix());
		let neg_outs = Matrix.scale(prev_out.slice(-1)[0], -1);
		let pre_square = Matrix.add(Matrix.set(true_outs), neg_outs);
		errors[errors.length - 1].set(Matrix.map(pre_square, square));
		this.previous_error.push(errors[errors.length - 1].sum());
		for (var i = this.weights.length - 1; i > 0; i--) {
			errors[i - 1] = Matrix.dot(Matrix.transpose(this.weights[i]), errors[i]);
		}

		// Change weights
		for (var i = this.weights.length - 1; i >= 0; i--) {
			let der_value =
				(this.act.can_use_act ?
					Matrix.map(prev_out[i + 1], this.act.deactivate) :
					Matrix.map(Matrix.dot(this.weights[i], prev_out[i]),
						this.act.activate));
			let delta = Matrix.dot(Matrix.mult(errors[i], der_value),
				Matrix.transpose(prev_out[i]));
			delta.scale(-(this.lr));
			this.weights[i].add(delta);
		}
		return errors[errors.length - 1].sum();
	}

	mini_batch(inputs, true_outs) {
		if (!Array.isArray(inputs) || !Array.isArray(true_outs)) {
			console.error("Inputs and true outputs must be of Arrays.");
			return;
		}
		if (inputs.length !== true_outs.length) {
			console.error("Inputs and true outputs must have the same length.");
			return;
		}
		// Make sum_deltas to keep sum of all changes in weights
		let sum_deltas = [];
		let sum_error = 0;
		for (var i = 0; i < this.weights.length; i++) {
			let rows = this.weights[i].rows;
			let cols = this.weights[i].cols;
			sum_deltas.push(new Matrix(rows, cols));
		}
		for (var i = inputs.length - 1; i >= 0; i--) {
			if (inputs[i].length !== this.weights[0].cols) {
				console.error("Input size must be of size [", this.weights[0].cols,
					"] and not of size [", inputs.length, "].");
				return;
			}
			// Get outs of every layer. Feed forward
			let prev_out = [Matrix.set(inputs[i])];
			for (var i = 0; i < this.weights.length; i++) {
				let pre_activate = Matrix.dot(this.weights[i], prev_out[i]);
				prev_out.push(Matrix.map(pre_activate, this.act.activate));
			}

			// Get errors of layers. Back propagate
			// Errors is a 1 dimensional array of matrices;
			let errors = Array(this.weights.length).fill(new Matrix());
			let neg_outs = Matrix.scale(prev_out.slice(-1)[0], -1);
			let pre_square = Matrix.add(Matrix.set(true_outs[i]), neg_outs);
			errors[errors.length - 1].set(Matrix.map(pre_square, square));
			sum_error += errors[errors.length - 1].sum();
			for (var i = this.weights.length - 1; i > 0; i--) {
				errors[i - 1] = Matrix.dot(Matrix.transpose(this.weights[i]), errors[i]);
			}

			// Get deltas
			for (var i = this.weights.length - 1; i >= 0; i--) {
				let der_value =
					(this.act.can_use_act ?
						Matrix.map(prev_out[i + 1], this.act.deactivate) :
						Matrix.map(Matrix.dot(this.weights[i], prev_out[i]),
							this.act.deactivate));
				let delta = Matrix.dot(Matrix.mult(errors[i], der_value),
					Matrix.transpose(prev_out[i]));
				sum_deltas[i].add(delta);
			}
		}

		let scale = 1 / inputs.length;
		for (var i = this.weights.length - 1; i >= 0; i--) {
			let delta = Matrix.scale(sum_deltas[i], scale);
			delta.scale(-(this.lr));
			this.weights[i].add(delta);
		}
		return sum_error / inputs.length;
	}

	train(inputs, true_outs) {
		if (Array.isArray(inputs[0])) {
			return this.mini_batch(inputs, true_outs);
		} else {
			return this.stochastic(inputs, true_outs);
		}
	}
}
