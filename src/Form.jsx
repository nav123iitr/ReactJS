import React from 'react';





export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
             ITEM_NAME: "",
             COMPANY: "",
             PACK: "",
             BATCH: "",
             EXPIRY: "",
             QTY: "",
             MRP: "",
}
    }

    onSubmit(){
        console.log(this.state);
    }
render(){
return(
    <form>
        <input 
        placeholder={this.state.ITEM_NAME}
        value={this.state.ITEM_NAME}
        onChange={e=>this.setState({ ITEM_NAME: e.target.value})}
        />
        <br/>
        <input 
        placeholder={this.state.COMPANY}
        value={this.state.COMPANY}
        onChange={e=>this.setState({ COMPANY: e.target.value})}
        />
        <br/>
        <input 
        placeholder={this.state.PACK}
        value={this.state.PACK}
        onChange={e=>this.setState({ PACK: e.target.value})}
        />
        <br/>
        <input 
        placeholder={this.state.BATCH}
        value={this.state.BATCH}
        onChange={e=>this.setState({ BATCH: e.target.value})}
        />
        <br/>
        <input 
        placeholder={this.state.EXPIRY}
        value={this.state.EXPIRY}
        onChange={e=>this.setState({ EXPIRY: e.target.value})}
        />
        <br/>
        <input 
        placeholder={this.state.QTY}
        value={this.state.QTY}
        onChange={e=>this.setState({ QTY: e.target.value})}
        />
        <br/>
        <input 
        placeholder={this.state.MRP}
        value={this.state.MRP}
        onChange={e=>this.setState({ MRP: e.target.value})}
        />
        <br/>
        <button onClick={this.onSubmit}>Confirm</button>
        </form>
)


}
}