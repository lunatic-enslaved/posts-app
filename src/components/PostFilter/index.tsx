import React from "react";

import { Select } from "../UI/Select";
import { Input } from "../UI/Input";

export interface Filter {
  sort: string;
  query: string;
  limit: number;
}

interface PostFilterProps {
  filter: Filter;
  onFilter: (value: Filter) => void;
}

const sortOptions = [
  { title: "По названию", value: "title" },
  { title: "По описанию", value: "body" },
];
const limitOptions = [
  { title: "10", value: "10" },
  { title: "20", value: "20" },
  { title: "50", value: "50" },
  { title: "100", value: "100" },
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
      <Select
        topValue="Количество записей на страницу"
        options={limitOptions}
        value={props.filter.sort}
        onChange={(value) =>
          props.onFilter({ ...props.filter, limit: parseInt(value) })
        }
      />
    </div>
  );
};
