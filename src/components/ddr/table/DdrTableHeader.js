import React from 'react';
import Grid from '@material-ui/core/Grid';

const SortableColumn = (column) => {
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
      <Grid item xs>
        {column.render('Header')}
        <i className={`ml-2 fas ${sortIcon}`} />
      </Grid>
    </>
  );
};

export const DdrTableHeader = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {SortableColumn(column)}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
