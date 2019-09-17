import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    position: 'absolute',
    marginTop: 64,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    backgroundColor: '#bdbdbd',
  },
  panel: {
    width: '100%'
  },
  summary: {
    paddingLeft: theme.spacing(1),
  },
  summaryContent: {
    display: 'block'
  },
  label: {
    marginTop: theme.spacing(1),
    maxHeight: 32,
    overflow: 'auto'
  },
  content: {
    paddingTop: 0,
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
    overflow: 'auto',
  }
});

const InfoHeader = props => {

  const handleExpandButtonOnClick = () => {
    props.updateExpanded({
      resultClass: props.resultClass,
      pageType: props.pageType
    });
  };

  const generateLabel = () => {
    let label = '';
    const data = props.instanceData;
    const hasData = data !== null && Object.values(data).length >= 1;
    if (hasData) { label = data.prefLabel.prefLabel; }
    return label;
  };

  return(
    <Grid container spacing={1} className={props.classes.root}>
      <ExpansionPanel
        className={props.classes.panel}
        expanded={props.expanded}>
        <ExpansionPanelSummary
          className={props.classes.summary}
          classes={{
            content: props.classes.summaryContent
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          IconButtonProps={{ onClick: handleExpandButtonOnClick }}
        >
          <Typography component="h1" variant="h3">{props.title}</Typography>
          {props.pageType === 'instancePage' &&
            <React.Fragment>
              <Typography className={props.classes.label} component="h1" variant="h6">{generateLabel()}</Typography>
            </React.Fragment>
          }
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className={props.classes.content}
          style={{ height: props.descriptionHeight }}
        >
          <Typography>{props.description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
};

InfoHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  resultClass: PropTypes.string.isRequired,
  instanceData: PropTypes.object,
  pageType: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  updateExpanded: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionHeight: PropTypes.number.isRequired,
};

export default withStyles(styles)(InfoHeader);