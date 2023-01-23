import * as React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from '@emotion/react';

import { LayoutContext } from '@earlycross-inc/react-table-library/common/context';
import { ThemeContext } from '@earlycross-inc/react-table-library/common/context/Theme';

import { BodyProps } from '@earlycross-inc/react-table-library/types/table';

export const Body: React.FC<BodyProps> = ({ children, ...rest }: BodyProps) => {
  const theme = React.useContext(ThemeContext);

  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('No Layout Context.');
  }

  const { layout } = context;

  const As = layout?.isDiv ? 'div' : 'tbody';

  return (
    <As
      css={css`
        ${theme?.Body}

        display: contents;
      `}
      data-table-library_body=""
      className="tbody"
      {...rest}
    >
      {children}
    </As>
  );
};
