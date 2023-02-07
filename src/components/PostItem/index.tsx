import React from "react";

import "./styles.css";

import { Button } from "../UI/Button";

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
      <div className="post" ref={ref}>
        <div className="post__content">
          <strong>
            {props.number}. {props.post.title}
          </strong>

          <div className="post__content">
            <p>{props.post.body}</p>
          </div>
        </div>
        <div className="post__buttons">
          <Button onClick={() => props.onDelete(props.post)}>Удалить</Button>
        </div>
      </div>
    );
  }
);
