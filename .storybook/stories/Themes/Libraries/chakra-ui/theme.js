import * as React from 'react';

import { Box } from '@chakra-ui/react';
import { DEFAULT_OPTIONS, getTheme } from '@earlycross-inc/react-table-library/chakra-ui';
import { CompactTable } from '@earlycross-inc/react-table-library/compact';
import { useTheme } from '@earlycross-inc/react-table-library/theme';

import { nodes } from '../../../data';
import { DocumentationSee } from '../../../documentation';

const key = 'Theme';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    BaseCell: `
      border-right: 1px solid transparent;
    `,
    Row: `
      &:nth-of-type(odd) {
        .td:nth-of-type(even) {
          background-color: #dddddd;
        }

        .td:nth-of-type(odd) {
          background-color: #fafafa;
        }
      }

      &:nth-of-type(even) {
        .td:nth-of-type(odd) {
          background-color: #dddddd;
        }

        .td:nth-of-type(even) {
          background-color: #fafafa;
        }
      }
  `,
  };
  const theme = useTheme([chakraTheme, customTheme]);

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

  return (
    <>
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

const code = `
import * as React from 'react';

import { CompactTable } from '@earlycross-inc/react-table-library/compact';
import { useTheme } from '@earlycross-inc/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@earlycross-inc/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';

import { DocumentationSee } from '../../../documentation';
import { nodes } from '../../../data';

const key = 'Theme';

const Component = () => {
  const data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    BaseCell: \`
      border-right: 1px solid transparent;
    \`,
    Row: \`
      &:nth-of-type(odd) {
        .td:nth-of-type(even) {
          background-color: #dddddd;
        }

        .td:nth-of-type(odd) {
          background-color: #fafafa;
        }
      }

      &:nth-of-type(even) {
        .td:nth-of-type(odd) {
          background-color: #dddddd;
        }

        .td:nth-of-type(even) {
          background-color: #fafafa;
        }
      }
  \`,
  };
  const theme = useTheme([chakraTheme, customTheme]);

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

  return (
    <>
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box>

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};
`;

export { key, Component, code };
