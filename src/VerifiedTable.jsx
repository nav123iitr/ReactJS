import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import  Delete  from '@material-ui/icons/Delete';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import TablePagination from '@material-ui/core/TablePagination';
import SearchBar from 'material-ui-search-bar';
import { ResponsiveDialog } from './Dialog';
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  // extendedIcon: {
  //   marginRight: theme.spacing.unit,
  // },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

// const data = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

class SimpleTable extends React.Component {
  constructor(props) {
      super(props);
  this.state={
      data: [],
      rowsPerPage: 5, 
      page: 0, 
      ans: [],
  };
  
}

componentDidMount() {
  console.log('sachin',this.props.rows)
}
getRow(name) {
  console.log(name);
  var size = name.length;
  var searchedRow = this.state.data.filter((row) => row['ITEM NAME'].substring(0,size) === name.toUpperCase() || row.BATCH.substring(0,size) === name.toUpperCase());
  console.log(searchedRow.length);
  if (name === '')  {
      // this.props.onDataLoaded(this.state.output);
      this.setState({
          ans: this.state.data,
      })
  
  console.log(this.state.data);
  }
  // else if(searchedRow.length===0){
  //      this.setState({
  //           ans: this.state.data,
  // })
  // }
  else {
      // var searchedRow = this.state.data;
      // searchedRow = this.state.data.filter((row) => row['ITEM NAME'] === name.target.value || row.BATCH === name.target.value);
      // this.props.onDataLoaded(searchedRow);
      this.setState({
          ans: searchedRow,
      })
  }
} 

componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.rows !== prevProps.rows) {
    var order = this.state.data;
    order.splice(0,0,this.props.rows);
    this.setState({
      data:order,
      ans:order, 
    }) 
  }
  console.log(this.state.data);
}
removeRow=(event, id, n)=>{
  // console.log(id);
  n.status = true; 
  var rows = [...this.state.data];
  console.log(rows);
  for (let i=0; i<rows.length; i++){
    if(rows[i].BATCH===id){
      rows.splice(i,1);
    }
  }       
  // rows.splice(id,1);
  this.setState({
    data: rows,
    ans: rows
  });
}
randomFunction=(rows)=>{
  var order = this.state.data;
  order.splice(0,0,this.props.rows);
  this.setState({
    data:order,
    ans:order,
  })
console.log(rows);
};
popUp=(event, n)=>{
  console.log(n.status);
  this.refs.children.handleClickOpen(n);
  this.removeRow(event, n.BATCH, n);
  
};  
handleChangePage = (event, page) => {
  this.setState({ page });
};
handleChangeRowsPerPage = event => {
  this.setState({ rowsPerPage: event.target.value });
};  

  render(){ 
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, ans } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, ans.length - page * rowsPerPage);
    // const {data} = this.state;
    // console.log(this.state.data);
    // this.setState({
    //   data:this.props.rows,
    // })
    // <ResponsiveDialog add={this.AddRow} />
  return (
   
    <Paper className={classes.root}>
      < ResponsiveDialog ref="children" editing = {this.randomFunction} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell >Batch No.</CustomTableCell>
            <CustomTableCell >Delete</CustomTableCell>
            <CustomTableCell >Edit</CustomTableCell>
            {/* <TableCell numeric>Fat (g)</TableCell>
            <TableCell numeric>Carbs (g)</TableCell>
            <TableCell numeric>Protein (g)</TableCell> */}
          </TableRow>
        </TableHead>
        
        <TableBody>
          { this.state.ans && this.state.ans
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(n => {
            return (
              <TableRow className={classes.row} key={n.BATCH} 
              >
               
               <CustomTableCell component="th" scope="row">
                  {n['ITEM NAME']}
                </CustomTableCell>
                <CustomTableCell >{n.BATCH}</CustomTableCell>
                <CustomTableCell >
                  <IconButton Color='primary' onClick={event => this.removeRow(event, n.BATCH, n)}> <Delete/></IconButton>
                </CustomTableCell> 
                <CustomTableCell >
                <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}
                onClick={event => this.popUp(event, n)}
                >
                <Icon>edit_icon</Icon>
                </Button>
                  </CustomTableCell>
              </TableRow>
            );
          })}
           {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
        </TableBody>
      </Table>
      <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <SearchBar
    // onChange={() => console.log('onChange')}
    onChange={this.getRow.bind(this)}
    onRequestSearch={() => console.log('onRequestSearch')}
    style={{
      margin: '0 auto',
      maxWidth: 800
    }}
  />
    </Paper> 
  );
}
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

