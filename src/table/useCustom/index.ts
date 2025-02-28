import { useReducerWithMiddleware } from '@earlycross-inc/react-table-library/common/util/useReducerWithMiddleware';
import { useSyncControlledState } from '@earlycross-inc/react-table-library/common/util/useSyncControlledState';
import { useSyncRefState } from '@earlycross-inc/react-table-library/common/util/useSyncRefState';

import {
  Action,
  Nullish,
  State,
  StateAndChange,
} from '@earlycross-inc/react-table-library/types/common';
import { Data } from '@earlycross-inc/react-table-library/types/table';

const set = (state: State, action: Action) => ({
  ...state,
  ...action.payload,
});

const SET = 'SET';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET: {
      return set(state, action);
    }
    default:
      throw new Error();
  }
};

const DEFAULT_STATE = {};

const useCustom = (name: string, data: Data, primary: StateAndChange | Nullish, context?: any) => {
  const controlledState: State = primary?.state
    ? { ...DEFAULT_STATE, ...primary.state }
    : { ...DEFAULT_STATE };

  const onChange = primary?.onChange ? primary.onChange : () => {};

  const [state, dispatchWithMiddleware] = useReducerWithMiddleware(
    reducer,
    controlledState,
    [],
    [onChange],
    context,
  );

  useSyncControlledState(controlledState, state, () =>
    dispatchWithMiddleware({
      type: SET,
      payload: controlledState,
    }),
  );

  useSyncRefState(name, context, state);

  return state;
};

export { useCustom };
