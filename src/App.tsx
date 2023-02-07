import React from "react";

import "./styles/App.css";

import { PostFilter, Filter } from "./components/PostFilter";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { Post } from "./components/PostItem";
import { Modal } from "./components/UI/Modal";
import { Button } from "./components/UI/Button";
import { Spinner } from "./components/UI/Spinner";
import { usePosts } from "./hooks/usePosts";
import { PostService } from "./API/PostService";
import { useFetching } from "./hooks/useFetching";
import { getPagesCount } from "./utils/getPagesCount";
import { Pagination } from "./components/UI/Pagination";

export const App = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [filter, setFilter] = React.useState<Filter>({ sort: "", query: "" });
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const fetchPostsCallback = React.useCallback(async () => {
    const res = await PostService.getAll({ page, limit });
    setPosts(res.posts);
    setTotalPages(getPagesCount({ total: res.total, limit: limit }));
  }, [limit, page]);
  const [fetchPosts, { loading, error }] = useFetching(fetchPostsCallback);
  const sortedAndSearchedPosts = usePosts(posts, filter);

  const addNewPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };
  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  React.useEffect(() => {
    console.log("mount");
    fetchPosts();

    return () => {
      console.log("unmount");
    };
  }, [page, fetchPosts]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          Загрузка постов
        </div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          Ошибка загрузки
        </div>
        <Button onClick={fetchPosts}>Попробовать снова</Button>
      </div>
    );
  }

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

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onChange={setPage}
      />
    </div>
  );
};
