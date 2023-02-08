import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "../UI/Button";

import classes from "./index.module.css";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostItemProps {
  post: Post;
  number: number;
  onDelete: (post: Post) => void;
}

export const PostItem = React.forwardRef<HTMLDivElement, PostItemProps>(
  (props, ref) => {
    return (
      <div className={classes.post} ref={ref}>
        <div>
          <strong>
            {props.number}. {props.post.title}
          </strong>

          <div>
            <p>{props.post.body}</p>
          </div>
        </div>
        <div className={classes.buttons}>
          <NavLink to={"/posts/" + props.post.id}>Открыть</NavLink>
          <Button onClick={() => props.onDelete(props.post)}>Удалить</Button>
        </div>
      </div>
    );
  }
);
