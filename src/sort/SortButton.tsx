import cs from 'clsx';
import * as React from 'react';

import { Button } from '@earlycross-inc/react-table-library/common/components/Button';

import { Nullish, State } from '@earlycross-inc/react-table-library/types/common';
import {
  Sort,
  SortIconPositions,
  SortOptionsIcon,
} from '@earlycross-inc/react-table-library/types/sort';

const getSortIcon = (
  sortState: State,
  sortKey: string,
  sortIconSize: string,
  SortIconDefault: React.ReactElement | Nullish,
  SortIconUp: React.ReactElement | Nullish,
  SortIconDown: React.ReactElement | Nullish,
) => {
  const size = {
    height: `${sortIconSize}`,
    width: `${sortIconSize}`,
  };

  if (sortState.sortKey === sortKey && sortState.reverse) {
    return SortIconDown ? React.cloneElement(SortIconDown, { ...size }) : null;
  }

  if (sortState.sortKey === sortKey && !sortState.reverse) {
    return SortIconUp ? React.cloneElement(SortIconUp, { ...size }) : null;
  }

  return SortIconDefault ? React.cloneElement(SortIconDefault, { ...size }) : null;
};

type SortButtonProps = {
  sort: Sort;
  sortKey: string;
  sortIcon: SortOptionsIcon;
  children: React.ReactNode;
};

export const SortButton: React.FC<SortButtonProps> = ({
  sort,
  sortKey,
  sortIcon = {},
  children,
}: SortButtonProps) => {
  const { state, fns, options } = sort;

  const mergedSortIconOptions = {
    ...options.sortIcon,
    ...sortIcon,
  };

  const prefix = mergedSortIconOptions.position === SortIconPositions.Prefix;
  const suffix = mergedSortIconOptions.position === SortIconPositions.Suffix;

  const icon = getSortIcon(
    state,
    sortKey,
    mergedSortIconOptions.size,
    mergedSortIconOptions.iconDefault,
    mergedSortIconOptions.iconUp,
    mergedSortIconOptions.iconDown,
  );

  const handleToggleSort = () => fns.onToggleSort({ sortKey });

  return (
    <Button
      className={cs({
        active: state.sortKey === sortKey,
      })}
      onClick={handleToggleSort}
    >
      {prefix && icon && <span style={{ marginRight: mergedSortIconOptions.margin }}>{icon}</span>}
      <div title={typeof children === 'string' ? children : ''}>{children}</div>
      {suffix && icon && <span style={{ marginLeft: mergedSortIconOptions.margin }}>{icon}</span>}
    </Button>
  );
};
