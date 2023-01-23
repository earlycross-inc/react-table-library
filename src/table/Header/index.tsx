import cs from 'clsx';
import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from '@emotion/react';

import { LayoutContext } from '@earlycross-inc/react-table-library/common/context';
import { ThemeContext } from '@earlycross-inc/react-table-library/common/context/Theme';

import { HeaderProps } from '@earlycross-inc/react-table-library/types/table';

const headerRow = `
  display: contents;
`;

export const Header: React.FC<HeaderProps> = ({ isFooter, children, ...rest }: HeaderProps) => {
  const theme = React.useContext(ThemeContext);

  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { layout } = context;

  const As = layout?.isDiv ? 'div' : isFooter ? 'tfoot' : 'thead';

  return (
    <As
      role="rowgroup"
      className={cs({ tfoot: isFooter, thead: !isFooter })}
      css={css`
        ${headerRow}
        ${isFooter ? theme?.Footer : theme?.Header}
      `}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child);
        }
      })}
    </As>
  );
};
