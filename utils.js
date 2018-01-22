function isIntegerAbove0(x) {
  return typeof x === "number" && x > 0 && Number.isInteger(x);
}

function getSum(total, num) {
    return total + num;
}

function getProduct(total, num) {
    return total * num;
}

function flatten(prev, curr) {
  return prev.concat(curr);
}

function square(x) {
  return x*x;
}

function make_batch(X, y, batch_size) {
  let size_of_set = X.length;
  let batch_X = [];
  let batch_y = [];
  for (var i = batch_size - 1; i >= 0; i--) {
    let index = Math.floor(Math.random() * size_of_set);
    batch_X.push(X.slice(index, index+1)[0])
    batch_y.push(y.slice(index, index+1)[0])
  }
  return [batch_X, batch_y];
}
