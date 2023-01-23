import cs from 'clsx';
import * as React from 'react';

import * as COLORS from '@earlycross-inc/react-table-library/common/colors';
import { isRowClick } from '@earlycross-inc/react-table-library/common/util/isRowClick';
import { applyModifiers } from '@earlycross-inc/react-table-library/common/util/modifiers';
import { useIdReducer } from '@earlycross-inc/react-table-library/common/util/useIdReducer';
import { useSyncRefState } from '@earlycross-inc/react-table-library/common/util/useSyncRefState';

import { State, StateAndChange } from '@earlycross-inc/react-table-library/types/common';
import {
  Select,
  SelectClickTypes,
  SelectOptions,
  SelectTypes,
} from '@earlycross-inc/react-table-library/types/select';
import {
  Data,
  FeatureProps,
  Features,
  RowProps,
  TableNode,
} from '@earlycross-inc/react-table-library/types/table';

import { CellSelect } from './CellSelect';
import { HeaderCellSelect } from './HeaderCellSelect';

const getRowProps = (props: RowProps, features: Features): FeatureProps => {
  const { item } = props;

  const { select } = features;

  if (!select) {
    throw new Error("No 'select' in getRowProps. That's odd");
  }

  const isMultiSelected = select.state.ids.includes(item.id);
  const isSingleSelect = select.state.id === item.id;

  const theme = `
    &.row-select-selected,
    &.row-select-single-selected {
      font-weight: bold;

      background-color: ${COLORS.ROW_SELECTED};
    }

    &.row-select-clickable {
      cursor: pointer;
    }
  `;

  const className = cs('row-select', {
    'row-select-clickable': select.options.clickType === SelectClickTypes.RowClick,
    'row-select-selected': isMultiSelected,
    'row-select-single-selected': isSingleSelect,
  });

  const onClick = (node: TableNode, event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (!isRowClick(event)) return;
    if (select.options.clickType !== SelectClickTypes.RowClick) return;

    const hasMultiSelectType =
      select.options.rowSelect === SelectTypes.MultiSelect ||
      select.options.buttonSelect === SelectTypes.MultiSelect;

    const isMultiSelectType = select.options.rowSelect === SelectTypes.MultiSelect;

    // optional ways to activate multi-select with keyboard
    const isCommandSelectType = !!(event as any).metaKey;
    const isShiftSelectType = !!(event as any).shiftKey;

    if (isCommandSelectType && hasMultiSelectType) {
      select.fns.onToggleById(node.id);
    } else if (isShiftSelectType && hasMultiSelectType) {
      select.fns.onToggleByIdShift(node.id, select.options, applyModifiers(features));
    } else if (isMultiSelectType) {
      select.fns.onToggleById(node.id);
    } /* isSingleSelectType */ else {
      select.fns.onToggleByIdExclusively(node.id);
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
  id: null,
};

const DEFAULT_OPTIONS = {
  clickType: SelectClickTypes.RowClick,
  rowSelect: SelectTypes.SingleSelect,
  buttonSelect: SelectTypes.MultiSelect,
  isCarryForward: true,
  isPartialToAll: false,
};

const useRowSelect = (
  data: Data,
  primary?: StateAndChange,
  options?: SelectOptions,
  context?: any,
): Select => {
  const controlledState: State = primary?.state
    ? { ...DEFAULT_STATE, ...primary.state }
    : { ...DEFAULT_STATE };

  const onChange = primary?.onChange ? primary.onChange : () => {};

  const [state, fns] = useIdReducer(data, controlledState, onChange, context);

  useSyncRefState('select', context, state);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
  };

  return {
    state,
    fns,
    options: mergedOptions,
    _getRowProps: getRowProps,
    components: {
      HeaderCellSelect,
      CellSelect,
    },
  };
};

export { useRowSelect };
