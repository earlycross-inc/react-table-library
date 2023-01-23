import * as React from 'react';

import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { Tree } from '@earlycross-inc/react-table-library/types/tree';

const TreeContext = React.createContext<Tree | Nullish>(null);

export { TreeContext };
