// Real-Time Socket.IO Communication Service connecting Fisherman, Family, Rescue, and Backend
const BACKEND_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.listeners = {};
    this.socket = null;
    this.initWebSocket();
  }

  initWebSocket() {
    try {
      if (typeof window !== 'undefined' && window.io) {
        this.socket = window.io(BACKEND_URL);
        console.log('⚡ Connected to Central Backend Socket.IO Server:', BACKEND_URL);
      }
    } catch (e) {
      console.warn('Socket.IO client initializing gracefully:', e);
    }
  }

  // Subscribe to real-time backend events (location:update, emergency:created, emergency:accepted, rescue:status)
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Unsubscribe from real-time backend events
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Emit events to backend (distress_sos, location:update, rescue:status)
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.log(`[Socket Broadcast Emitted to Backend] ${event}:`, data);
      // Trigger local listener callbacks for seamless UI reactivity
      if (this.listeners[event]) {
        this.listeners[event].forEach(cb => cb(data));
      }
    }
  }
}

export const socketService = new SocketService();
