import React from "react";

type Callback<T> = (args: T) => Promise<void>;
type Return<T> = [Callback<T>, { loading: boolean; error: string }];

function useFetching<T = void>(callback: Callback<T>): Return<T> {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const fetching = async (args: T) => {
    try {
      setLoading(true);
      await callback(args);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return [fetching, { loading, error }];
}

export { useFetching };
