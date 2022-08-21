import LogicFlow from '@logicflow/core';

declare global {  //设置全局属性
  interface Window {
    readonly lf: LogicFlow;
  }
}
