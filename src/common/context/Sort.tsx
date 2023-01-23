import * as React from 'react';

import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { Sort } from '@earlycross-inc/react-table-library/types/sort';

const SortContext = React.createContext<Sort | Nullish>(null);

export { SortContext };
