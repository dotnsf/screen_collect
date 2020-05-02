//. app.js

var express = require( 'express' ),
    basicAuth = require( 'basic-auth-connect' ),
    multer = require( 'multer' ),
    bodyParser = require( 'body-parser' ),
    fs = require( 'fs' ),
    ejs = require( 'ejs' ),
    app = express();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' ).listen( http );

var settings = require( './settings' );


app.all( '/view', basicAuth( function( user, pass ){
  if( settings.admin_username && settings.admin_password ){
    return ( settings.admin_username === user && settings.admin_password === pass );
  }else{
    return false;
  }
}));

app.use( multer( { dest: './tmp/' } ).single( 'image' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

app.get( '/screen', function( req, res ){
  var name = req.query.name;
  if( !name ){ name = '' + ( new Date() ).getTime(); }
  var room = req.query.room;
  if( !room ){ room = settings.defaultroom; }
  var intervalms = settings.intervalms;
  var _intervalms = req.query.intervalms;
  if( _intervalms ){
    try{
      _intervalms = parseInt( _intervalms );
    }catch( e ){
    }
  }
  if( _intervalms ){
    intervalms = _intervalms;
  }
  res.render( 'screen', { name: name, room: room, intervalms: intervalms } );
});

app.get( '/view', function( req, res ){
  var room = req.query.room;
  if( !room ){ room = settings.defaultroom; }
  var columns = req.query.columns;
  if( columns ){
    columns = parseInt( columns );
  }else{
    columns = settings.defaultcolumns;
  }
  res.render( 'view', { room: room, columns: columns } );
});


//. socket.io
var view_sockets = {};
io.sockets.on( 'connection', function( socket ){
  //console.log( 'connected.' );

  //. 一覧画面の初期化時
  socket.on( 'init_view', function( msg ){
    //console.log( 'init_view' );
    var room = msg.room ? msg.room : settings.defaultroom;

    var ts = ( new Date() ).getTime();
    if( !view_sockets[room] ){
      view_sockets[room] = { socket: socket, timestamp: ts };
    }else{
      //. expired の判断はしないことにする
      //if( view_sockets[room].timestamp + ( 10 * 60 * 60 * 1000 ) < ts ){ //. 10 hours
        view_sockets[room] = { socket: socket, timestamp: ts };
      //}else{
      //  console.log( 'Room: "' + room + '" is not expired yet.' );
      //}
    }
    //console.log( view_socket );
  });

  //. 初期化時（ロード後の最初の resized 時）
  socket.on( 'init_client', function( msg ){
    //. msg 内の情報を使って初期化
    //console.log( 'init_client' );
    msg.socket_id = socket.id;
    //console.log( msg );

    var room = msg.room ? msg.room : settings.defaultroom;

    if( view_sockets[room] ){
      view_sockets[room].socket.json.emit( 'init_client_view', msg );
    }
  });

  //. 描画イベント時（ウェイトをかけるべき？）
  socket.on( 'image_client', function( msg ){
    //. evt 内の情報を使って描画
    //console.log( 'image_client' );
    msg.socket_id = socket.id;
    //console.log( msg );

    var room = msg.room ? msg.room : settings.defaultroom;

    if( view_sockets[room] ){
      view_sockets[room].socket.json.emit( 'image_client_view', msg );
    }
  });
});


function timestamp2datetime( ts ){
  if( ts ){
    var dt = new Date( ts );
    var yyyy = dt.getFullYear();
    var mm = dt.getMonth() + 1;
    var dd = dt.getDate();
    var hh = dt.getHours();
    var nn = dt.getMinutes();
    var ss = dt.getSeconds();
    var datetime = yyyy + '-' + ( mm < 10 ? '0' : '' ) + mm + '-' + ( dd < 10 ? '0' : '' ) + dd
      + ' ' + ( hh < 10 ? '0' : '' ) + hh + ':' + ( nn < 10 ? '0' : '' ) + nn + ':' + ( ss < 10 ? '0' : '' ) + ss;
    return datetime;
  }else{
    return "";
  }
}


//app.listen( appEnv.port );
var port = process.env.PORT || 8080;
http.listen( port );
console.log( "server starting on " + port + " ..." );
