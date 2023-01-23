import {
  IdReducerFunctions,
  Modifier,
  Nullish,
  State,
} from '@earlycross-inc/react-table-library/types/common';
import { GetRowProps, TableNode } from '@earlycross-inc/react-table-library/types/table';
import * as React from 'react';

export enum TreeExpandClickTypes {
  RowClick,
  ButtonClick,
}

export type TreeOptionsIcon = {
  margin?: string;
  size?: string;
  noIconMargin?: string;
  iconDefault?: React.ReactElement | Nullish;
  iconRight?: React.ReactElement | Nullish;
  iconDown?: React.ReactElement | Nullish;
};

export type TreeOptions = {
  isServer?: boolean;
  treeIcon?: TreeOptionsIcon;
  clickType?: TreeExpandClickTypes;
  indentation?: number;
  treeXLevel?: number;
  treeYLevel?: number;
};

export type TreeOptionsIconSound = {
  margin: string;
  size: string;
  noIconMargin: string;
  iconDefault: React.ReactElement | Nullish;
  iconRight: React.ReactElement | Nullish;
  iconDown: React.ReactElement | Nullish;
};

export type TreeOptionsSound = {
  isServer: boolean;
  treeIcon: TreeOptionsIconSound;
  clickType: TreeExpandClickTypes;
  indentation: number;
  treeXLevel: number;
  treeYLevel: number;
};

export type ColumnTreePropsObject = {
  treeIcon?: TreeOptionsIcon;
};

export type ColumnTreeProps = ColumnTreePropsObject | boolean;

export type CellTreeProps = {
  item: TableNode;
  treeIcon?: TreeOptionsIcon;
  children?: React.ReactNode;
};

export type Tree = {
  state: State;
  fns: IdReducerFunctions;
  options: TreeOptionsSound;
  _getRowProps: GetRowProps;
  modifier: Modifier;
  components: {
    CellTree: React.FunctionComponent<CellTreeProps>;
  };
};
