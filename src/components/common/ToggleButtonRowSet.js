import React from 'react';
import {
  Button, ButtonGroup, Dropdown, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from '../ddr/DdrStatsDropdownFilter.css';

class ToggleButtonRowSet extends React.Component {
  constructor(props) {
    super(props);
    const { options } = this.props;
    this.state = {
      selectedOptions: options,
    };
  }

  onSelectionChanged() {
    const { setFilter } = this.props;
    const { selectedOptions } = this.state;
    setFilter(selectedOptions);
  }

  enableAll() {
    const { options } = this.props;
    this.setState({
      selectedOptions: options,
    }, this.onSelectionChanged);
  }

  disableAll() {
    this.setState({
      selectedOptions: [null],
    }, this.onSelectionChanged);
  }

  buttonStyle(opt) {
    const { selectedOptions } = this.state;
    return (
      {
        background: selectedOptions.includes(opt) ? '#7700cc' : 'blue',
        border: selectedOptions.includes(opt) ? '#9900aa' : 'blue',
      }
    );
  }

  render() {
    const { selectedOptions } = this.state;
    const {
      options, title,
    } = this.props;

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
              className={[style.ButtonGroup, 'mb-2'].join(' ')}
              onChange={(e) => {
                this.setState({
                  selectedOptions: e,
                }, this.onSelectionChanged);
              }}
              custom="true"
            >
              {
                options.map((opt, i) => (
                  <ToggleButton
                    key={i + 1}
                    value={opt}
                    style={this.buttonStyle(opt)}
                  >
                    {opt}
                  </ToggleButton>
                ))
              }
            </ToggleButtonGroup>
            <br />
            <ButtonGroup className={style.ButtonGroup}>
              <Button onClick={() => this.enableAll()}>All</Button>
              <Button onClick={() => this.disableAll()}>Clear</Button>
            </ButtonGroup>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

ToggleButtonRowSet.defaultProps = {
  buttonsPerRow: 5,
};

ToggleButtonRowSet.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  setFilter: PropTypes.func.isRequired,
  buttonsPerRow: PropTypes.number,
  title: PropTypes.string.isRequired,
};

export default ToggleButtonRowSet;
