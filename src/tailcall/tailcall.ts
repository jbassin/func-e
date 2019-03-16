export interface ITailcallFunc {
  tailcall: any;
  (...args: any[]): any;
}

export default class Tailcall {
  private readonly func: ITailcallFunc;
  private localDone: boolean;
  private retVal: any;
  private args: any[];

  constructor(func: (...args: any[]) => any) {
    this.func = func as ITailcallFunc;
    this.func.tailcall = this;
    this.localDone = false;
    this.retVal = null;
    this.args = [];
  }

  public done(retVal: any): void {
    this.localDone = true;
    this.retVal = retVal;
  }

  public next(...args: any[]): void {
    this.args = args;
  }

  public run(...args: any[]): any {
    this.args = args;
    while (!this.localDone) {
      this.func(...this.args);
    }
    return this.retVal;
  }
}
