const { exec } = require('child_process');

const runTests = () => {
  return new Promise((resolve, reject) => {
    exec('npm test', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(new Error(stderr));
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

const runLint = () => {
  return new Promise((resolve, reject) => {
    exec('npm run lint', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(new Error(stderr));
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

const runBuild = () => {
  return new Promise((resolve, reject) => {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(new Error(stderr));
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

const runPipeline = async () => {
  try {
    console.log('Running tests...');
    await runTests();
    console.log('Running lint...');
    await runLint();
    console.log('Running build...');
    await runBuild();
    console.log('Pipeline completed successfully.');
  } catch (error) {
    console.error('Pipeline failed:', error);
    process.exit(1);
  }
};

runPipeline();
