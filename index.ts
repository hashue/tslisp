import { assertEq } from './util';

type Expr = Array<string | number> | undefined;

function parse(str: string):Expr {
  console.log(`\ninput: ${str}\n`)
  str = str.replaceAll(' ', '');

  let expr: Expr = []; // ex: ['+', 1, 3]
  let stack: Array<Expr> = []; //ex: [['+' ,1'],['-', 5 4]]
  let i = 0;


  while (i < str.length) {
    let token = str.charAt(i++);


    // match atom 
    if (!token.match(/\(|\)/)) {
      expr?.push(
        (isNaN(Number(token)) ? token : Number(token))
      )
    }

    if (token === '(') {
      let prev: any = expr;
      expr = [];

      if (prev?.length !== 0) {
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
// Test
//

console.log(`\t=>`,parse("(+ 1 (- 5 (* 3 2)))"))

const expect = ['+', 1, [ '-', 5, [ '*', 3, 2 ] ] ];
console.log(assertEq(expect, parse("(+ 1 (- 5 (* 3 2)))")))


//
// Executor
//

//TODO: impl Eval function

