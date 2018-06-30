import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import SimpleTable from './VerifiedTable';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


export class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    data: [],
    changedData: [],
    batch_no: "",
    item_name: "",
    company: "",
    pack:"",
    expiry: "",
    qty: 0,
    mrp: 0,
  };
  
  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  
  handleClickOpen = (n) => {
    console.log(n);
    this.setState({ open: true });  
    this.setState({
      data: n,
      changedData: n,
      batch_no: n.BATCH,
      item_name: n['ITEM NAME'],
      company: n.COMPANY,
      pack: n.PACK,
      expiry: n.EXPIRY,
      qty: n.QTY,
      mrp: n.MRP,
    });
    console.log(this.state.company); 
  };
  handleClose = (name) => {
    this.setState({ open: false });
    console.log(this.state.data); 
    console.log(this.state.data.status);
    if(name==="confirm" && this.state.data.status===true){
      console.log("confirmed");
      console.log(this.state.data);
      this.state.data.status = false;
      this.state.changedData.BATCH = this.state.batch_no;
      this.state.changedData['ITEM NAME'] = this.state.item_name;
      this.state.changedData.COMPANY = this.state.company;
      this.state.changedData.PACK = this.state.pack;
      this.state.changedData.EXPIRY = this.state.expiry;
      this.state.changedData.QTY = this.state.qty;
      this.state.changedData.MRP = this.state.mrp;
      this.state.changedData.status = false;
      if(this.props.update) this.props.update(this.state.changedData) 
      else { 
        console.log("heya");
        this.props.editing(this.state.changedData);
        
      }  
      // {this.props.add};   
      // this.refs.child.AddRow(this.state.data);
      // this.props.update(this.state.data)
    }


    // if(name=="cancel"){
    //   this.setState((prevState) => 
    //   ({[prevState.id] : null}))
    //   console.log(this.state.id);
    // }
     
  };
  
  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    const {changedData} = this.state;
    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}>Open responsive dialog</Button> */}
        {/* <SimpleTable ref="child" /> */}
        <Dialog 
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Please check the details:"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {/* <form className={classes.container} noValidate autoComplete="off"> */}
        ITEM_NAME:      
        <TextField
          id="name"
          // label={this.state.item_name}
          // className={classes.textField}
          value={this.state.item_name}
          onChange={e=>
            this.setState({ item_name: e.target.value})                
        } 
          margin="normal"
          width = 'auto'
        />
        {/* </form> */}
        <br/>
        COMPANY:
        <TextField
          id="company"
        value={this.state.company}
        onChange={e=>this.setState({ company: e.target.value})}
        margin="normal"
        />
        {/* <br/> */}
        PACK:
        <TextField
          id="pack"
        value={this.state.pack}
        onChange={e=>this.setState({ pack: e.target.value})}
        margin="normal"
        />
        <br/>
        Batch No.:
        <TextField
          id="batch"
        value={this.state.batch_no}
        onChange={e=>this.setState({ batch_no: e.target.value})}
        margin="normal"
        />
        {/* <br/> */}
        Expiry:
        <TextField
          id="expiry"
        value={this.state.expiry}
        onChange={e=>this.setState({ expiry: e.target.value})}
        margin="normal"
        />
        <br/>
        QTY:
        <TextField
          id="qty"
        value={this.state.qty}
        onChange={e=>this.setState({ qty: e.target.value})}
        margin="normal"
        />
        {/* <br/> */}
        MRP:
        <TextField
          id="mrp"
        value={this.state.mrp}
        onChange={e=>this.setState({ mrp: e.target.value})}
        margin="normal"
        />
              {/* Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running. */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          
            <Button name="cancel" onClick={this.handleClose.bind(this, 'cancel')} color="primary">
              Cancel
            </Button>
            <Button name="confirm" onClick={this.handleClose.bind(this, 'confirm')} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  // add: PropTypes.func
};

//export default withMobileDialog()(ResponsiveDialog);
