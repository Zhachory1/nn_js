let act = new ReLU();
let nn = new NN([2, 2, 2], act, 1e-7);
let epochs = 10000;
let batch_size = 1000;
let train_size = 1000;
let test_size = 1000;

// Sum is greater than 0.5
let y1 = function(...x) {
	return (x.reduce(getSum) > 0.5 ? 1 : 0);
}

// Product is less than 0.5
let y2 = function(...x) {
	return (x.reduce(getProduct) < 0.5 ? 1 : 0);
}

// Make train and test
let train_X = [];
let train_y = [];
let test_X = [];
let test_y = [];
for (var i = 0; i < train_size; i++) {
	let inputs = [Math.random(), Math.random()];
	let answer = [y1(inputs), y2(inputs)];
	train_X.push(inputs);
	train_y.push(answer);
}
for (var i = 0; i < test_size; i++) {
	let inputs = [Math.random(), Math.random()];
	let answer = [y1(inputs), y2(inputs)];
	test_X.push(inputs);
	test_y.push(answer);
}

// train with minibatch!
for (let i = 0; i < epochs; i++) {
	let inputs_list = [];
	let answer_list = [];
	let batch = make_batch(train_X, train_y, batch_size);

	if (i % 1000 == 0) {
		console.log(nn.train(batch[0], batch[1]));
	} else {
		nn.train(batch[0], batch[1]);
	}
}

let error_sum = 0;
for (let i = 0; i < test_size; i++) {
	let guess = nn.guess(test_X[i]);
	let neg_outs = Matrix.scale(guess, -1);
	let pre_square = Matrix.add(Matrix.set(test_y[i]), neg_outs);
	error_sum += Matrix.map(pre_square, square).sum();
}

console.log("Validation:", error_sum / test_size);
