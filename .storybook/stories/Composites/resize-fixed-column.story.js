import { storiesOf } from '@storybook/react';
import * as React from 'react';

import {
    Body, Cell, Header, HeaderCell, HeaderRow, Row, Table
} from '@earlycross-inc/react-table-library/table';
import { useTheme } from '@earlycross-inc/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Mixing Features/Resize & Fixed Column', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        --data-table-library_grid-template-columns:  250px 150px 25% 25% 50%;
      `,
      BaseCell: `
        &:nth-of-type(1) {
          left: 0px;
        }

        &:nth-of-type(2) {
          left: 250px;
        }
      `,
    });

    return (
      <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell resize pinLeft>
                  Task
                </HeaderCell>
                <HeaderCell resize pinLeft>
                  Deadline
                </HeaderCell>
                <HeaderCell resize>Type</HeaderCell>
                <HeaderCell resize>Complete</HeaderCell>
                <HeaderCell resize>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell pinLeft>{item.name}</Cell>
                  <Cell pinLeft>
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
    );
  });
