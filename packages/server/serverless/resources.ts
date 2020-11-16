import * as Aws from 'serverless/aws'

const resources: Aws.Resources = {
	Resources: {
		Products: {
			Type: 'AWS::DynamoDB::Table',
			DeletionPolicy: 'Retain',
			Properties: {
				KeySchema: [
					{
						AttributeName: 'id',
						KeyType: 'HASH'
					}
				],
				AttributeDefinitions: [
					{
						AttributeName: 'id',
						AttributeType: 'S'
					}
				],
				ProvisionedThroughput: {
					ReadCapacityUnits: 1,
					WriteCapacityUnits: 1
				},
				StreamSpecification: {
					StreamViewType: 'NEW_AND_OLD_IMAGES'
				},
				TableName: 'Products'
			}
		},
		Users: {
			Type: 'AWS::DynamoDB::Table',
			DeletionPolicy: 'Retain',
			Properties: {
				KeySchema: [
					{
						AttributeName: 'username',
						KeyType: 'HASH'
					}
				],
				AttributeDefinitions: [
					{
						AttributeName: 'username',
						AttributeType: 'S'
					}
				],
				ProvisionedThroughput: {
					ReadCapacityUnits: 1,
					WriteCapacityUnits: 1
				},
				StreamSpecification: {
					StreamViewType: 'NEW_AND_OLD_IMAGES'
				},
				TableName: 'Users'
			}
		},
		Tokens: {
			Type: 'AWS::DynamoDB::Table',
			DeletionPolicy: 'Retain',
			Properties: {
				KeySchema: [
					{
						AttributeName: 'user_id',
						KeyType: 'HASH'
					}
				],
				AttributeDefinitions: [
					{
						AttributeName: 'user_id',
						AttributeType: 'S'
					}
				],
				ProvisionedThroughput: {
					ReadCapacityUnits: 1,
					WriteCapacityUnits: 1
				},
				StreamSpecification: {
					StreamViewType: 'NEW_AND_OLD_IMAGES'
				},
				TableName: 'Tokens'
			}
		}
	}
}

export default resources
