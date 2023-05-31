/* Amplify Params - DO NOT EDIT
	AUTH_TODOILYASE1510957_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  let statusCode = 0;
  let responseBody = "";
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const input = {
      TableName: "Todo-dev",
    };
    const command = new ScanCommand(input);
    const response = await client.send(command);
    const items = response.Items.map((item) => {
      const d = unmarshall(item);
      console.log(d);

      return d;
    });

    statusCode = 200;
    responseBody = JSON.stringify(items);
  } catch (err) {
    responseBody = `Unable to get Products: ${err}`;
    statusCode = 403;
  }
  console.log(responseBody);
  return {
    statusCode: statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: responseBody,
  };
};
