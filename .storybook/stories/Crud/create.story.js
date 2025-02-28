import { storiesOf } from '@storybook/react';
import * as React from 'react';

import {
    Body, Cell, Header, HeaderCell, HeaderRow, Row, Table
} from '@earlycross-inc/react-table-library/table';

import { nodes } from '../data';

storiesOf('CRUD', module)
  .addParameters({ component: Table })
  .add('Create', () => {
    const [data, setData] = React.useState({ nodes });
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handleSubmit = (event) => {
      const id = Math.floor(Math.random() * (9990 - 0 + 1)) + 0;

      setData((state) => ({
        ...state,
        nodes: state.nodes.concat({
          id,
          name: value,
          deadline: new Date(),
          type: 'LEARN',
          isComplete: false,
          nodes: null,
        }),
      }));

      event.preventDefault();
    };

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} />
          <button type="submit">Create</button>
        </form>

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
                    <Cell>{item.name}</Cell>
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
      </>
    );
  });
