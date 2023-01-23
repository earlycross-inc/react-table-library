import * as React from 'react';

import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { Theme } from '@earlycross-inc/react-table-library/types/theme';

const ThemeContext = React.createContext<Theme | Nullish>(null);

export { ThemeContext };
