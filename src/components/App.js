'use strict';


import React from 'react';
import ReactDom from 'react-dom';
import FileReader from './FileReader.js';
import ErrorGroupList from './ErrorGroupList.js';
import GroupSelect from './GroupSelect.js';


// import { Router, Route, hashHistory } from 'react-router';
// import {Navbar} from "react-bootstrap";
var App = React.createClass({
    getInitialState: function(){
        return {
                datas:[],//excel读取出来的原始数据
                items: []//分组后的数据
        }
    },
    datasChange: function(datas) {
        this.setState({datas: datas});
    },
    afterGroup: function(items) {
        this.setState({items: items});
    },
    render: function() {
        //todo 再优化
        if(this.state.datas.length>0){
            return (
                <div className="panel-body">
                    <FileReader datasChange={this.datasChange.bind(this)}></FileReader>
                    <GroupSelect datas={this.state.datas} afterGroup={this.afterGroup.bind(this)}></GroupSelect>
                    <ErrorGroupList items={this.state.items}></ErrorGroupList>
                </div>
            );
        }else{
            return (
                <div className="panel-body">
                    <FileReader datasChange={this.datasChange.bind(this)}></FileReader>
                </div>
            );
        }

    }
});

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
