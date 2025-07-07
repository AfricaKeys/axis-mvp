
#!/bin/bash

echo "🚀 Starting full NVIDIA-grade backend init..."

cd ~/axis-system

echo "📦 Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "📦 Installing packages from cleaned requirements.txt..."
# Cleaned manually to remove duplicates and invalid entries
pip install --upgrade pip
pip install -r requirements.txt

echo "🧹 Killing anything using port 5001..."
fuser -k 5001/tcp || true

echo "🔁 Running Flask backend on port 5001..."
cd backend
FLASK_APP=app.py FLASK_RUN_PORT=5001 flask run &

sleep 3

echo "🌍 Starting Ngrok on port 5001..."
pgrep ngrok && killall ngrok
nohup ngrok http 5001 > ../ngrok.log 2>&1 &

echo "📖 Logs available in ubuntu-pulse.log"
date > ~/axis-system/ubuntu-pulse.log
echo "Backend running on port 5001" >> ~/axis-system/ubuntu-pulse.log
