import * as React from 'react';

import { Table } from '@earlycross-inc/react-table-library/table/index';

import { Column, CompactTableProps } from '@earlycross-inc/react-table-library/types/compact';
import { TableNode } from '@earlycross-inc/react-table-library/types/table';

import { CompactFooter } from './CompactFooter';
import { NormalTable } from './NormalTable';
import { VirtualizedTable } from './VirtualizedTable';

export const CompactTable: React.FC<CompactTableProps> = React.forwardRef(
  (
    {
      columns,
      rowProps = {},
      tableOptions,
      rowOptions,
      virtualizedOptions,
      ...tableProps
    }: CompactTableProps,
    ref: any,
  ) => {
    const { data, theme, layout, sort, pagination, select, tree, onInit = () => {} } = tableProps;

    return (
      <Table
        ref={ref}
        data={data}
        theme={theme}
        layout={layout}
        sort={sort}
        pagination={pagination}
        select={select}
        tree={tree}
        onInit={onInit}
      >
        {(tableList: TableNode[]) => (
          <React.Fragment>
            {tableOptions?.renderBeforeTable && tableOptions.renderBeforeTable()}
            {virtualizedOptions ? (
              <VirtualizedTable
                tableList={tableList}
                columns={columns}
                rowProps={rowProps}
                rowOptions={rowOptions}
                virtualizedOptions={virtualizedOptions}
                {...tableProps}
              />
            ) : (
              <NormalTable
                tableList={tableList}
                columns={columns}
                rowProps={rowProps}
                rowOptions={rowOptions}
                {...tableProps}
              />
            )}
            {columns.some((column: Column) => !!column.footer) && (
              <CompactFooter columns={columns} />
            )}
            {tableOptions?.renderAfterTable && tableOptions.renderAfterTable()}
          </React.Fragment>
        )}
      </Table>
    );
  },
);
