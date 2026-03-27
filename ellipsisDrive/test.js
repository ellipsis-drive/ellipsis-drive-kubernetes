const ellipsis = require('./ellipsisCluster');
const loadConfig = require('./loadConfig');

test();

async function test() {
  let config = loadConfig();
  
  let vpcId = await ellipsis.createVpc(config);
  console.log(vpcId);
}