export const getPagesCount = ({
  total,
  limit,
}: {
  total: number;
  limit: number;
}) => {
  return Math.ceil(total / limit);
};
