export function assertEq(expect:any,val:any):boolean{
  expect = String(expect);
  val = String(val);
  return (expect === val)? true : false;
}

export const isArray = <T>(x: T | readonly T[]): x is T[] =>{
  return Array.isArray(x)
}
