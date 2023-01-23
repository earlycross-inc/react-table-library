import * as React from 'react';

import { HeaderCell } from '../Cell';
import { Header } from '../Header';
import { HeaderRow } from '../Row';

import {
  HeaderCellProps,
  HeaderProps,
  HeaderRowProps,
} from '@earlycross-inc/react-table-library/types/table';

const Footer: React.FC<HeaderProps> = (props) => <Header {...props} isFooter />;

const FooterRow: React.FC<HeaderRowProps> = (props) => (
  <HeaderRow {...props} isFooter role="rowfooter" />
);

const FooterCell: React.FC<HeaderCellProps> = (props) => (
  <HeaderCell {...props} isFooter role="columnfooter" />
);

export { Footer, FooterRow, FooterCell };
