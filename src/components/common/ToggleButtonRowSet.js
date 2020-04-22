import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Dropdown, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledToggleButton = styled(ToggleButton)`
  transition: background-color 0.3s ease;
  background-color: ${props => (props.active ? 'purple' : 'blue')};
`;

export const ToggleButtonRowSet = ({ title, options, setFilter }) => {
  const [selectedOptions, setSelectedOptions] = useState(options);

  useEffect(() => {
    setFilter(selectedOptions);
  }, [selectedOptions]);

  const enableAll = (() => {
    setSelectedOptions(options);
  });

  const disableAll = (() => {
    setSelectedOptions([]);
  });

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="ml-2 mr-2">
          <ToggleButtonGroup
            type="checkbox"
            defaultValue={options}
            value={selectedOptions}
            className="mb-2"
            onChange={(e) => {
              setSelectedOptions(e);
            }}
            custom="true"
          >
            {
              options.map((opt, i) => (
                <StyledToggleButton
                  key={i + 1}
                  value={opt}
                >
                  {opt}
                </StyledToggleButton>
              ))
            }
          </ToggleButtonGroup>
          <br />
          <ButtonGroup>
            <Button onClick={() => enableAll()}>All</Button>
            <Button onClick={() => disableAll()}>Clear</Button>
          </ButtonGroup>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ToggleButtonRowSet.defaultProps = {
  buttonsPerRow: 5,
};

ToggleButtonRowSet.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  setFilter: PropTypes.func.isRequired,
  buttonsPerRow: PropTypes.number,
  title: PropTypes.string.isRequired,
};
