import { Modifier, State } from '@earlycross-inc/react-table-library/types/common';
import { TableNode } from '@earlycross-inc/react-table-library/types/table';

export type PaginationOptions = {
  isServer?: boolean;
};

export type PaginationOptionsSound = {
  isServer: boolean;
};

export type PaginationFunctions = {
  onSetPage: (page: number) => void;
  onSetSize: (size: number) => void;
};

export type Pagination = {
  state: State;
  fns: PaginationFunctions;
  options: PaginationOptionsSound;
  modifier: Modifier;
};

export type Pages = Record<string, TableNode[]>;
