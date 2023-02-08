import React from "react";

import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Post } from "../PostItem";

interface PostFormProps {
  onSubmit: (post: Post) => void;
}

export const PostForm = (props: PostFormProps) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const addNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit({
      id: Date.now(),
      title,
      body,
    });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={addNewPost}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.currentTarget?.value)}
        type="text"
        placeholder="Название поста *"
        required
      />
      <Input
        value={body}
        onChange={(e) => setBody(e.currentTarget?.value)}
        type="text"
        placeholder="Описание поста *"
        required
      />
      <Button>Создать пост</Button>
    </form>
  );
};
