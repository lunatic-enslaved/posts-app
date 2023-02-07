import classes from "./Button.module.css";

// FIXME: костыль с any

export const Button = (props: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button {...(props as any)} className={classes.button}>
      {props.children}
    </button>
  );
};
