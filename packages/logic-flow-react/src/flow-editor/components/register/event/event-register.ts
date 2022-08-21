import LogicFlow from "@logicflow/core";
import { message } from "antd";

enum EventType {
  NODE_CLICK = 'node:click',
  NODE_DBCLICK = 'node:dbclick',
  NODE_DELETE = 'node:delete',
  NODE_ADD = 'node:add',
  NODE_DND_ADD = 'node:dnd-add',
}

const ExtensionEventType = {
  SELECTION: "selection:selected",
}

export const eventRegister = (lf: LogicFlow, callback = (type: string, args: any) => {} ) => {
  for (let key in EventType) {
    const type = EventType[key];
    lf.on(type, (args) => {
      callback(type, args);
    })
  };

  lf.on(ExtensionEventType.SELECTION, (data) => {
    lf.extension.selectionSelect.closeSelectionSelect();
    callback(ExtensionEventType.SELECTION, data);
    message.info(`你选中了${data.length}个元素`);
  });
};

