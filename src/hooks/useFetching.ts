import React from "react";

type Callback<T> = (args?: T) => Promise<void>;
type Return<T> = [Callback<T>, { loading: boolean; error: string }];

export const useFetching = <T>(callback: Callback<T>): Return<T> => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const fetching = React.useCallback(
    async (args?: T) => {
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
    },
    [callback]
  );

  return [fetching, { loading, error }];
};
