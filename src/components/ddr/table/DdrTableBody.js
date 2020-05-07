import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { DdrTableRow } from './DdrTableRow';

export const DdrTableBody = ({
  getTableBodyProps,
  page,
  prepareRow,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return (<DdrTableRow key={row.getRowProps().key} prepareRow={prepareRow} row={row} />);
      })}
    </tbody>
  );
};

DdrTableBody.propTypes = {
  getTableBodyProps: PropTypes.func.isRequired,
  page: PropTypes.arrayOf(PropTypes.object).isRequired,
  prepareRow: PropTypes.func.isRequired,
};
