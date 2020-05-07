import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonRowSet } from '../common/ToggleButtonRowSet';

export const DdrStatsDropdownFilter = ({
  column:
    {
      filterTitle,
      filterAlg,
      setFilter,
      preFilteredRows,
      id,
    },
}) => {
  const [maxRowCount, setMaxRowCount] = useState(0);
  const options = React.useMemo(() => {
    setMaxRowCount(preFilteredRows.length);
    const optionsSet = new Set();
    preFilteredRows.forEach((row) => {
      optionsSet.add(row.values[id]);
    });
    return [...Array.from(optionsSet).sort(filterAlg).values()];
  }, [maxRowCount < preFilteredRows.length]);

  if (options.length === 0) {
    return '';
  }

  return (
    <div>
      <ToggleButtonRowSet options={options} setFilter={setFilter} title={filterTitle} />
    </div>
  );
};

export default DdrStatsDropdownFilter;


DdrStatsDropdownFilter.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
};
