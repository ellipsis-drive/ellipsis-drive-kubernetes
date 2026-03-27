const cmd = require('./cmd');

module.exports = {
  createPolicy: async (name, documentPath) => {
    let policyInfo = await cmd.executeCommandSimple(`aws iam create-policy --policy-name ${name} --policy-document file://${documentPath}`);
    
    policyInfo = JSON.parse(policyInfo);

    return policyInfo
  },

  createCertificate: async (name, documentPath) => {
    let certificate = await cmd.executeCommandSimple(`aws acm request-certificate --domain-name ${name}`);

    certificate = JSON.parse(certificate);

    return certificate.CertificateArn;
  },

  createBucket: async (name) => {
    await cmd.executeCommandSimple(`aws s3api create-bucket --bucket ${name} --region ${region}`);
  },

  createVpc: async () => {
    await cmd.executeCommandSimple(`aws ec2 create-vpc --cidr-block 10.0.0.0/16`);
  },

  createSubnet: async (vpcId, availabilityZone, CIDR) => {
    await cmd.executeCommandSimple(`aws ec2 create-subnet --vpc-id ${vpcId} --cidr-block ${CIDR} --availability-zone ${availabilityZone}`);
  },

  createInternetGateway: async () => {
    await cmd.executeCommandSimple(`aws ec2 create-internet-gateway`);
  },

  attachInternetGateway: async (vpcId, internetGatewayId) => {
    await cmd.executeCommandSimple(`aws ec2 attach-internet-gateway --vpc-id ${vpcId} --internet-gateway-id ${internetGatewayId}`);
  },

  createRouteTable: async (vpcId) => {
    await cmd.executeCommandSimple(`aws ec2 create-route-table --vpc-id ${vpcId}`);
  },

  createRoute: async (routeTableId, destination) => {
    await cmd.executeCommandSimple(`aws ec2 create-route --route-table-id ${routeTableId} --destination-cidr-block 0.0.0.0/0 --${destination.type} ${destination.id}`);
  },

  associateRouteTable: async (routeTableId, subnetId) => {
    await cmd.executeCommandSimple(`aws ec2 associate-route-table --route-table-id ${routeTableId} --subnet-id ${subnetId}`);
  },

  allocateAddress: async () => {
    await cmd.executeCommandSimple(`aws ec2 allocate-address --domain vpc`);
  },

  createNATGateway: async (subnetId, allocationId) => {
    await cmd.executeCommandSimple(`aws ec2 create-nat-gateway --subnet-id ${subnetId} --allocation-id ${allocationId}`);
  },

  waitForNAT: async (NATId) => {
    await cmd.executeCommandSimple(`aws ec2 wait nat-gateway-available --nat-gateway-ids ${NATId}`);
  }
}