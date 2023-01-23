import * as React from 'react';

import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { Layout } from '@earlycross-inc/react-table-library/types/layout';
import { Pagination } from '@earlycross-inc/react-table-library/types/pagination';
import { ColumnResizeProps } from '@earlycross-inc/react-table-library/types/resize';
import { Select } from '@earlycross-inc/react-table-library/types/select';
import { Sort } from '@earlycross-inc/react-table-library/types/sort';
import { Theme } from '@earlycross-inc/react-table-library/types/theme';
import { Tree } from '@earlycross-inc/react-table-library/types/tree';

// external

export type RestProps = Record<string, any>;

export type Event = React.SyntheticEvent | React.KeyboardEvent;

export type OnClick = (node: TableNode, event: Event) => void;

export type CellProps = {
  className?: string;
  pinLeft?: boolean;
  pinRight?: boolean;
  stiff?: boolean;
  gridColumnStart?: number;
  gridColumnEnd?: number;
  onClick?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
} & RestProps;

export type HeaderCellProps = {
  index?: number;
  className?: string;
  hide?: boolean;
  pinLeft?: boolean;
  pinRight?: boolean;
  stiff?: boolean;
  isFooter?: boolean;
  gridColumnStart?: number;
  gridColumnEnd?: number;
  resize?: ColumnResizeProps;
  children?: React.ReactNode;
} & RestProps;

export type RowProps = {
  item: TableNode;
  className?: string;
  disabled?: boolean;
  onClick?: OnClick;
  onDoubleClick?: OnClick;
  children: React.ReactNode;
} & RestProps;

export type BodyProps = {
  children: React.ReactNode;
} & RestProps;

export type HeaderRowProps = {
  isFooter?: boolean;
  className?: string;
  children: React.ReactNode;
} & RestProps;

export type HeaderProps = {
  children: React.ReactNode;
} & RestProps;

export type TableProps = {
  data: Data;
  theme?: Theme;
  layout?: Layout;
  sort?: Sort;
  pagination?: Pagination;
  select?: Select;
  tree?: Tree;
  onInit?: OnInitFunction;
  children?: (nodes: TableNode[]) => React.ReactNode;
} & RestProps;

// external data

export type TableNode = {
  id: string;
  nodes?: TableNode[] | Nullish;
  [prop: string]: any;
};

export type Data = {
  pageInfo?: any;
  nodes: TableNode[];
};

// internal

export type OnInitFunction = (node: HTMLTableElement) => void;

export type Features = {
  select: Select | Nullish;
  tree: Tree | Nullish;
  sort: Sort | Nullish;
  pagination: Pagination | Nullish;
};

export type FeatureProps = {
  theme?: string;
  className?: string;
  onClick: OnClick;
};

export type GetRowProps = (props: RowProps, features: Features) => FeatureProps;
