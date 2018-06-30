import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {CSVFileUploader} from './FileReader';
import {ResponsiveDialog} from './Dialog';
import SearchBox from './SearchBox';
import SearchBar from 'material-ui-search-bar';
let counter = 0;


function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'item_name', numeric: false, disablePadding: true, label: 'Item Name' },
  { id: 'company_name', numeric: false, disablePadding: false, label: 'Company' },
  { id: 'pack', numeric: false, disablePadding: false, label: 'Pack' },
  { id: 'batch', numeric: false, disablePadding: false, label: 'Batch' },
  { id: 'expiry', numeric: false, disablePadding: false, label: 'Expiry' },
  { id: 'qty', numeric: true, disablePadding: false, label: 'QTY' },
  { id: 'mrp', numeric: true, disablePadding: false, label: 'MRP' },
];

class EnhancedTableHead extends React.Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  
  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              > 
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Invoice
          </Typography>
        )} 
      </div>
      <div className={classes.spacer} />
      {/* <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div> */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'ITEM NAME',
      selected: [],
      obj: {},
      data: [],
      page: 0,               
      rowsPerPage: 5, 
      selectrows: [],       
      ans: [],
      modifyData: [],
    };                       
  
    
  }
  getRow(name) {
    console.log(name);
    var size = name.length;
    
    var searchedRow = this.state.data.filter((row) => row['ITEM NAME'].substring(0,size) === name.toUpperCase() || row.BATCH.substring(0,size) === name.toUpperCase());
    console.log(searchedRow.length);
    if (name === '')  {
        this.setState({
            ans: this.state.data,
        })
    
    console.log(this.state.data);
    }
    else {
        this.setState({
            ans: searchedRow,
        })
    }
  } 
  selection(n){
    this.setState({
      selectrows:n,
    })
    console.log(n);
    this.props.modify(n);
    console.log(this.state.data);
    console.log(this.state.ans);
  }                   
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id, n) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    newSelected.push(id);
    this.setState({ selected: newSelected });
    console.log(this.state.modifyData);
    for(let i=0; i<this.state.modifyData.length; i++){
      if(n.BATCH===this.state.modifyData[i].BATCH)
      this.refs.child.handleClickOpen(this.state.modifyData[i]);
    }
    // this.refs.child.handleClickOpen(n);
    
  
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, ans } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, ans.length - page * rowsPerPage);
    
    return (
      <div>
     
      <Paper className={classes.root}>
      < ResponsiveDialog ref="child" update={this.selection.bind(this)} />
       
        <EnhancedTableToolbar numSelected = {selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order} 
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {ans.filter(row => row.status === true)
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.BATCH);
                  return (
                    
                   
                    <TableRow 
                      hover
                      onClick={event => this.handleClick(event, n.BATCH,n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                   
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n['ITEM NAME']}
                      </TableCell>
                     
                      <TableCell>{n.COMPANY}</TableCell>
                      <TableCell>{n.PACK}</TableCell>
                      <TableCell>{n.BATCH}</TableCell>
                      <TableCell>{n.EXPIRY}</TableCell>
                      <TableCell numeric>{n.QTY}</TableCell>
                      <TableCell numeric>{n.MRP}</TableCell>
                      
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
        </div>
        <TablePagination
          component="div"
          // count={data.length}
          count={ans.filter(row=>row.status===true).length}
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
      </Paper>
     
    <SearchBar
    onChange={this.getRow.bind(this)}
    onRequestSearch={() => console.log('onRequestSearch')}
    style={{
      margin: '0 auto',
      // maxWidth: 800,
      width: '100%',
    }}
  /> 
   <CSVFileUploader 
        onDataLoaded={(obj)=>{
           this.setState({
             obj: obj,
             data: obj,
             ans: obj,
             modifyData: obj,
          });
        }
      }
        />   
      </div> 
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
