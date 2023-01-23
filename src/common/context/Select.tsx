import * as React from 'react';

import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { Select } from '@earlycross-inc/react-table-library/types/select';

const SelectContext = React.createContext<Select | Nullish>(null);

export { SelectContext };
