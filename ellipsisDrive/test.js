const ellipsis = require('./ellipsisCluster');
const loadConfig = require('./loadConfig');

test();

async function test() {
  let config = loadConfig();
  
  await ellipsis.createCluster(config);
}