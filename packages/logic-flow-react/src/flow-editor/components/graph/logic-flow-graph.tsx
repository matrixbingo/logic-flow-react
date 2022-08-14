/* eslint-disable react/react-in-jsx-scope */
import LogicFlow from '@logicflow/core';
import React, { FC } from 'react';
import { useEffect, useRef } from 'react';
import '@logicflow/core/dist/style/index.css';
import * as Options from '@logicflow/core/types/options';
import rectNode from '../../shape/node/rectangle-flow';
import { useUpdateEffect } from '../../hooks';

export interface LogicFlowGraphProps {
  instance?: React.Dispatch<React.SetStateAction<LogicFlow>>;
  constructorOptions?: Omit<Options.Definition, 'container' | 'width' | 'height'>;
  resize?: { width: number, height: number, heightOffset: number };
  defaultGraphData?: any;
}

const LogicFlowGraph: FC<LogicFlowGraphProps> = (props) => {
  const { instance, constructorOptions, resize, defaultGraphData } = props;
  const refContainer = useRef();
  const logicFlow = useRef<LogicFlow>(null);

  useEffect(() => {
    logicFlow.current = new LogicFlow({
      container: refContainer.current,
      grid: true,
      width: resize.width,
      height: resize.height,
      ...constructorOptions
    });
    logicFlow.current.register(rectNode);
    logicFlow.current.render(defaultGraphData);
    instance?.(logicFlow.current);
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

  return <div className="App" ref={refContainer} />;
}

LogicFlowGraph.defaultProps = {
  resize: { width: 1200, height: 600, heightOffset: -67 },
  constructorOptions: { grid: true }
}

export default LogicFlowGraph;
