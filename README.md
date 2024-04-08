# CSSBattlesCollab

Collaborative CSSBattles ⚔️

## How to run

### Server

Start ngrok

```
$ ngrok tcp 127.0.0.1:5000
ngrok                                                                                                          (Ctrl+C to quit)
                                                                                                                               
Take our ngrok in production survey! https://forms.gle/aXiBFWzEA36DudFn6                                                       
                                                                                                                               
Session Status                online                                                                                           
Account                       Edward Banner (Plan: Free)                                                                       
Update                        update available (version 3.8.0, Ctrl-U to update)                                               
Version                       3.4.0                                                                                            
Region                        United States (us)                                                                               
Latency                       47ms                                                                                             
Web Interface                 http://127.0.0.1:4040                                                                            
Forwarding                    tcp://2.tcp.ngrok.io:16103 -> 127.0.0.1:5000                                                     
                                                                                                                               
Connections                   ttl     opn     rt1     rt5     p50     p90                                                      
                              0       0       0.00    0.00    0.00    0.00   
```

Grab the ngrok URL (e.g. `2.tcp.ngrok.io`) and create a cert for it with `mkcert`

```
% mkcert 2.tcp.ngrok.io

Created a new certificate valid for the following names 📜
 - "2.tcp.ngrok.io"

The certificate is at "./2.tcp.ngrok.io.pem" and the key at "./2.tcp.ngrok.io-key.pem" ✅

It will expire on 8 July 2026 🗓
```

Tell flask to use that cert in `websocket_server.py`

```
if __name__ == '__main__':
    socketio.run(app, ssl_context=('2.tcp.ngrok.io.pem', '2.tcp.ngrok.io-key.pem'))
```

Start websockets server

```
$ python3 websockets_server
 * Serving Flask app 'websocket_server'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on https://127.0.0.1:5000
Press CTRL+C to quit
```

### Clients

1. Go to a CSSBattle 

2. Open up chrome dev console

3. Define websockets URL (ngrok URL from above)
```
SERVER_URL = '0.tcp.ngrok.io:10217'
```
4. Paste `code.js`

5. Paste `main.js`
