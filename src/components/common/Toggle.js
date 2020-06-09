import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({}));

export const Toggle = ({label, initialToggleState, toggleCallback}) => {
    const classes = useStyles();
    const [toggleState, setToggleState] = useState(initialToggleState);
    useEffect(() => {

    }, [toggleState]);

    const toggleWrapper = () => {
        toggleCallback();
        setToggleState(!toggleState);
    };

    return (
        <FormControlLabel
            control={<Switch checked={toggleState} onChange={toggleWrapper}/>}
            label={label}
        />
    );
}

Toggle.propTypes = {
    label: PropTypes.string.isRequired,
    initialToggleState: PropTypes.bool.isRequired,
    toggleCallback: PropTypes.func.isRequired,
};