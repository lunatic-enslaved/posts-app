import React from "react";

import "./styles/App.css";

import { PostFilter, Filter } from "./components/PostFilter";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { Post } from "./components/PostItem";
import { Modal } from "./components/UI/Modal";
import { Button } from "./components/UI/Button";
import { usePosts } from "./hooks/usePosts";

const initialPosts = [
  { id: 1, title: "1 Post", body: "1 body" },
  { id: 2, title: "2 Post", body: "3 body" },
  { id: 3, title: "3 Post", body: "2 body" },
];

export const App = () => {
  const [posts, setPosts] = React.useState(initialPosts);
  const [filter, setFilter] = React.useState<Filter>({ sort: "", query: "" });
  const [isFormOpen, setFormOpen] = React.useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter);

  const addNewPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };
  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <Button onClick={() => setFormOpen(true)}>+ Добавить пост</Button>

      <hr style={{ margin: "16px 0" }} />

      <Modal visible={isFormOpen} onVisibleChange={setFormOpen}>
        <PostForm
          onSubmit={(post) => {
            addNewPost(post);
            setFormOpen(false);
          }}
        />
      </Modal>

      <PostFilter filter={filter} onFilter={setFilter} />
      <PostList
        posts={sortedAndSearchedPosts}
        title="Список постов"
        onDelete={removePost}
      />
    </div>
  );
};
