var PLSR = require("pid-system-utils").PLSR;

var plsr = {
  promote: {
    modules:[{
      function:require("./procs/start"), register:"start"
    }, {
      function:require("./procs/refine"), register:"refine"
    }, {
      function:require("./procs/vectorize"), register:"vectorize"
    },{
      function:require("./procs/gravity"), register:"gravity"
    },{
      function:require("./procs/orientation"), register:"orientation"
    }, {
      function: require("./procs/log"), register:"log"
    }, {
      function: require("./procs/store-readings"), register:"store-readings"
    }]
  },
  router:{
    routes:{
      gy80UpdateRefine:[
        {name:"start", eventName:"data"},
        {name:"store-readings", preapply:function(data){return data[0]}},
        {name:"refine"}
      ],
      gy80UpdateVectorize: [
        {name:"refine", eventName:"data"},
        {name:"vectorize", preapply:function(data){return data[0]}}
      ],
      gy80UpdateGravity: [
        {name:"vectorize", eventName:"data"},
        {name:"gravity", preapply:function(data){return data[0]}},
      ],
      gy80UpdateOrientation: [
        {name:"gravity", eventName:"data"},
        {name:"orientation", preapply:function(data){return data[0]}},
        {name:"log"}
      ]
    }
  }
}

module.exports = plsr;
