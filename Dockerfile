# Use the official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy your files into the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port used by your WebSocket server
EXPOSE 5001

# Run the server
CMD ["python", "websocket_server.py"]
