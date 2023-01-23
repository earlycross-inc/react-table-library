import { storiesOf } from '@storybook/react';

import { CompactTable } from '@earlycross-inc/react-table-library/compact';

import * as BaseStory from './base';
import * as EditableStory from './editable';
import * as ExpandStory from './expand';
import * as FilterStory from './filter';
import * as FixedColumnStory from './fixed-column';
import * as FixedHeaderStory from './fixed-header';
import * as HorizontalScrollStory from './horizontal-scroll';
import * as LayoutStory from './layout';
import * as NativeStory from './native';
import * as PaginationStory from './pagination';
import * as ResizeStory from './resize';
import * as SearchStory from './search';
import * as SelectStory from './select';
import * as ShowreelStory from './showreel';
import * as SortStory from './sort';
import * as ThemeStory from './theme';
import * as TreeStory from './tree';
import * as VirtualizedStory from './virtualized';
// import * as DataGridStory from './data-grid';
import * as ColumnHideStory from './column-hide';
import * as ColumnOrderStory from './column-order';

const stories = [
  BaseStory,
  NativeStory,
  ShowreelStory,
  ThemeStory,
  LayoutStory,
  ResizeStory,
  SortStory,
  SearchStory,
  FilterStory,
  SelectStory,
  TreeStory,
  ExpandStory,
  PaginationStory,
  FixedHeaderStory,
  HorizontalScrollStory,
  FixedColumnStory,
  VirtualizedStory,
  EditableStory,
  // DataGridStory,
  ColumnHideStory,
  ColumnOrderStory,
];

const storyContainer = storiesOf('Library Themes/Mantine', module).addParameters({
  component: CompactTable,
});

stories.forEach((story) => {
  storyContainer.add(story.key, story.Component, {
    docs: { source: { code: story.code || '' } },
  });
});
