import type { Comment } from "../../types";

import classes from "./index.module.css";

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = (props: CommentListProps) => {
  return (
    <ul className={classes.list}>
      {props.comments.map((comment) => (
        <li className={classes.item} key={comment.id}>
          <h5>{comment.email}</h5>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};
