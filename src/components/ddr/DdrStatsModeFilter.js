import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function DdrStatsModeFilter({
  column: {
    filterValue,
    setFilter,
    preFilteredRows,
    id,
  },
}) {
  const options = React.useMemo(() => {
    const localOptions = new Set();
    preFilteredRows.forEach((row) => {
      localOptions.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Form.Control
      as="select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      custom="true"
    >
      <option value="">All</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
  );
}

DdrStatsModeFilter.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
};
