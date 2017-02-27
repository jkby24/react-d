'use strict';


import React from 'react';
import ReactDom from 'react-dom';
import FileReader from './FileReader.js';
import ErrorGroupList from './ErrorGroupList.js';
import GroupSelect from './GroupSelect.js';


// import { Router, Route, hashHistory } from 'react-router';
// import {Navbar} from "react-bootstrap";
export default class App extends React.Component{
    constructor(props) {
      super(props);
      this._datasChange = (datas)=>this.datasChange(datas);
      this._afterGroup = (items)=>this.afterGroup(items);
      this.state = {
        datas:[],//excel读取出来的原始数据
        items: []//分组后的数据
      };
    }
    datasChange(datas) {
        this.setState({datas: datas});
    }
    afterGroup(items) {
        this.setState({items: items});
    }
    render() {
        //todo 再优化
        if(this.state.datas.length>0){
            return (
                <div className="panel-body">
                    <FileReader datasChange={this._datasChange}></FileReader>
                    <GroupSelect datas={this.state.datas} afterGroup={this._afterGroup}></GroupSelect>
                    <ErrorGroupList items={this.state.items}></ErrorGroupList>
                </div>
            );
        }else{
            return (
                <div className="panel-body">
                    <FileReader datasChange={this._datasChange}></FileReader>
                </div>
            );
        }

    }
};

//最终渲染
ReactDom.render((
    <App></App>
), document.getElementById('app'));

// ReactDom.render((
//     <Router history={hashHistory}>
//         <Route path='/' component={App}></Route>
//         <Route path='/list' component={List} />
//         <Route path='/detail' component={Detail} />
//     </Router>
// ), document.getElementById('app'));
