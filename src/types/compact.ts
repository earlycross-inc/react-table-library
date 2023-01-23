import * as React from 'react';

import { ColumnResizeProps } from '@earlycross-inc/react-table-library/types/resize';
import { ColumnSelectProps } from '@earlycross-inc/react-table-library/types/select';
import { ColumnSortProps } from '@earlycross-inc/react-table-library/types/sort';
import { RowProps, TableNode, TableProps } from '@earlycross-inc/react-table-library/types/table';
import { ColumnTreeProps } from '@earlycross-inc/react-table-library/types/tree';
import { RowHeight } from '@earlycross-inc/react-table-library/types/virtualized';

// external

export type Column = {
  label: string;
  renderCell: (node: TableNode) => React.ReactNode;
  footer?: string;
  resize?: ColumnResizeProps;
  sort?: ColumnSortProps;
  select?: ColumnSelectProps;
  tree?: ColumnTreeProps;
  pinLeft?: boolean;
  pinRight?: boolean;
  hide?: boolean;
  cellProps?: Record<string, any>;
};

export type VirtualizedOptions = {
  rowHeight: RowHeight;
  itemCount?: number;
};

export type TableOptions = {
  renderBeforeTable?: () => React.ReactNode;
  renderAfterTable?: () => React.ReactNode;
};

export type RowOptions = {
  renderBeforeRow?: (node: TableNode, index: number) => React.ReactNode;
  renderAfterRow?: (node: TableNode, index: number) => React.ReactNode;
};

export type RowPropsAsObject = Omit<RowProps, 'item' | 'children'>;

export type CompactTableProps = TableProps & {
  columns: Column[];
  tableOptions?: TableOptions;
  rowProps?: RowPropsAsObject;
  rowOptions?: RowOptions;
  virtualizedOptions?: VirtualizedOptions;
};

// internal

export type NormalTableProps = CompactTableProps & {
  tableList: TableNode[];
};

export type VirtualizedTableProps = CompactTableProps & {
  tableList: TableNode[];
};

export type Internals = {
  index: number;
  style: any;
  data: { items: TableNode[] };
};

export type InternalsObject = {
  internals: Internals;
};
