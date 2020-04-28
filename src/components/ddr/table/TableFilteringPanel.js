import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';

function DefaultColumnFilter() {
  return ('');
}

export const TableFilteringPanel = ({ columns }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Table Filters</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={3}>
          {
            columns.map(column => (column.canFilter && column.Filter !== DefaultColumnFilter
              ? <Grid item xs><div key={column.id}>{column.render('Filter', { title: column.filterTitle })}</div></Grid>
              : ''))
          }
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

TableFilteringPanel.propTypes = {
  columns: PropTypes.objectOf(PropTypes.object).isRequired,
};
