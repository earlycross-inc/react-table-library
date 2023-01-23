import { Nullish } from '@earlycross-inc/react-table-library/types/common';
import { TableNode } from '@earlycross-inc/react-table-library/types/table';

export const hasLeaves = <T extends TableNode>(node: T | Nullish): boolean => !!node?.nodes?.length;
