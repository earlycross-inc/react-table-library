import { storiesOf } from '@storybook/react';
import * as React from 'react';

import {
    Body, Cell, Header, HeaderCell, HeaderRow, Row, Table, useCustom
} from '@earlycross-inc/react-table-library/table';

import { getData } from '../../server';

storiesOf('Server Recipes/Debounce', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const [data, setData] = React.useState({
      nodes: [],
    });

    // initial fetching

    const doGet = React.useCallback(async (params) => {
      setData(await getData(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    // features

    const [search, setSearch] = React.useState('');

    useCustom('search', data, {
      state: { search },
      onChange: onSearchChange,
    });

    const timeout = React.useRef();

    function onSearchChange(action, state) {
      const params = {
        search: state.search,
      };

      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => doGet(params), 500);
    }

    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    return (
      <>
        <label htmlFor="search">
          Search by Task:&nbsp;
          <input id="search" type="text" onChange={handleSearch} />
        </label>
        <br />

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
