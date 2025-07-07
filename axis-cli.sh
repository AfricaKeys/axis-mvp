#!/bin/bash

# Load system config
source ~/.axisenv 2>/dev/null || {
  echo "❌ Missing .axisenv - cannot run Axis CLI"
  exit 1
}

COMMAND=$1

function kill_port() {
  fuser -k $1/tcp 2>/dev/null && echo "⚠️ Killed process on port $1"
}

function check_port() {
  lsof -i :$1 | grep LISTEN && echo "✅ Port $1 is running" || echo "❌ Port $1 not active"
}

case $COMMAND in
  serve)
    echo "🚀 Starting full Axis system..."
    kill_port $AXIS_BACKEND_PORT
    kill_port $AXIS_FRONTEND_PORT
    cd ~/axis-system/backend && source ~/axis-system/venv/bin/activate && nohup flask run --host=0.0.0.0 --port=$AXIS_BACKEND_PORT > ../logs/backend.log 2>&1 &
    cd ~/axis-system/frontend && nohup npm run dev -- --port $AXIS_FRONTEND_PORT > ../logs/frontend.log 2>&1 &
    ngrok http $AXIS_BACKEND_PORT > ~/axis-system/ngrok.log &
    echo "✅ Backend: http://localhost:$AXIS_BACKEND_PORT"
    echo "✅ Frontend: http://localhost:$AXIS_FRONTEND_PORT"
    ;;

  doctor)
    echo "🧠 Axis System Status:"
    check_port $AXIS_BACKEND_PORT
    check_port $AXIS_FRONTEND_PORT
    check_port $AXIS_STRIPE_PORT
    check_port $AXIS_PDF_PORT
    check_port $AXIS_SOCKET_PORT
    ;;

  restart)
    echo "🔁 Restarting backend and frontend..."
    kill_port $AXIS_BACKEND_PORT
    kill_port $AXIS_FRONTEND_PORT
    $0 serve
    ;;

  pulse)
    cat ~/axis-system/ubuntu-pulse.log || echo "❌ Pulse log missing"
    ;;

  *)
    echo "Axis CLI v1.3 - Commands:"
    echo "  serve     → Start backend, frontend, ngrok"
    echo "  restart   → Kill and relaunch backend+frontend"
    echo "  doctor    → Check health of all ports"
    echo "  pulse     → View system pulse log"
    ;;
esac
