const DynamoDB = require("aws-sdk/clients/dynamodb")
const dynamoDb = new DynamoDB.DocumentClient()

const getTodo = async userId => {
  const result = await dynamoDb
    .get({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { userId },
    })
    .promise()

  return result.Item
}

const createTodo = async (userId, data) => {
  await dynamoDb
    .put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        userId,
        data,
      },
    })
    .promise()
}

const deleteTodo = async userId => {
  await dynamoDb
    .delete({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { userId },
    })
    .promise()
}

module.exports.fetch = async event => {
  console.log(JSON.stringify(event, null, 2))
  const { id } = event.pathParameters
  const data = await getTodo(id)
  console.log(JSON.stringify(data, null, 2))
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

module.exports.create = async event => {
  console.log(JSON.stringify(event, null, 2))
  const { body } = event
  const { id } = event.pathParameters
  const data = JSON.parse(body)
  await createTodo(id, data)
  return {
    statusCode: 201,
  }
}

module.exports.delete = async event => {
  console.log(JSON.stringify(event, null, 2))
  const { id } = event.pathParameters
  await deleteTodo(id)
  return {
    statusCode: 200,
  }
}
