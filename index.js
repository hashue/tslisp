
function parse(str) {
  process.stdout.write(`> ${str}\n`);
  str = str.replaceAll('(', ' ( ').replaceAll(')', ' ) ').split(/\s/);

  let expr = [];// ex: ['+', 1, 3]
  let stack = []; //ex: [['+' ,1'],['-', 5 4]]
  let i = 0;

  while (i < str.length) {
    let token = str[i++];

    // match atom 
    if (!token.match(/\(|\)/) && token !== '') {
      expr?.push(
        (isNaN(Number(token)) ? token : Number(token))
      )
    }

    if (token === '(') {
      let prev = expr;
      expr = [];

      if (prev.length !== 0) {
        stack.push(prev)
        prev.push(expr);
      }
    }

    if (token === ')') {
      let pop = stack.pop();
      if (pop === undefined) return expr;
      expr = pop;
    }
  }
}

//
// Executor
//

function _eval(stack) {
  let paren = [];

  const stacking = (target, node, data) => {
    target.push(node);
    target.push(data);
  }

  while (true) {

    if (stack.length == 1 && paren.length == 0) {
      return process.stdout.write(`=> ${stack[0]}\n`);
    }


    //親が残っていたら中間結果を格納
    if (stack.length == 1 && paren.length != 0) {
      paren.push(stack[0]);
      stack = paren;
      paren = [];
    }




    //前から読んでいく
    let node = stack.shift();

    if (node === '+' || node === '-' || node === '*' || node === '/') {
      let rhs = stack.shift();
      let lhs = stack.shift();

      if (rhs instanceof Array) {
        stacking(paren, node, lhs)
        stack = rhs;
      }

      if (lhs instanceof Array) {
        stacking(paren, node, rhs)
        stack = lhs;
      }

      //check nest
      switch (node) {
        case '+':
          stack.push(rhs + lhs);
          break;
        case '-':
          stack.push(rhs - lhs);
          break;
        case '*':
          stack.push(rhs * lhs);
          break;
        case '/':
          stack.push(rhs / lhs);
          break;
      }
    }
  }
}


//
// Test
//

let ast = parse("(+ 1 (- 5 2)))")
_eval(ast) //4

ast = parse("(* 1 2)")

_eval(ast) //2

ast = parse("(* 1 (+ 2 3))")

_eval(ast) //5

ast = parse("(/ 24 (+ 2 4))")

_eval(ast) //4
