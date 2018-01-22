class Activation {
  //  Default to identity
  constructor() {
    // If this is true, one can expect the user to send the activation
    // value through the deactivate function.
    this.can_use_act_in_d = false;
  }

  get can_use_act() {
    return this.can_use_act_in_d;
  }

  activate(x) {
    return x;
  }

  deactivate(x) {
    return 1;
  }
}

class Sigmoid extends Activation {
  constructor() {
    super();
    this.can_use_act_in_d = true;
  }

  activate(x) {
    if (typeof x === "number") {
      return ( 1 / (1 + Math.exp(-x)) );
    }
    console.error("Parameter must be of type number or float.")
  }

  deactivate(x) {
    if (typeof x === "number") {
      return x * (1 - x);
    }
    console.error("Parameter must be of type number or float.");
  }
}

class ReLU extends Activation {
  constructor() {
    super();
    this.can_use_act_in_d = false;
  }

  activate(x) {
    if (typeof x === "number") {
      return (x <= 0 ? 0 : x);
    }
    console.error("Parameter must be of type number or float.")
  }

  deactivate(x) {
    if (typeof x === "number") {
      return (x <= 0 ? 0 : 1);
    }
    console.error("Parameter must be of type number or float.");
  }
}

class TanH extends Activation {
  constructor() {
    super();
    this.can_use_act_in_d = true;
  }

  activate(x) {
    if (typeof x === "number") {
      return (2 / (1 + Math.exp(-2*x)))-1;
    }
    console.error("Parameter must be of type number or float.")
  }

  deactivate(x) {
    if (typeof x === "number") {
      return (1 - Math.pow(x, 2));
    }
    console.error("Parameter must be of type number or float.");
  }
}

class LReLU extends Activation {
  constructor(alpha) {
    super();
    this.can_use_act_in_d = false;
    if (typeof alpha === "number") {
      this.alpha = alpha;
    } else {
      this.alpha = 1;
    }
  }

  activate(x) {
    if (typeof x === "number") {
      return (x <= 0 ? this.alpha*x : x);
    }
    console.error("Parameter must be of type number or float.")
  }

  deactivate(x) {
    if (typeof x === "number") {
      return (x <= 0 ? this.alpha : 1);
    }
    console.error("Parameter must be of type number or float.");
  }
}

class ELU extends Activation {
  constructor(alpha) {
    super();
    this.can_use_act_in_d = true;
    if (typeof alpha === "number") {
      this.alpha = alpha;
    } else {
      this.alpha = 1;
    }
  }

  activate(x) {
    if (typeof x === "number") {
      return (x <= 0 ? this.alpha*(Math.exp(x) - 1) : x);
    }
    console.error("Parameter must be of type number or float.")
  }

  deactivate(x) {
    if (typeof x === "number") {
      return (x <= 0 ? this.alpha + x : 1);
    }
    console.error("Parameter must be of type number or float.");
  }
}
