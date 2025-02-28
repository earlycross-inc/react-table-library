import cs from 'clsx';
import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { HeaderRowContainer } from '@earlycross-inc/react-table-library/common/components/Row';
import {
  LayoutContext,
  preserveResizedLayout,
  setResizedLayout,
} from '@earlycross-inc/react-table-library/common/context';
import { ThemeContext } from '@earlycross-inc/react-table-library/common/context/Theme';
import {
  getHeaderColumns,
  toDataColumn,
} from '@earlycross-inc/react-table-library/common/util/columns';
import { getPreviousColSpans } from '@earlycross-inc/react-table-library/common/util/getPreviousColSpans';
import { isReactFragment } from '@earlycross-inc/react-table-library/common/util/isFragment';

import { HeaderRowProps } from '@earlycross-inc/react-table-library/types/table';

const useInitialLayout = () => {
  const context = React.useContext(LayoutContext);

  React.useLayoutEffect(() => {
    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout, tableElementRef, tableMemoryRef } = context;

    const dataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);

    if (tableMemoryRef.current?.onlyOnce) return;
    tableMemoryRef.current!.onlyOnce = true;

    if (layout?.resizedLayout) {
      const controlledResizedLayout = layout?.resizedLayout;
      setResizedLayout(controlledResizedLayout, tableElementRef, tableMemoryRef);
    }

    // distribute layout once evenly if no custom layout is defined
    else if (!layout?.custom) {
      const visibleDataColumns = dataColumns.filter((dataColumn) => !dataColumn.isHide);

      const getPartialLayout = () => 'minmax(0px, 1fr)';

      const resizedLayout = visibleDataColumns.map(getPartialLayout).join(' ');
      setResizedLayout(resizedLayout, tableElementRef, tableMemoryRef);
    } else {
      preserveResizedLayout(tableElementRef, tableMemoryRef);
    }
  }, [context]);
};

export const HeaderRow: React.FC<HeaderRowProps> = ({
  className,
  role = 'rowheader',
  isFooter,
  children,
  ...rest
}: HeaderRowProps) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef<HTMLTableRowElement>(null);

  useInitialLayout();

  return (
    <HeaderRowContainer
      role={role}
      data-table-library_tr-header=""
      css={css`
        ${theme?.BaseRow}
        ${isFooter ? theme?.FooterRow : theme?.HeaderRow}
      `}
      className={cs('tr', className, {
        'tr-footer': isFooter,
        'tr-header': !isFooter,
      })}
      ref={ref}
      {...rest}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => {
          if (React.isValidElement(child)) {
            let extraProps = {};

            // edge case: CompactTable renders checkbox (select feature) + cell in one fragment
            // this would break the resize feature
            // hence we need to pass the index from the outside then (see CompactTable)

            // also column grouping
            if (!isReactFragment(child)) {
              extraProps = {
                ...extraProps,
                index,
                previousColSpans: getPreviousColSpans(children, index),
              };
            }

            return React.cloneElement(child, extraProps);
          }
        })}
    </HeaderRowContainer>
  );
};
