import cs from 'clsx';
import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from '@emotion/react';

import { LayoutProvider } from '@earlycross-inc/react-table-library/common/context/Layout';
import { PaginationContext } from '@earlycross-inc/react-table-library/common/context/Pagination';
import { SelectContext } from '@earlycross-inc/react-table-library/common/context/Select';
import { SortContext } from '@earlycross-inc/react-table-library/common/context/Sort';
import { TableContext } from '@earlycross-inc/react-table-library/common/context/Table';
import { ThemeContext } from '@earlycross-inc/react-table-library/common/context/Theme';
import { TreeContext } from '@earlycross-inc/react-table-library/common/context/Tree';

import { useShiftDown } from '@earlycross-inc/react-table-library/common/hooks/useShiftDown';
import { applyModifiers } from '@earlycross-inc/react-table-library/common/util/modifiers';
import { useTheme } from '@earlycross-inc/react-table-library/theme/index';

import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import {
  Layout,
  TableElementRef,
  TableMemory,
  TableMemoryRef,
} from '@earlycross-inc/react-table-library/types/layout';
import { TableProps } from '@earlycross-inc/react-table-library/types/table';
import { Theme } from '@earlycross-inc/react-table-library/types/theme';

import { useOnInit } from './useOnInit';

import styles from './styles';

const useTableElementRef = (ref: TableElementRef | Nullish): TableElementRef => {
  let tableElementRef = React.useRef(null) as TableElementRef;
  if (ref) tableElementRef = ref;

  return tableElementRef;
};

const useTableMemoryRef = (layout: Layout | Nullish): TableMemoryRef => {
  const tableMemoryRef = React.useRef<TableMemory | null>(null);

  if (!tableMemoryRef.current) {
    tableMemoryRef.current = {
      onlyOnce: false,
      dataColumns: [],
    };
  }

  return tableMemoryRef;
};

const FULL_HEIGHT_THEME = {
  Table: `
    height: 100%;
  `,
};

const Table: React.FC<TableProps> = React.forwardRef(
  (
    {
      data,
      theme: customTheme,
      layout,
      sort,
      pagination,
      select,
      tree,
      onInit = () => {},
      className = 'table',
      children,
      ...rest
    }: TableProps,
    ref: any,
  ) => {
    const tableElementRef = useTableElementRef(ref);
    const tableMemoryRef = useTableMemoryRef(layout);

    // if changed, adjust useFeatures hook
    const modifiedNodes = applyModifiers({
      sort,
      pagination,
      tree,
      select,
    })(data.nodes);

    // callback handler to notifty internal but also optionally outside world that table got rendered
    const [calledOnce, callbackRef] = useOnInit(onInit, tableElementRef);

    // no selection of content (e.g. text) in table if shift is active (e.g. select shift feature)
    const isShiftDown = useShiftDown();

    let allThemes: Theme[] = [];
    if (layout?.fixedHeader) {
      allThemes = allThemes.concat(FULL_HEIGHT_THEME);
    }
    if (customTheme) {
      allThemes = allThemes.concat(customTheme);
    }

    const theme = useTheme(allThemes);

    const As = layout?.isDiv ? 'div' : 'table';

    return (
      <As
        role="grid"
        data-table-library_table=""
        css={css`
          ${styles({ isShiftDown })}
          ${theme?.Table}
        `}
        className={cs(className)}
        ref={callbackRef}
        {...rest}
      >
        {calledOnce && (
          <TableContext.Provider value={data}>
            <ThemeContext.Provider value={theme}>
              <SortContext.Provider value={sort}>
                <SelectContext.Provider value={select}>
                  <TreeContext.Provider value={tree}>
                    <PaginationContext.Provider value={pagination}>
                      <LayoutProvider
                        layout={layout}
                        tableElementRef={tableElementRef}
                        tableMemoryRef={tableMemoryRef}
                      >
                        {children && children(modifiedNodes)}
                      </LayoutProvider>
                    </PaginationContext.Provider>
                  </TreeContext.Provider>
                </SelectContext.Provider>
              </SortContext.Provider>
            </ThemeContext.Provider>
          </TableContext.Provider>
        )}
      </As>
    );
  },
);

export { Table };
