const {
  test,
  describe,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");

const { s3 } = require("../../src/factory");
const { handler } = require("../../src");

describe("Testing AWS services offline with localstack", () => {
  const bucketConfig = {
    Bucket: "test01",
  };

  beforeAll(async () => {
    await s3
      .createBucket({
        Bucket: "test01",
        CreateBucketConfiguration: {
          LocationConstraint: "us-east-2",
        },
      })
      .promise();
  });
  afterAll(async () => {
    await s3.deleteBucket(bucketConfig).promise();
  });

  test("it should return an array with a S3 bucket:", async () => {
    const expected = bucketConfig.Bucket;
    const result = await handler();
    const {
      allBuckets: { Buckets },
    } = JSON.parse(result.body);
    const { Name } = Buckets.find(({ Name }) => Name === expected);
    expect(Name).toStrictEqual(expected);
    expect(result.statusCode).toStrictEqual(200);
  });
});
