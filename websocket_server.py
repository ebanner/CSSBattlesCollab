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


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    socketio.run(
        app,
        host='0.0.0.0',
        port=443,
        ssl_context=(
            '/etc/letsencrypt/live/<MY_URL>/fullchain.pem',
            '/etc/letsencrypt/live/<MY_URL>/privkey.pem',
        )
    )
    #socketio.run(app, host='0.0.0.0', port=80)
