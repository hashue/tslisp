export function assertEq(expect:any,val:any):boolean{
  expect = String(expect);
  val = String(val);
  return (expect === val)? true : false;
}
