// jest.config.js

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Procesar archivos .js y .jsx con babel-jest
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)', // No ignorar axios al transformarlo
  ],
};
