import React from 'react';
import SearchBar from 'material-ui-search-bar';
export default class SearchBox extends React.Component {
      constructor(props) {
        super(props);
        this.state={
              ans: [],
            //   data: [],
        }
      }
getRow(name) {
      console.log(name);
      var size = name.length;
      var searchedRow = this.props.data.filter((row) => row['ITEM NAME'].substring(0,size) === name.toUpperCase() || row.BATCH.substring(0,size) === name.toUpperCase());
      console.log(searchedRow.length);
      if (name === '')  {
          this.setState({
              ans: this.props.data,
          })
      
      console.log(this.props.data);
      }
      else {
          this.setState({
              ans: searchedRow,
          })
      }
    } 
    
render(){

return(

<SearchBar
    onChange={this.getRow.bind(this)}
    onRequestSearch={() => console.log('onRequestSearch')}
    style={{
      margin: '0 auto',
      maxWidth: 800
    }}
  /> 
)
}
}