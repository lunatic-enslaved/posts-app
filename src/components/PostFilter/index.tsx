import React from "react";

import { Select } from "../UI/Select";
import { Input } from "../UI/Input";

export interface Filter {
  sort: string;
  query: string;
}

interface PostFilterProps {
  filter: Filter;
  onFilter: (value: Filter) => void;
}

const sortOptions = [
  { title: "По названию", value: "title" },
  { title: "По описанию", value: "body" },
];

export const PostFilter = (props: PostFilterProps) => {
  return (
    <div>
      <Input
        value={props.filter.query}
        onChange={(e) =>
          props.onFilter({ ...props.filter, query: e.currentTarget.value })
        }
        placeholder="Поиск"
      />
      <Select
        topValue="Сортировка"
        options={sortOptions}
        value={props.filter.sort}
        onChange={(value) => props.onFilter({ ...props.filter, sort: value })}
      />
    </div>
  );
};
