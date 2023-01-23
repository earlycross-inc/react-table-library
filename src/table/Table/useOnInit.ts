import * as React from 'react';

import { TableElementRef } from '@earlycross-inc/react-table-library/types/layout';
import { OnInitFunction } from '@earlycross-inc/react-table-library/types/table';

export const useOnInit = (
  onInit: OnInitFunction,
  tableElementRef: TableElementRef,
): [boolean, OnInitFunction] => {
  const [calledOnce, setCalledOnce] = React.useState(false);

  const callbackRef = (node: HTMLTableElement) => {
    if (!node) return;

    if (calledOnce) return;
    setCalledOnce(true);

    tableElementRef.current = node;

    onInit(node);
  };

  return [calledOnce, callbackRef];
};
