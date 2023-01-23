import * as React from 'react';

import { RowOptions, TableOptions } from '@earlycross-inc/react-table-library/types/compact';
import { TableNode } from '@earlycross-inc/react-table-library/types/table';
import type { ListOnItemsRenderedProps, VariableSizeList } from 'react-window';

export type RowHeight = number | ((item: TableNode, index: number) => number);

export type VirtualizedProps = {
  tableList: TableNode[];
  rowHeight: RowHeight;
  header: () => React.ReactNode;
  body: (node: TableNode, index: number) => React.ReactNode;
  tableOptions: TableOptions;
  rowOptions: RowOptions;
  listRef?: React.Ref<VariableSizeList<{ items: TableNode[] }>>;
  onRowsRendered?: (props: ListOnItemsRenderedProps) => void;
};
