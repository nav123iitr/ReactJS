import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from './MainTable';
import SimpleTable from './VerifiedTable';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class GuttersGrid extends React.Component {
  state = {
    spacing: '16',
    addrows: [],
  };
 
  addition(n){
    this.setState({
    //   addrows:[...prevState.addrows, n],
    addrows:n,
    })
    
    console.log(n);
  }
  // randonFunc(values) {
  //   ewp
  // }



  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    
    return (
     <div>
        <Grid container spacing={24}>


       <Grid item xs={8}>
         <Paper> <EnhancedTable modify={this.addition.bind(this)}/> </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper> <SimpleTable rows={this.state.addrows}/> </Paper>
        </Grid>


        </Grid>
       </div>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);