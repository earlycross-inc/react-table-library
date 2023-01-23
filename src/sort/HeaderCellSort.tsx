import * as React from 'react';

import { SortContext } from '@earlycross-inc/react-table-library/common/context/Sort';
import { HeaderCell } from '@earlycross-inc/react-table-library/table/Cell';

import { HeaderCellSortProps } from '@earlycross-inc/react-table-library/types/sort';

import { SortButton } from './SortButton';

export const HeaderCellSort: React.FC<HeaderCellSortProps> = React.memo(
  ({ sortKey, sortIcon = {}, children, ...passThrough }: HeaderCellSortProps) => {
    const sort = React.useContext(SortContext);

    if (!sort) {
      throw new Error('No Sort Context. No return value from useSort provided to Table component.');
    }

    return (
      <HeaderCell {...passThrough}>
        <SortButton sort={sort} sortKey={sortKey} sortIcon={sortIcon}>
          {children}
        </SortButton>
      </HeaderCell>
    );
  },
);
