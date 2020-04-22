import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Row, Table,
} from 'react-bootstrap';
import {
  useFilters, useGlobalFilter, usePagination, useSortBy, useTable,
} from 'react-table';
import { StyledDdrTableRow } from '../../componentstylers/table-styles';

const SortedColumnTitle = (column) => {
  let sortIcon = 'fa-sort';
  switch (column.isSortedDesc) {
    case 'undefined':
      sortIcon = 'fa-sort';
      break;
    case true:
      sortIcon = 'fa-sort-up';
      break;
    case false:
      sortIcon = 'fa-sort-down';
      break;
    default:
      sortIcon = 'fa-sort';
      break;
  }
  return (
    <>
      <Row>
        <Col>
          {column.render('Header')}
          <i className={`ml-2 fas ${sortIcon}`} />
        </Col>
      </Row>
    </>
  );
};

function DefaultColumnFilter() {
  return ('');
}

export const DefaultCellRenderer = instance => (
  <td
    {...instance.cell.getCellProps()}
  >
    {instance.cell.value}
  </td>
);

export const LevelCellRenderer = (instance) => {
  const colors = {
    BEGINNER: 'aqua',
    BASIC: 'orange',
    DIFFICULT: 'darkred',
    EXPERT: 'lawngreen',
    CHALLENGE: 'purple',
  };
  return (
    <td
      {...instance.cell.getCellProps()}
      style={
        { color: colors[instance.cell.row.values.difficulty] }
      }
    >
      {instance.cell.value}
    </td>
  );
};

export const DdrStatsTable = ({ columnSettings, rowData }) => {
  const c = React.useMemo(() => columnSettings, []);
  const r = React.useMemo(() => rowData, [rowData]);
  const defaultColumn = React.useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const {
    columns,
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    prepareRow,
    // pagination
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
      {
        columns.map(column => (column.canFilter && column.Filter !== DefaultColumnFilter
          ? <div key={column.id}>{column.render('Filter', { title: column.filterTitle })}</div>
          : ''))
      }
      <Table {...getTableProps()} hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {SortedColumnTitle(column)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <StyledDdrTableRow {...row.getRowProps()} className={row.values.difficulty}>
                {row.cells.map(cell => cell.render('Cell'))}
              </StyledDdrTableRow>
            );
          })}
        </tbody>
      </Table>

      <div className="pagination">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        {' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        {' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
        {' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
        {' '}
        <span>
          Page
          {' '}
          <strong>
            {pageIndex + 1}
            {' '}
            of
            {pageOptions.length}
          </strong>
          {' '}
        </span>
        <span>
          | Go to page:
          {' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
        {' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100, 500].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show
              {' '}
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

DdrStatsTable.propTypes = {
  columnSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DdrStatsTable;
