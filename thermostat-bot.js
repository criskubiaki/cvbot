var botui = new BotUI('thermostat-bot'),
    temperature = 30;

function start(){
  botui.message
  .bot({
    delay: 1000,
    loading: true,
    content: "Hello, my name is Cristiano"
  })
  .then(function (){
    init();
  })
}

function yes() {
  botui.message
  .bot({
    delay: 700,
    loading: true,
    content: 'That is great!'
  })
  .then(more);
}

function more() {
  botui.message
    .bot({
      delay: 700,
      loading: true,
      content: 'How much do you know me?'
    })
    .then(function () {
      return botui.action.button({
        delay: 1000,
        action: [{
          text: 'Nothing',
          value: 'nothing'
        }, {
          text: 'A lot',
          value: 'alot'
        }]
      })
  }).then(function (res) {
    if(res.value == 'nothing') {
      nothing();
    } else {
      botui.message.bot({
        delay: 1200,
        content: 'So what are you looking for?'
      }).then(alot);
    }
  });
}

function nothing() {
  botui.message
  .bot({
    delay: 700,
    loading: true,
    content: 'Nice, we have a lot to talk :)'
  })
  .then(more);
}

function alot() {
  botui.message
  .bot({
    delay: 1000,
    loading: true,
    content: 'Does not really matter, I will try to surprise you with something new'
  })
  .then(more);
}


function init() {
  botui.message
    .bot({
      delay: 700,
      loading: true,
      content: 'Would like to know me?'
    })
    .then(function () {
      return botui.action.button({
        delay: 1000,
        action: [{
          text: 'Yes',
          value: 'yes'
        }, {
          text: 'Maybe',
          value: 'maybe'
        }]
      })
  }).then(function (res) {
    if(res.value == 'yes') {
      yes();
    } else {
      botui.message.bot({
        delay: 1200,
        content: 'Current temperature is: ' + temperature + ' degree'
      }).then(init);
    }
  });
}

start();
