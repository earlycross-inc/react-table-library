import { storiesOf } from '@storybook/react';
import * as React from 'react';

import {
    Body, Cell, Header, HeaderCell, HeaderRow, Row, Table
} from '@earlycross-inc/react-table-library/table';
import { useTheme } from '@earlycross-inc/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Mixing Features/Column Hide & Horizontal', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const [hiddenColumns, setHiddenColumns] = React.useState(['DEADLINE', 'COMPLETE']);

    const toggleColumn = (column) => {
      if (hiddenColumns.includes(column)) {
        setHiddenColumns(hiddenColumns.filter((v) => v !== column));
      } else {
        setHiddenColumns(hiddenColumns.concat(column));
      }
    };

    const theme = useTheme({
      Table: `
        --data-table-library_grid-template-columns:  50% 40% 20%;
      `,
    });

    return (
      <>
        <div>
          <label htmlFor="name">
            <input
              id="name"
              type="checkbox"
              value="NAME"
              checked={!hiddenColumns.includes('NAME')}
              onChange={() => toggleColumn('NAME')}
            />
            Name
          </label>
        </div>

        <div>
          <label htmlFor="deadline">
            <input
              id="deadline"
              type="checkbox"
              value="DEADLINE"
              checked={!hiddenColumns.includes('DEADLINE')}
              onChange={() => toggleColumn('DEADLINE')}
            />
            Deadline
          </label>
        </div>

        <div>
          <label htmlFor="type">
            <input
              id="type"
              type="checkbox"
              value="TYPE"
              checked={!hiddenColumns.includes('TYPE')}
              onChange={() => toggleColumn('TYPE')}
            />
            Type
          </label>
        </div>

        <div>
          <label htmlFor="complete">
            <input
              id="complete"
              type="checkbox"
              value="COMPLETE"
              checked={!hiddenColumns.includes('COMPLETE')}
              onChange={() => toggleColumn('COMPLETE')}
            />
            Complete
          </label>
        </div>

        <div>
          <label htmlFor="tasks">
            <input
              id="tasks"
              type="checkbox"
              value="TASKS"
              checked={!hiddenColumns.includes('TASKS')}
              onChange={() => toggleColumn('TASKS')}
            />
            Tasks
          </label>
        </div>

        <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell hide={hiddenColumns.includes('NAME')}>Task</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('DEADLINE')}>Deadline</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TYPE')}>Type</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('COMPLETE')}>Complete</HeaderCell>
                  <HeaderCell hide={hiddenColumns.includes('TASKS')}>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell hide={hiddenColumns.includes('NAME')}>{item.name}</Cell>
                    <Cell hide={hiddenColumns.includes('DEADLINE')}>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TYPE')}>{item.type}</Cell>
                    <Cell hide={hiddenColumns.includes('COMPLETE')}>
                      {item.isComplete.toString()}
                    </Cell>
                    <Cell hide={hiddenColumns.includes('TASKS')}>{item.nodes?.length}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
