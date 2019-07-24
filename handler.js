'use strict';
var Push = require( 'pushover-notifications' )
var p = new Push( {
  user: process.env['PUSHOVER_USER'],
  token: process.env['PUSHOVER_TOKEN'],
  // httpOptions: {
  //   proxy: process.env['http_proxy'],
  //},
  // onerror: function(error) {},
  // update_sounds: true // update the list of sounds every day - will
  // prevent app from exiting.
})

function record(event){
  if (event.hasOwnProperty('Records')){
    return event['Records'][0]
  }else{
    undefined
  }
}

function isSNS(event) {
  return  event.hasOwnProperty('Records') && event['Records'][0]['EventSource'] == 'aws:sns'
}

module.exports.pushover_send = async (event) => {
  
  console.log(event)
  var msg = null
  if (isSNS(event)){
    var sns = event.Records[0].Sns
    var msg = {
      title: sns.Subject,
      message: sns.message + '\n' + sns.Timestamp
    }
  }else{
    var msg = {
      title: 'Event Notificaiton',
      message: event
    }
  }
  
  return p.send(msg, function(err, result){
    if (err) {
      throw e
    }

    if (res) {
      return result
    }
  });

};
