import * as React from 'react';

import { PaginationContext } from '@earlycross-inc/react-table-library/common/context/Pagination';
import { SelectContext } from '@earlycross-inc/react-table-library/common/context/Select';
import { SortContext } from '@earlycross-inc/react-table-library/common/context/Sort';
import { TreeContext } from '@earlycross-inc/react-table-library/common/context/Tree';

export const useFeatures = () => {
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const sort = React.useContext(SortContext);
  const pagination = React.useContext(PaginationContext);

  // if changed, adjust applyModifiers usages
  return {
    select,
    tree,
    sort,
    pagination,
    // others
  };
};
