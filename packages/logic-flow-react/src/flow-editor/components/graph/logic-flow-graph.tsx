/* eslint-disable react/react-in-jsx-scope */
import LogicFlow from '@logicflow/core';
import React, { FC } from 'react';
import { useEffect, useRef } from 'react';
import '@logicflow/core/dist/style/index.css';
import "@logicflow/extension/lib/style/index.css";
import * as Options from '@logicflow/core/types/options';
import { useUpdateEffect } from '../../hooks';
import { initDefaultShortcut } from '../register/keyboard/shortcut';
import { eventRegister } from '../register/event/event-register';
import './logic-flow-graph.less';
import { Menu } from '../../extension/menu';
import { SelectionSelect } from '../../extension/selection-select';

export interface LogicFlowGraphProps {
  instance?: string;
  constructorOptions?: Omit<Options.Definition, 'container' | 'width' | 'height'>;
  resize?: { width: number, height: number, heightOffset: number };
  elements?: any[],
  defaultGraphData?: any;
  event?: (type: string, args: any) => void;
}

const LogicFlowGraph: FC<LogicFlowGraphProps> = (props) => {
  const { instance, constructorOptions, resize, elements, defaultGraphData, event } = props;
  const refContainer = useRef();
  const logicFlow = useRef<LogicFlow>(null);

  useEffect(() => {
    logicFlow.current = new LogicFlow({
      container: refContainer.current,
      grid: true,
      width: resize.width,
      height: resize.height,
      plugins: [Menu, SelectionSelect],
      edgeType: 'line',
      multipleSelectKey: "meta",
      ...constructorOptions
    });

    initDefaultShortcut(logicFlow.current, logicFlow.current.graphModel);
    eventRegister(logicFlow.current, event);
    logicFlow.current.batchRegister(elements);
    logicFlow.current.extension.selectionSelect.setSelectionSense(true, false);
    logicFlow.current.render(defaultGraphData);

    if(instance){
      window[instance] = logicFlow.current;
    }
  }, []);

  useUpdateEffect(() => {
    let width = logicFlow.current.graphModel.width;
    let height = logicFlow.current.graphModel.height;
    if(resize.width !== logicFlow.current.graphModel.width){
      width = resize.width;
    }
    const toHeight = resize.height + resize.heightOffset;
    if(toHeight != logicFlow.current.graphModel.height){
      height = toHeight;
    }
    logicFlow.current.resize(width, height);
  }, [resize.width, resize.height]);

  return <div className="logic-flow-graph" ref={refContainer} />;
}

LogicFlowGraph.defaultProps = {
  resize: { width: 1200, height: 600, heightOffset: -67 },
  constructorOptions: { grid: true }
}

export default LogicFlowGraph;
