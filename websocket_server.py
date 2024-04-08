from flask import Flask
from flask_socketio import SocketIO, emit


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('message')
def handle_message(data):
    print('Received message: ' + data)

    if 'cm-line' in data:
        # Text field update
        emit('text_changed', data, broadcast=True, include_self=False)
    else:
        # Slider update
        emit('slider_changed', data, broadcast=True, include_self=False)


if __name__ == '__main__':
    socketio.run(app, ssl_context=('0.tcp.ngrok.io.pem', '0.tcp.ngrok.io-key.pem'))
