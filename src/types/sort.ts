import * as React from 'react';

import { Modifier, Nullish, State } from '@earlycross-inc/react-table-library/types/common';
import { TableNode } from '@earlycross-inc/react-table-library/types/table';

export enum SortIconPositions {
  Prefix,
  Suffix,
}

export enum SortToggleType {
  Alternate,
  AlternateWithReset,
}

export type SortOptionsIcon = {
  position?: SortIconPositions;
  margin?: string;
  size?: string;
  iconDefault?: React.ReactElement | Nullish;
  iconUp?: React.ReactElement | Nullish;
  iconDown?: React.ReactElement | Nullish;
};

export type SortFn = (node: TableNode[]) => TableNode[];

export type SortOptions = {
  sortFns: Record<string, SortFn>;
  isServer?: boolean;
  sortToggleType?: SortToggleType;
  sortIcon?: SortOptionsIcon;
  isRecursive?: boolean;
};

export type SortOptionsIconSound = {
  position: SortIconPositions;
  margin: string;
  size: string;
  iconDefault: React.ReactElement | Nullish;
  iconUp: React.ReactElement | Nullish;
  iconDown: React.ReactElement | Nullish;
};

export type SortOptionsSound = {
  sortFns: Record<string, SortFn>;
  isServer: boolean;
  sortToggleType: SortToggleType;
  sortIcon: SortOptionsIconSound;
  isRecursive: boolean;
};

export type SortFunctionInput = {
  sortKey: string;
};

export type SortFunctions = {
  onToggleSort: (sortFunctionInput: SortFunctionInput) => void;
};

export type ColumnSortProps = {
  sortKey: string;
  sortIcon?: SortOptionsIcon;
};

export type HeaderCellSortProps = {
  index?: number;
  sortKey: string;
  sortIcon?: SortOptionsIcon;
  children?: React.ReactNode;
} & Record<string, any>;

export type Sort = {
  state: State;
  fns: SortFunctions;
  options: SortOptionsSound;
  modifier: Modifier;
  components: {
    HeaderCellSort: React.FunctionComponent<HeaderCellSortProps>;
  };
};
