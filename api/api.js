var soap = require('soap');
var parseString = require('xml2js').parseString;

var url = 'http://116.52.154.7:8115/MobileData/DataService.asmx?wsdl';
var args = {
    userName: '',
    funcid: '',
    code: '',
    pageIndex: 1,
    pageSize: 1000
};

var api = {
  getToDo: (req, res) => {
    soap.createClient(url, function(err, client) {
      let argsToDo = args;
      argsToDo.userName = req.params.id;
      argsToDo.funcid = 'B001';
      argsToDo.code = '1';

      client.GetOaList(argsToDo, function(err, result) {
        parseString(result.GetOaListResult,{ explicitArray : false, ignoreAttrs : true }, function (err, result1) {
            console.log(req.params.id + '，您有'+result1.mobile.total+'份公文未办理。\n');
            //res.contentType('application/json; charset=utf-8');
            res.json(result1);
        });
      });
    });
  },
  getToRead: (req, res) => {
    soap.createClient(url, function(err, client) {
      let argsToRead = args;
      argsToRead.userName = req.params.id;
      argsToRead.funcid = 'B002';
      argsToRead.code = '1';

      client.GetOaList(argsToRead, function(err, result) {
        parseString(result.GetOaListResult,{ explicitArray : false, ignoreAttrs : true }, function (err, result1) {
            console.log(req.params.id + '，您有'+result1.mobile.total+'份待阅公文未阅读。\n');
            //res.contentType('application/json; charset=utf-8');
            res.json(result1);
        });
      });
    });
  },
  commitToRead: (req, res) => {
    soap.createClient(url, function(err, client) {
      var readArgs = 
      {
        "node": 
        {
          ParamNode:
          [
            { "Key": 'universalid', "Value": req.params.uid, "Encode": 'true' },
            { "Key": 'userid', "Value": req.params.id, "Encode": 'true' },
            { "Key": 'funcid', "Value": 'B002', "Encode": 'true' },
            { "Key": 'code', "Value": '3', "Encode": 'true' },
            { "Key": 'randomid', "Value": '8889', "Encode": 'true' } // 8889 代表待阅提交，该字段目前在 OA 未启用
          ]
        }
      };
      //res.json(client.describe());
      client.InteractionOA(readArgs, function(err, result) {
        parseString(result.InteractionOAResult,{ explicitArray : false, ignoreAttrs : true }, function (err, result1) {
            res.json(result1);
        });
      });
    });
  },
  saveToDo: (req, res) => {
    soap.createClient(url, function(err, client) {
      var todoSaveArgs = 
      {
        "node": 
        {
          ParamNode:
          [
            { "Key": 'universalid', "Value": req.params.uid, "Encode": 'true' },
            { "Key": 'userid', "Value": req.params.id, "Encode": 'true' },
            { "Key": 'comment', "Value": '已阅。', "Encode": 'true' },
            { "Key": 'funcid', "Value": 'B001', "Encode": 'true' },
            { "Key": 'code', "Value": '4', "Encode": 'true' },
            { "Key": 'randomid', "Value": '8887', "Encode": 'true' } // 8887 代表待办保存，该字段目前在 OA 未启用
          ]
        }
      };
      //res.json(client.describe());
      client.InteractionOA(todoSaveArgs, function(err, result) {
        parseString(result.InteractionOAResult,{ explicitArray : false, ignoreAttrs : true }, function (err, result1) {
            res.json(result1);
        });
      });
    });
  },
  commitToDo: (req, res) => {
    soap.createClient(url, function(err, client) {
      var todoCommitArgs = 
      {
        "node": 
        {
          ParamNode:
          [
            { "Key": 'universalid', "Value": req.params.uid, "Encode": 'true' },
            { "Key": 'activetype', "Value": req.params.activetype, "Encode": 'true' },
            { "Key": 'userid', "Value": req.params.id, "Encode": 'true' },
            { "Key": 'funcid', "Value": 'B001', "Encode": 'true' },
            { "Key": 'code', "Value": '3', "Encode": 'true' },
            { "Key": 'randomid', "Value": '8888', "Encode": 'true' } // 8888 代表待办提交，该字段目前在 OA 未启用
          ]
        }
      };
      //res.json(client.describe());
      client.InteractionOA(todoCommitArgs, function(err, result) {
        parseString(result.InteractionOAResult,{ explicitArray : false, ignoreAttrs : true }, function (err, result1) {
            res.json(result1);
        });
      });
    });
  },
}

module.exports = api;

