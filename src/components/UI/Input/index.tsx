import classes from "./index.module.css";

export const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return <input {...props} className={classes.input} />;
};
