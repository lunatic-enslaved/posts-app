import axios from "axios";

import { Post } from "@/components/PostItem";

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
}
