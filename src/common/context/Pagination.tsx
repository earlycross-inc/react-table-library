import * as React from 'react';

import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { Pagination } from '@earlycross-inc/react-table-library/types/pagination';

const PaginationContext = React.createContext<Pagination | Nullish>(null);

export { PaginationContext };
