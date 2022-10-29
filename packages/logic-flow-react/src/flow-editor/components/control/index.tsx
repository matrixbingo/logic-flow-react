import React, { FC } from 'react';
import { Button, Space, SpaceProps, Tooltip } from 'antd';
import { useCreation } from '../../hooks';
import './index.less';

const FitSvg = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M863.153113 702.196507h116.959605a43.887282 43.887282 0 0 1 0 87.774563H863.153113A73.182042 73.182042 0 0 0 789.97107 863.153113v116.959605a43.887282 43.887282 0 0 1-87.774563 0V863.153113A160.956606 160.956606 0 0 1 863.153113 702.196507z m0-380.393014h116.959605a43.887282 43.887282 0 0 0 0-87.774563H863.153113A73.182042 73.182042 0 0 1 789.97107 160.956606V43.887282a43.887282 43.887282 0 0 0-87.774563 0v117.069324a160.846887 160.846887 0 0 0 160.956606 160.846887z m-702.196507 0H43.887282a43.887282 43.887282 0 0 1 0-87.774563h117.069324a73.072324 73.072324 0 0 0 73.072324-73.072324V43.887282a43.887282 43.887282 0 0 1 87.774563 0v117.069324a160.846887 160.846887 0 0 1-160.846887 160.846887z m0 380.393014H43.887282a43.887282 43.887282 0 0 0 0 87.774563h117.069324a73.182042 73.182042 0 0 1 73.072324 73.182043v116.959605a43.887282 43.887282 0 0 0 87.774563 0V863.153113A160.846887 160.846887 0 0 0 160.956606 702.196507z" />
  </svg>
);

const ZoomInSvg = () => (
  <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z" p-id="3893"></path><path d="M625.792 448H336a32 32 0 0 0 0 64h289.792a32 32 0 1 0 0-64z" />
  </svg>
);

const ZoomOutSvg = () => (
  <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z" p-id="3746"></path><path d="M625.792 448H512v-112a32 32 0 0 0-64 0V448h-112a32 32 0 0 0 0 64H448v112a32 32 0 1 0 64 0V512h113.792a32 32 0 1 0 0-64z" />
  </svg>
);

const UndoSvg = () => (
  <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M995.648 459.296C684.448 281.568 406.08 318.656 171.232 567.904L32 416v384h352l-160.736-175.328c211.168-227.072 452.192-259.776 734.304-98.688a38.4 38.4 0 0 0 38.08-66.688z" />
  </svg>
);

const RedoSvg = () => (
  <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M860.992 558.912C627.904 317.536 352.384 283.648 44.8 459.296a38.4 38.4 0 1 0 38.08 66.688c278.432-159.008 516.896-129.408 726.08 89.696L640 800h352V416l-131.008 142.912z" />
  </svg>
);

const SelectSvg = () => (
  <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M429.8 890.7h-77.2v-38.2h77.2v38.2z m-154.4 0h-77.2v-38.2h77.2v38.2zM121 890.7H63.7v-57.2h38.2v19.1H121zM101.9 756.3H63.7v-77.2h38.2v77.2z m0-154.4H63.7v-77.2h38.2v77.2z m0-154.4H63.7v-77.2h38.2v77.2z m0-154.4H63.7v-77.2h38.2v77.2zM101.9 138.7H63.7V81.5H121v38.2h-19.1zM738.5 119.7h-77.2V81.5h77.2v38.2z m-154.4 0H507V81.5h77.2v38.2z m-154.3 0h-77.2V81.5h77.2v38.2z m-154.4 0h-77.2V81.5h77.2v38.2zM873 138.7h-38.2v-19h-19.1V81.5H873zM873 447.5h-38.2v-77.2H873v77.2z m0-154.4h-38.2v-77.2H873v77.2z" p-id="3395"></path><path d="M835.2 947.1c-0.8 0-1.5 0-2.3-0.1-4.7-0.6-9.1-3.1-12-6.8l-128.5-166-58.8 45.5c-4.8 3.7-11.2 4.8-17 2.8-5.8-2-10.1-6.8-11.6-12.7L523.1 476c-1.7-6.9 0.8-14.2 6.5-18.6 5.6-4.4 13.3-5 19.6-1.6L852 618.5c5.4 2.9 8.9 8.3 9.4 14.4s-2.1 12-6.9 15.7l-58.8 45.5 128.5 166c6.1 7.9 4.7 19.2-3.2 25.3l-74.7 57.9c-3.2 2.5-7.1 3.8-11.1 3.8zM695.7 730.8c5.4 0 10.7 2.4 14.3 7l128.5 166 46.2-35.8-128.5-166c-2.9-3.8-4.2-8.6-3.6-13.3s3.1-9.1 6.8-12l51.1-39.6-242.6-130.5 65.6 267.5 51.1-39.6c3.3-2.5 7.2-3.7 11.1-3.7z" />
  </svg>
);

const createControlItems = (instance: string): any[] => {
  const lf = window[instance];
  return [
    {
      key: 'zoom-out',
      icon: <ZoomInSvg />,
      title: '缩小',
      onClick: () => {
        lf.zoom(false);
      },
    },
    {
      key: 'zoom-in',
      icon: <ZoomOutSvg />,
      title: '放大',
      onClick: () => {
        lf.zoom(true);
      },
    },
    {
      key: 'reset',
      icon: <FitSvg />,
      title: '重置',
      onClick: () => {
        lf.resetZoom();
      },
    },
    {
      key: 'select',
      icon: <SelectSvg />,
      title: '框选',
      onClick: () => {
        lf.extension.selectionSelect.openSelectionSelect();
      },
    },
    {
      key: 'undo',
      icon: <UndoSvg />,
      title: '上一步',
      onClick: () => {
        lf.undo();
      },
    },
    {
      key: 'redo',
      icon: <RedoSvg />,
      title: '下一步',
      onClick: () => {
        lf.redo();
      },
    },
  ]
};


export interface ControlProps extends SpaceProps{
  instance: string;
  showKeys?: string[];
}

const Control: FC<ControlProps> = ({ instance, showKeys }) => {

  const items = useCreation(() => createControlItems(instance), [window[instance]]);

  return <div className='logic-flow-react-control-div' style={{ padding: 0, position: 'absolute', zIndex:20, top: 0, height: 32, width: '100%' }}>
    {
      items.map( ({ key, title, onClick, icon }) => {
        if(showKeys.includes(key)){
          return <Tooltip key={key} title={title}>
          <Button key={key} style={{ padding: '5px 0px 0px 0px', width: 40 }} type="dashed" onClick={onClick} icon={icon} />
        </Tooltip>
        }
      })
    }
  </div>
};

Control.defaultProps = {
  showKeys: ['zoom-out', 'zoom-in', 'reset', 'undo', 'redo']
}

export default Control;
