import { getSession } from "./authApi";

let listeners = [];

export const subscribeSession = (callback) => {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
};

export const notifySessionChange = () => {
  const session = getSession();
  listeners.forEach((cb) => cb(session));
};
