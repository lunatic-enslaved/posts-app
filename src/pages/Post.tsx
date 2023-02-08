import React from "react";
import { NavLink, useParams } from "react-router-dom";

import { Spinner } from "../components/UI/Spinner";
import { Post } from "../components/PostItem";
import { CommentList } from "../components/CommentList";
import { PostService } from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import type { Comment } from "../types";

const PostPage = () => {
  const params = useParams();
  const id = parseInt(params.id as string);

  const [post, setPost] = React.useState<Post>();
  const [comments, setComments] = React.useState<Comment[]>([]);

  const [_fetchPost, { loading: loadingPost }] = useFetching((id: number) =>
    PostService.getById(id).then(setPost)
  );
  const [_fetchComments] = useFetching((id: number) =>
    PostService.getCommentsByPostId(id).then(setComments)
  );
  const fetchPost = React.useCallback(() => _fetchPost(id), [id]);
  const fetchComments = React.useCallback(() => _fetchComments(id), [id]);

  React.useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loadingPost) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <NavLink to="/posts">Ко всем постам</NavLink>
      <section>
        <h1>{post?.title}</h1>
        <p>{post?.title}</p>
      </section>

      <section>
        <h2>Комментарии</h2>
        <CommentList comments={comments} />
      </section>
    </div>
  );
};

export default PostPage;
