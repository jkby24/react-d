
import React from 'react';

export default class FileReader extends React.Component{
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        path:''
    }
  }


   readExcel(filePath) {
      //创建操作EXCEL应用程序的实例
      var oXL = new ActiveXObject("Excel.application");
      //打开指定路径的excel文件
      var oWB = oXL.Workbooks.open(filePath);
      //操作第一个sheet(从一开始，而非零)
      oWB.worksheets(1).select();
      var oSheet = oWB.ActiveSheet;
      //使用的行数
      var rows = oSheet.usedrange.rows.count;
      var data = [];
      try {
          var keys = [];
          for (var j = 1, key = oSheet.Cells(1, 1).value; key; j++) {
              key = oSheet.Cells(1, j).value;
              keys.push(key);
          }
          // 下标从1开始
          for (var i = 2; i <= rows; i++) {
              var json = {};
              var j = 1;
              for (var j = 0, cellCount=keys.length; j < cellCount; j++) {
                  json[keys[j]] = oSheet.Cells(i, j+1).value;
              }
              data.push(json);
          }
      } catch (e) {
          console.error(e);
      }
      //退出操作excel的实例对象
      oXL.Application.Quit();
      //手动调用垃圾收集器
      CollectGarbage();

      return data;
  }

  handleChange(event) {
    this.setState({path: event.target.value});
  }
  handleClick(event) {
    if(this.state.path==''){
      var items = [
            {"identifier":"01c75c8db545472c9b4bd52d94a31205","app_key":"dd6f3cd6e72d4f7eb81d9c7200ac06f3","bussiness_type":"exception_log","ext_properties":"","insert_time":"2017-02-17 00:11:29","ex_type":"0","ex_level":"","ex_msg":"{\"errorTime\":\"Thu Feb 16 2017 23:21:14 GMT+0800 (CST)\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1; HUAWEI TIT-AL00 Build/HUAWEITIT-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.121 Mobile Safari/537.36\",\"page\":\"http://slp.101.com/#!/report/common/index?role=STUDENT&report_type=advance&mode=debug&client=wechat&user_id=2003746655&from_where=android&client_version=1\",\"message\":\"Error2: Java exception was raised during method invocation\",\"url\":\"\",\"line\":\"\",\"column\":-1,\"stack\":\"Error2: Java exception was raised during method invocation\\n    at Error (native)\\n    at request (http://slp.101.com/ajax-error.ng.js?v=201702131211:115:139)\\n    at http://slp.101.com/bower_components/angular/angular.min.js?v=201702131211:120:425\\n    at n.\"}"},
            {"identifier":"01c75c8db545472c9b4bd52d94a31204","app_key":"dd6f3cd6e72d4f7eb81d9c7200ac06f3","bussiness_type":"exception_log","ext_properties":"","insert_time":"2017-02-17 00:11:29","ex_type":"0","ex_level":"","ex_msg":"{\"errorTime\":\"Thu Feb 16 2017 23:21:14 GMT+0800 (CST)\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1; HUAWEI TIT-AL00 Build/HUAWEITIT-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.121 Mobile Safari/537.36\",\"page\":\"http://slp.101.com/#!/report/common/index?role=STUDENT&report_type=advance&mode=debug&client=phone&user_id=2003746655&from_where=android&client_version=1\",\"message\":\"Error: Java exception was raised during method invocation\",\"url\":\"\",\"line\":\"\",\"column\":-1,\"stack\":\"Error: Java exception was raised during method invocation\\n    at Error (native)\\n    at request (http://slp.101.com/ajax-error.ng.js?v=201702131211:115:139)\\n    at http://slp.101.com/bower_components/angular/angular.min.js?v=201702131211:120:425\\n    at n.\"}"},
            {"identifier":"01c75c8db545472c9b4bd52d94a31205","app_key":"dd6f3cd6e72d4f7eb81d9c7200ac06f3","bussiness_type":"exception_log","ext_properties":"","insert_time":"2017-02-17 00:11:29","ex_type":"0","ex_level":"","ex_msg":"{\"errorTime\":\"Thu Feb 16 2017 23:21:14 GMT+0800 (CST)\",\"userAgent\":\"Mozilla/5.0 (Linux; Android 5.1; HUAWEI TIT-AL00 Build/HUAWEITIT-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.121 Mobile Safari/537.36\",\"page\":\"http://slp.101.com/#!/report/common/index?role=STUDENT&report_type=advance&mode=debug&client=phone&user_id=2003746655&from_where=android&client_version=1\",\"message\":\"Error: Java exception was raised during method invocation\",\"url\":\"\",\"line\":\"\",\"column\":-1,\"stack\":\"Error: Java exception was raised during method invocation\\n    at Error (native)\\n    at request (http://slp.101.com/ajax-error.ng.js?v=201702131211:115:139)\\n    at http://slp.101.com/bower_components/angular/angular.min.js?v=201702131211:120:425\\n    at n.\"}"}
      ];
      this.props.datasChange(items);
      return;
    }

    var items = this.readExcel(this.state.path);
    this.props.datasChange(items);
  }

  render() {
    return (
            <div className="panel panel-default panel-info">
                <div className="panel-heading">文件读取</div>
                <div className="panel-body">
                    <form id="formSearch" className="form-horizontal">
                        <div className="form-group" >
                            <label className="control-label col-sm-1">文件路径</label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" value={this.state.path} onChange={this.handleChange}/>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" id="btn_query" className="btn btn-primary" onClick={this.handleClick}>读取</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
  }
};
