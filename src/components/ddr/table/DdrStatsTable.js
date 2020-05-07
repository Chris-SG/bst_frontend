import React, { useMemo } from 'react';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import Table from '@material-ui/core/Table';
import { TableFilteringPanel } from './TableFilteringPanel';
import { DdrTableHeader } from './DdrTableHeader';
import { DdrTableBody } from './DdrTableBody';
import { DdrTablePagination } from './DdrTablePagination';

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

export const DdrStatsTable = ({ inputColumns, inputRows }) => {
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
      <TableFilteringPanel columns={columns} />
      <Table {...getTableProps()}>
        <DdrTableHeader headerGroups={headerGroups} />
        <DdrTableBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          rows={r}
        />
      </Table>
      <DdrTablePagination
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
