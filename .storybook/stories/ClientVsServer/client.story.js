import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { usePagination } from '@earlycross-inc/react-table-library/pagination';
import {
    CellSelect,
    HeaderCellSelect,
    useRowSelect
} from '@earlycross-inc/react-table-library/select';
import { HeaderCellSort, useSort } from '@earlycross-inc/react-table-library/sort';
import {
    Body, Cell, Header,
    HeaderRow, Row, Table
} from '@earlycross-inc/react-table-library/table';
import { useTheme } from '@earlycross-inc/react-table-library/theme';
import { CellTree, TreeExpandClickTypes, useTree } from '@earlycross-inc/react-table-library/tree';

import { nodes } from '../data';

storiesOf('Client vs Server', module)
  .addParameters({ component: Table })
  .add('Client-Side', () => {
    const data = {
      nodes,
    };

    const theme = useTheme({
      Table: `
        --data-table-library_grid-template-columns:  24px repeat(5, minmax(0, 1fr));
      `,
    });

    const tree = useTree(
      data,
      {
        onChange: onTreeChange,
      },
      {
        clickType: TreeExpandClickTypes.ButtonClick,
        treeYLevel: 1,
      },
    );

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortFns: {
          TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
          DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
          TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
          COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
          TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
        },
      },
    );

    const pagination = usePagination(data, {
      state: {
        page: 0,
        size: 5,
      },
      onChange: onPaginationChange,
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    function onSortChange(action, state) {
      console.log(action, state);
    }

    function onPaginationChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <Table
          data={data}
          theme={theme}
          layout={{ custom: true }}
          tree={tree}
          select={select}
          sort={sort}
          pagination={pagination}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSelect />
                  <HeaderCellSort resize sortKey="TASK">
                    Task
                  </HeaderCellSort>
                  <HeaderCellSort resize sortKey="DEADLINE">
                    Deadline
                  </HeaderCellSort>
                  <HeaderCellSort resize sortKey="TYPE">
                    Type
                  </HeaderCellSort>
                  <HeaderCellSort resize sortKey="COMPLETE">
                    Complete
                  </HeaderCellSort>
                  <HeaderCellSort resize sortKey="TASKS">
                    Tasks
                  </HeaderCellSort>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <CellSelect item={item} />
                    <CellTree item={item}>{item.name}</CellTree>
                    <Cell>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell>{item.type}</Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>{item.nodes?.length}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>

        <div
          style={{
            fontSize: '14px',
            padding: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

          <span>
            Page:{' '}
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                key={index}
                type="button"
                style={{
                  fontWeight: pagination.state.page === index ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>
      </>
    );
  });
