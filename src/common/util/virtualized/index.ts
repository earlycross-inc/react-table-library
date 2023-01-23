import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { TableNode } from '@earlycross-inc/react-table-library/types/table';
import { RowHeight } from '@earlycross-inc/react-table-library/types/virtualized';

export const getRowHeight = (
  rowHeight: RowHeight | Nullish,
  item: TableNode,
  index: number,
): number => {
  let actualRowHeight = 0;
  if (rowHeight) {
    if (typeof rowHeight === 'number') {
      actualRowHeight = rowHeight;
    }

    if (typeof rowHeight === 'function') {
      actualRowHeight = rowHeight(item, index);
    }
  }

  return actualRowHeight;
};

export const SHARED_VIRTUALIZE_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'var(--data-table-library_grid-template-columns)',
};
