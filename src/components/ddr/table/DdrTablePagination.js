import Button from '@material-ui/core/Button';
import React from 'react';

export const DdrTablePagination = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}) => {
  return (
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
        {[10, 25, 50, 100, 500].map(pgSize => (
          <option key={pgSize} value={pgSize}>
            Show
            {' '}
            {pgSize}
          </option>
        ))}
      </select>
    </div>
  );
};
