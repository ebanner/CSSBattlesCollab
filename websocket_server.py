from flask import Flask, render_template
from flask_socketio import SocketIO, emit


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('message')
def handle_message(data):
    print('Received message: ' + data)

    # Send a message back
    emit('server_response', 'Message received!')


if __name__ == '__main__':
    socketio.run(app)
