import * as React from 'react';

import { State } from '@earlycross-inc/react-table-library/types/common';

const useSyncRefState = (name: string, context: any, state: State) => {
  React.useEffect(() => {
    if (!context) return;

    context.current[name] = {
      state,
    };
  }, [context, name, state]);
};

export { useSyncRefState };
