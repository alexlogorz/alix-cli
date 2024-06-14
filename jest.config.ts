import type { Config } from '@jest/types';

const jestConfiguration: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  bail: true,
  
};

export default jestConfiguration;