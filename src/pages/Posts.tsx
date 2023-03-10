import React from "react";

import { PostFilter, Filter } from "../components/PostFilter";
import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";
import { Post } from "../components/PostItem";
import { Modal } from "../components/UI/Modal";
import { Button } from "../components/UI/Button";
import { Spinner } from "../components/UI/Spinner";
import { usePosts } from "../hooks/usePosts";
import { PostService } from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPagesCount } from "../utils/getPagesCount";
import { Pagination } from "../components/UI/Pagination";
import { useObserver } from "../hooks/useObserver";

const Posts = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [filter, setFilter] = React.useState<Filter>({
    sort: "",
    query: "",
    limit: 10,
  });
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter);
  const lastElement = React.createRef<HTMLDivElement>();
  const [_fetchPosts, { loading, error }] = useFetching(
    async ({ page, limit }: { page: number; limit: number }) => {
      const res = await PostService.getAll({ page, limit });
      setPosts([...posts, ...res.posts]);
      setTotalPages(getPagesCount({ total: res.total, limit: limit }));
    }
  );
  const fetchPosts = React.useCallback(
    () => _fetchPosts({ page, limit }),
    [page, limit]
  );

  const addNewPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };
  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  useObserver({
    ref: lastElement,
    canLoad: page < totalPages,
    isLoading: loading,
    callback: () => setPage(page + 1),
  });

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (error) {
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          ???????????? ????????????????
        </div>
        <Button onClick={() => fetchPosts()}>?????????????????????? ??????????</Button>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => setFormOpen(true)}>+ ???????????????? ????????</Button>

      <hr style={{ margin: "16px 0" }} />

      <Modal visible={isFormOpen} onVisibleChange={setFormOpen}>
        <PostForm
          onSubmit={(post) => {
            addNewPost(post);
            setFormOpen(false);
          }}
        />
      </Modal>

      <PostFilter
        filter={filter}
        onFilter={(v) => {
          setFilter(v);
          setLimit(v.limit);
        }}
      />
      <PostList
        posts={sortedAndSearchedPosts}
        title="???????????? ????????????"
        onDelete={removePost}
      />
      <div style={{ height: "20px" }} ref={lastElement} />
      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onChange={setPage}
      />
    </div>
  );
};

export default Posts;
