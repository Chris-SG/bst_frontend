import React, { useMemo } from 'react';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import Table from '@material-ui/core/Table';
//import { TableFilteringPanel } from './TableFilteringPanel';
import { DrsTableHeader } from './DrsTableHeader';
import { DrsTableBody } from './DrsTableBody';
import { DrsTablePagination } from './DrsTablePagination';

export const DefaultCellRenderer = (instance) => {
  return (
    <td
      {...instance.cell.getCellProps()}
    >
      {instance.cell.value}
    </td>
  );
};

function DefaultColumnFilter() {
  return ('');
}

export const DrsDataTable = ({ inputColumns, inputRows }) => {
  console.log(inputColumns, inputRows);
  const c = useMemo(() => inputColumns, [inputColumns]);
  const r = useMemo(() => inputRows, [inputRows]);
  const defaultColumn = React.useMemo(() => ({ Filter: DefaultColumnFilter }), []);

  const {
    columns,
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: c,
      data: r,
      autoResetSortBy: false,
      initialState: { pageIndex: 0 },
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <>
      <Table {...getTableProps()}>
        <DrsTableHeader headerGroups={headerGroups} />
        <DrsTableBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          rows={r}
        />
      </Table>
      <DrsTablePagination
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        previousPage={previousPage}
        setPageSize={setPageSize}
      />
    </>
  );
};
