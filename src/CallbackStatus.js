import { observable, makeObservable, action } from 'mobx';

class CallbackStatus {
  msg = 'Callback status';

  constructor() {
    makeObservable(this, {
      msg: observable,
	  setMsg: action
    })
  };

  setMsg = (msg) => {
    this.msg = msg;
  };
}

export default new CallbackStatus();