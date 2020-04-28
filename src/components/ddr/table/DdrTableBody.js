import { StyledDdrTableRow } from '../../../componentstylers/table-styles';
import React from 'react';

export const DdrTableBody = ({
  getTableBodyProps,
  page,
  prepareRow
}) => {
  return (
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
  );
};
