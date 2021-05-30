// redux的store中传递的基本结构

class BaseState {
  public loading: boolean;
  public error: any;

  constructor(loading: boolean, error: any) {
    this.loading = loading;
    this.error = error;
  }
}

export default BaseState;
