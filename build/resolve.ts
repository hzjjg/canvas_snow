import * as path from 'path';

const resolve = (...args: string[]) => {
    return path.join(__dirname, '..', ...args);
};

export default resolve;