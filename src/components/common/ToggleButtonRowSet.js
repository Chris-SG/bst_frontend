import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  filterButton: {
    '&.focus &.hover': {
      boxShadow: 'transparent',
      transition: 'background-color 0.3s ease',
      backgroundColor: 'rgba(159, 74, 205, 0.66)',
      borderColor: 'rgba(159, 74, 205, 0.88)',
    },
    '&.active': {
      backgroundColor: 'rgb(140, 5, 213)',
      borderColor: 'rgb(82, 1, 126)',
    },
  },
}));

export const ToggleButtonRowSet = ({ title, options, setFilter }) => {
  const [selectedOptions, setSelectedOptions] = useState(options);
  const [popupOpen, setPopupOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setFilter(selectedOptions);
  }, [selectedOptions]);

  const containsValue = (v) => {
    return selectedOptions.indexOf(v) === -1;
  };

  const toggleValue = (v) => {
    if (!containsValue(v)) {
      setSelectedOptions([...selectedOptions, v]);
      return;
    }
    setSelectedOptions(selectedOptions.splice(selectedOptions.indexOf(v), 1));
  };

  const enableAll = (() => {
    setSelectedOptions(options);
  });

  const disableAll = (() => {
    setSelectedOptions([]);
  });

  return (
    <>
      <Button onClick={() => setPopupOpen(!popupOpen)}>
        {title}
      </Button>
      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      >
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
              options.map((opt) => (
                <ToggleButton
                  className={classes.toggleButton}
                  key={opt}
                  value={containsValue(opt)}
                  onChange={() => toggleValue(opt)}
                >
                  {opt}
                </ToggleButton>
              ))
            }
          </ToggleButtonGroup>
          <br />
          <ButtonGroup>
            <Button onClick={() => enableAll()} className={classes.filterButton} color="secondary">All</Button>
            <Button onClick={() => disableAll()} className={classes.filterButton} color="secondary">Clear</Button>
          </ButtonGroup>
        </div>
      </Popover>
    </>
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
