import * as React from 'react';

import { CompactTable } from '@earlycross-inc/react-table-library/compact';
import { DEFAULT_OPTIONS, getTheme } from '@earlycross-inc/react-table-library/mantine';
import { useRowSelect } from '@earlycross-inc/react-table-library/select';
import { useTheme } from '@earlycross-inc/react-table-library/theme';
import { Checkbox } from '@mantine/core';

import { nodes } from '../../../data';
import { DocumentationSee } from '../../../documentation';

const key = 'Select';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns:  44px repeat(5, minmax(0, 1fr));
    `,
  };
  const theme = useTheme([mantineTheme, customTheme]);

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: 'Task',
      renderCell: (item) => item.name,
      select: {
        renderHeaderCellSelect: () => (
          <Checkbox
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        ),
      },
    },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item) => item.type },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length },
  ];

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true }}
        select={select}
      />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@earlycross-inc/react-table-library/compact';
import { useTheme } from '@earlycross-inc/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@earlycross-inc/react-table-library/mantine';
import { useRowSelect } from '@earlycross-inc/react-table-library/select';
import { Checkbox } from '@mantine/core';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Select';

const Component = () => {
  const data = { nodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: \`
      --data-table-library_grid-template-columns:  44px repeat(5, minmax(0, 1fr));
    \`,
  };
  const theme = useTheme([mantineTheme, customTheme]);

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: 'Task',
      renderCell: (item) => item.name,
      select: {
        renderHeaderCellSelect: () => (
          <Checkbox
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        ),
        renderCellSelect: (item) => (
          <Checkbox
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        ),
      },
    },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item) => item.type },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
    },
    { label: 'Tasks', renderCell: (item) => item.nodes?.length },
  ];

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true }}
        select={select}
      />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
