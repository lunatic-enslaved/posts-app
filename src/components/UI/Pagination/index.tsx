import React from "react";
import cn from "classnames";

import classes from "./index.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const pagesArray = React.useMemo(() => {
    const result = [];

    for (let i = 1; i <= props.totalPages; i++) {
      result.push(i);
    }

    return result;
  }, [props.totalPages]);

  const btnClasses = (page: number) =>
    cn(classes.button, {
      [classes.button__current]: page === props.currentPage,
    });
  return (
    <div className={classes.pages}>
      {pagesArray.map((page) => (
        <span
          key={page}
          role="button"
          className={btnClasses(page)}
          onClick={() => props.onChange(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};
