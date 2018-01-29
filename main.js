let act = new Sigmoid();
let nn = new NN([2, 4, 2], act, 1e-7);
let epochs = 10000;
let batch_size = 1000;
let train_size = 10000;
let test_size = 1000;

// Sum is greater than 0.5
let y1 = function(...x) {
	return (x[0].reduce(getSum) > 0.5 ? 1 : 0);
}

// Product is less than 0.5
let y2 = function(...x) {
	return (x[0].reduce(getProduct) < 0.5 ? 1 : 0);
}

// Make train and test
let train_X = [];
let train_y = [];
let test_X = [];
let test_y = [];
for (var i = 0; i < train_size; i++) {
	let inputs = [
		[Math.random()],
		[Math.random()]
	];
	let answer = [
		[y1(inputs.reduce(flatten))],
		[y2(inputs.reduce(flatten))]
	];
	let input_mat = new Matrix();
	input_mat.set(inputs);
	let answer_mat = new Matrix();
	answer_mat.set(answer);
	train_X.push(input_mat);
	train_y.push(answer_mat);
}
for (var i = 0; i < test_size; i++) {
	let inputs = [
		[Math.random()],
		[Math.random()]
	];
	let answer = [
		[y1(inputs.reduce(flatten))],
		[y2(inputs.reduce(flatten))]
	];
	let input_mat = new Matrix();
	input_mat.set(inputs);
	let answer_mat = new Matrix();
	answer_mat.set(answer);
	test_X.push(input_mat);
	test_y.push(answer_mat);
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
	let pre_square = Matrix.add(test_y[i], neg_outs);
	error_sum += Matrix.map(pre_square, square).sum();
}

console.log("Validation:", error_sum / test_size);
