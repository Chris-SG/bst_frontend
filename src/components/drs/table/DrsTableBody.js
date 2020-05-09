import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { DrsTableRow } from './DrsTableRow';

export const DrsTableBody = ({
  getTableBodyProps,
  page,
  prepareRow,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return (<DrsTableRow key={row.getRowProps().key} prepareRow={prepareRow} row={row} />);
      })}
    </tbody>
  );
};

DrsTableBody.propTypes = {
  getTableBodyProps: PropTypes.func.isRequired,
  page: PropTypes.arrayOf(PropTypes.object).isRequired,
  prepareRow: PropTypes.func.isRequired,
};
