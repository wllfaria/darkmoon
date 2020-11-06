import * as Aws from "serverless/aws";

const resources: Aws.Resources = {
    Resources: {
        'Products': {
            Type: 'AWS::DynamoDB::Table',
            DeletionPolicy: 'Retain',
            Properties: {
                'KeySchema': [
                    {
                        AttributeName: 'id',
                        KeyType: 'HASH'
                    }
                ],
                'AttributeDefinitions': [
                    {
                        AttributeName: 'id',
                        AttributeType: 'S'
                    }
                ],
                'ProvisionedThroughput': {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                },
                'StreamSpecification': {
                    StreamViewType: "NEW_AND_OLD_IMAGES"
                },
                'TableName': 'Products'
            }
        }
    }
}

export default resources