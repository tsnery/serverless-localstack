const AWS = require("aws-sdk");

const s3Config = {
  s3ForcePathStyle: true,
};

const isLocal = process.env.IS_OFFLINE;

if (isLocal) {
  // Não precisamos fazer isso quando
  // AWS.config.update({
  //   credentials: {
  //     accessKeyId: "test",
  //     secretAccessKey: "test",
  //   },
  // });

  const host = process.env.LOCALSTACK_HOST || "localhost";

  Object.assign(s3Config, {
    s3BucketEndpoint: false,
    endpoint: `http://${host}:4566`,
    sslEnabled: false,
  });
}

const s3 = new AWS.S3(s3Config);

module.exports = { s3 };
