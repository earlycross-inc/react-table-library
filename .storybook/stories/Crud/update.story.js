import { storiesOf } from '@storybook/react';
import * as React from 'react';

import {
    Body, Cell, Header, HeaderCell, HeaderRow, Row, Table
} from '@earlycross-inc/react-table-library/table';

import { nodes } from '../data';

storiesOf('CRUD', module)
  .addParameters({ component: Table })
  .add('Update', () => {
    const [data, setData] = React.useState({ nodes });

    const handleUpdate = (value, id) => {
      setData((state) => ({
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === id) {
            return { ...node, name: value };
          } else {
            return node;
          }
        }),
      }));
    };

    return (
      <Table data={data}>
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
                <Row key={item.id} item={item}>
                  <Cell>
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      value={item.name}
                      onChange={(event) => handleUpdate(event.target.value, item.id)}
                    />
                  </Cell>
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
