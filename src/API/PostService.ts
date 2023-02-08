import axios from "axios";

import { Post } from "@/components/PostItem";
import type { Comment } from "../types";

export class PostService {
  static async getAll(data?: { limit?: number; page?: number }) {
    try {
      let url = "https://jsonplaceholder.typicode.com/posts?";
      const response = await axios.get(url, {
        params: {
          _limit: data?.limit,
          _page: data?.page,
        },
      });

      return {
        page: data?.page,
        limit: data?.limit,
        posts: response.data as Post[],
        total: parseInt(response.headers["x-total-count"]),
      };
    } catch (err) {
      throw err;
    }
  }

  static async getById(id: number) {
    try {
      let url = "https://jsonplaceholder.typicode.com/posts/" + id;
      const response = await axios.get(url);
      return response.data as Post;
    } catch (err) {
      throw err;
    }
  }

  static async getCommentsByPostId(postId: number) {
    try {
      let url =
        "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments";
      const response = await axios.get(url);
      return response.data as Comment[];
    } catch (err) {
      throw err;
    }
  }
}
