import { storiesOf } from '@storybook/react';
import * as React from 'react';


import {
    Body, Cell, Header, HeaderCell, HeaderRow, Row, Table
} from '@earlycross-inc/react-table-library/table';

import { CellTree, useTree } from '@earlycross-inc/react-table-library/tree';

import { nodes } from '../data';

storiesOf('Kitchen Sink/Tree', module)
  .addParameters({ component: Table })
  .add('zoom on double click (WIP)', () => {
    const data = { nodes };

    const tree = useTree(data, {
      onChange: onTreeChange,
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item} onDoubleClick={(item) => console.log(item)}>
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
    );
  });
