import cn from "classnames";

import classes from "./index.module.css";

interface ModalProps extends React.PropsWithChildren {
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
}

export const Modal = (props: ModalProps) => {
  const rootClassNames = cn(classes.root, {
    [classes.__visible]: props.visible,
  });

  const onBackgroundClick = (e: React.MouseEvent) => {
    props.onVisibleChange(false);
  };

  return (
    <div className={rootClassNames} onClick={onBackgroundClick}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};
