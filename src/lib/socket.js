import { io } from 'socket.io-client';

import { API_URL } from '../constants/url';

const socket = io(API_URL, {
  autoConnect: false,
  extraHeaders: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export default socket;
