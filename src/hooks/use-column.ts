'use client';

import { useState, useMemo } from 'react';
import { filterData } from '@/utils/filter-data';

export function useColumn<T extends Record<string, any>>(columnsData: T[]) {

  const firstIndex = 0; // Index of the first column
  const lastIndex = columnsData.length - 1; // Index of the last column

  const [checkedColumns, setCheckedColumns] = useState(
    columnsData.map((column, index) =>
      index === firstIndex || index === lastIndex || (index > firstIndex && index < lastIndex && index - firstIndex <= 8)
        ? column.dataIndex
        : null
    )
  );

  // const [checkedColumns, setCheckedColumns] = useState(
  //   columnsData.map((column) => column.dataIndex)
  // );

  const visibleColumns = useMemo(
    () => filterData(columnsData, checkedColumns),
    [columnsData, checkedColumns]
  );

  return { visibleColumns, checkedColumns, setCheckedColumns };
}
