import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Post, PostItem } from "../PostItem";

import "./index.css";

interface PostListProps {
  posts: Post[];
  title: string;
  onDelete: (post: Post) => void;
}

export const PostList = (props: PostListProps) => {
  if (props.posts.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Посты не найдены!</h2>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{props.title}</h1>
      <TransitionGroup>
        {props.posts.map((post, idx) => {
          const nodeRef = React.createRef<any>();
          return (
            <CSSTransition
              key={post.id}
              timeout={500}
              nodeRef={nodeRef}
              classNames="post"
            >
              <PostItem
                number={idx + 1}
                post={post}
                ref={nodeRef}
                onDelete={props.onDelete}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};
