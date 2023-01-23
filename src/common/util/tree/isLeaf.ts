import { TableNode } from '@earlycross-inc/react-table-library/types/table';

export const isLeaf = <T extends TableNode>(node: T): boolean => !node.nodes;
