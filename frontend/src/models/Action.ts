import { Action } from 'redux';

// 给原生的Action增加payload字段，提供给ts类型检查
interface myAction extends Action {
  payload?: any
}

export default myAction;
