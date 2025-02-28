import * as React from 'react';

import { useFeatures } from '@earlycross-inc/react-table-library/common/context/Feature';
import { SelectContext } from '@earlycross-inc/react-table-library/common/context/Select';
import { useShiftDown } from '@earlycross-inc/react-table-library/common/hooks/useShiftDown';
import { applyModifiers } from '@earlycross-inc/react-table-library/common/util/modifiers';
import { Cell } from '@earlycross-inc/react-table-library/table/Cell';

import { CellSelectProps, SelectTypes } from '@earlycross-inc/react-table-library/types/select';

import { Checkbox } from './Checkbox';

export const CellSelect: React.FC<CellSelectProps> = React.memo(
  ({ item, ...passThrough }: CellSelectProps) => {
    const select = React.useContext(SelectContext);

    const features = useFeatures();
    const isShiftDown = useShiftDown();

    if (!select) {
      throw new Error(
        'No Select Context. No return value from useRowSelect provided to Table component.',
      );
    }

    const isSelected =
      select.options.buttonSelect === SelectTypes.SingleSelect
        ? select.state.id === item.id || select.state.ids.includes(item.id)
        : select.state.ids.includes(item.id);

    const handleChange = React.useCallback(() => {
      const isMuiltiSelectType = select.options.buttonSelect === SelectTypes.MultiSelect;

      if (isShiftDown && isMuiltiSelectType) {
        select.fns.onToggleByIdShift(item.id, select.options, applyModifiers(features));
      } else if (isMuiltiSelectType) {
        select.fns.onToggleByIdRecursively(item.id, {
          isCarryForward: select.options.isCarryForward,
          isPartialToAll: select.options.isPartialToAll,
        });
      } /* isSingleSelectType */ else {
        select.fns.onToggleByIdExclusively(item.id);
      }
    }, [isShiftDown, features, item.id, select]);

    return (
      <Cell stiff {...passThrough}>
        <Checkbox checked={!!isSelected} onChange={handleChange} />
      </Cell>
    );
  },
);
