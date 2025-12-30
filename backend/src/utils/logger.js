const isProduction = process.env.NODE_ENV === 'production';

const log = (...args) => {
  console.log('[LOG]', ...args);
};

const warn = (...args) => {
  console.warn('[WARN]', ...args);
};

const error = (...args) => {
  console.error('[ERROR]', ...args);
};

const debug = (...args) => {
  if (!isProduction) {
    console.debug('[DEBUG]', ...args);
  }
};

module.exports = {
  log,
  warn,
  error,
  debug,
};
