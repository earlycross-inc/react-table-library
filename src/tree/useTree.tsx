import IconChevronSingleDown from '@earlycross-inc/react-table-library/common/icons/IconChevronSingleDown';
import IconChevronSingleRight from '@earlycross-inc/react-table-library/common/icons/IconChevronSingleRight';
import { isRowClick } from '@earlycross-inc/react-table-library/common/util/isRowClick';
import {
  fromTreeToListExtended,
  isLeaf,
} from '@earlycross-inc/react-table-library/common/util/tree';
import { useIdReducer } from '@earlycross-inc/react-table-library/common/util/useIdReducer';
import { useSyncRefState } from '@earlycross-inc/react-table-library/common/util/useSyncRefState';
import cs from 'clsx';
import * as React from 'react';

import { State, StateAndChange } from '@earlycross-inc/react-table-library/types/common';
import {
  Data,
  FeatureProps,
  Features,
  RowProps,
  TableNode,
} from '@earlycross-inc/react-table-library/types/table';
import {
  Tree,
  TreeExpandClickTypes,
  TreeOptions,
} from '@earlycross-inc/react-table-library/types/tree';

import { CellTree } from './CellTree';

const getRowProps = (props: RowProps, features: Features): FeatureProps => {
  const { item } = props;

  const { tree } = features;

  if (!tree) {
    throw new Error("No 'tree' in getRowProps. That's odd");
  }

  const isTreeExpanded = tree.state.ids.includes(item.id);

  const treeYLevel = item.treeYLevel || tree.options.treeYLevel;
  const treeXLevel = item.treeXLevel || tree.options.treeXLevel;

  const theme = `
    &.row-tree-clickable {
      cursor: pointer;
    }

    .td:nth-of-type(${treeYLevel + 1}) > div {
      padding-left: ${treeXLevel * tree.options.indentation}px;
    }
  `;

  const className = cs('row-tree', {
    'row-tree-clickable': tree.options.clickType === TreeExpandClickTypes.RowClick,
    'row-tree-expanded': isTreeExpanded,
    'row-tree-leaf': isLeaf(item),
  });

  const onClick = (node: TableNode, event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (!isRowClick(event)) return;

    if (isLeaf(node)) return;

    if (tree.options.clickType === TreeExpandClickTypes.RowClick) {
      tree.fns.onToggleById(node.id);
    }
  };

  return {
    theme,
    className,
    onClick,
  };
};

const DEFAULT_STATE = {
  ids: [],
};

const DEFAULT_TREE_ICON = {
  margin: '4px',
  size: '14px',
  noIconMargin: '0px',
  iconDefault: null,
  iconRight: <IconChevronSingleRight />,
  iconDown: <IconChevronSingleDown />,
};

const DEFAULT_OPTIONS = {
  isServer: false,
  treeIcon: DEFAULT_TREE_ICON,
  clickType: TreeExpandClickTypes.RowClick,
  indentation: 20,
  treeXLevel: 0,
  treeYLevel: 0,
};

const useTree = (
  data: Data,
  primary?: StateAndChange,
  options?: TreeOptions,
  context?: any,
): Tree => {
  const controlledState: State = primary?.state
    ? { ...DEFAULT_STATE, ...primary.state }
    : { ...DEFAULT_STATE };

  const onChange = primary?.onChange ? primary.onChange : () => {};

  const [state, fns] = useIdReducer(data, controlledState, onChange, context);

  useSyncRefState('tree', context, state);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
    treeIcon: {
      ...DEFAULT_TREE_ICON,
      ...(options ? options.treeIcon : {}),
    },
  };

  const modifier = (nodes: TableNode[]): TableNode[] => {
    if (mergedOptions.isServer) {
      return nodes;
    }

    return fromTreeToListExtended(
      data,
      nodes,
      state.ids,
      mergedOptions.treeXLevel,
      mergedOptions.treeYLevel,
      null,
    );
  };

  return {
    state,
    fns,
    options: mergedOptions,
    _getRowProps: getRowProps,
    modifier,
    components: {
      CellTree,
    },
  };
};

export { useTree };
