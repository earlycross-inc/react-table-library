import * as React from 'react';

import { CompactTable } from '@earlycross-inc/react-table-library/compact';
import { DEFAULT_OPTIONS, getTheme } from '@earlycross-inc/react-table-library/mantine';
import { useTheme } from '@earlycross-inc/react-table-library/theme';

import { manyNodes } from '../../../data';
import { DocumentationSee } from '../../../documentation';

const key = 'Virtualized';

const Component = () => {
  const data = { nodes: manyNodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS, { isVirtualized: true });
  const theme = useTheme(mantineTheme);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name },
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

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item, _index) => 41.5,
  };

  return (
    <>
      <div style={{ height: '300px' }}>
        <CompactTable
          columns={COLUMNS}
          virtualizedOptions={VIRTUALIZED_OPTIONS}
          data={data}
          theme={theme}
          layout={{ isDiv: true, fixedHeader: true }}
        />
      </div>

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

import { DocumentationSee } from '../../../documentation';
import { manyNodes } from '../../../data';

const key = 'Virtualized';

const Component = () => {
  const data = { nodes: manyNodes };

  const mantineTheme = getTheme(DEFAULT_OPTIONS, { isVirtualized: true });
  const theme = useTheme(mantineTheme);

  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name },
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

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item, _index) => 41.5,
  };

  return (
    <>
      <div style={{ height: '300px' }}>
        <CompactTable
          columns={COLUMNS}
          virtualizedOptions={VIRTUALIZED_OPTIONS}
          data={data}
          theme={theme}
          layout={{ isDiv: true, fixedHeader: true }}
        />
      </div>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
