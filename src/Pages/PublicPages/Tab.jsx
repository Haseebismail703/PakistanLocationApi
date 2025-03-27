import React from 'react';
import { Tabs, Table, Typography, Divider, Button ,Tag} from 'antd';
import {
  ApiOutlined,
  CodeOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  ControlOutlined,
  GlobalOutlined,
  SwitcherOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const API_DOCS = {
  baseUrl: "https://api.example.com/v1/pakistan-locations",
  endpoints: [
    {
      name: "Get Countries",
      path: "/country",
      method: "GET",
      description: "Fetch all countries (primarily Pakistan)",
      params: [],
      response: {
        example: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pakistan",
      "code": "PK",
      "phoneCode": "+92"
    }
  ]
}`
      }
    },
    {
      name: "Get Provinces by Country",
      path: "/province/:countryId",
      method: "GET",
      description: "Fetch provinces by country ID",
      params: [
        { name: "countryId", type: "number", required: true, description: "ID of the country" }
      ],
      response: {
        example: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Punjab",
      "countryId": 1,
      "capital": "Lahore"
    },
    {
      "id": 2,
      "name": "Sindh",
      "countryId": 1,
      "capital": "Karachi"
    }
  ]
}`
      }
    },
    {
      name: "Get Divisions by Province",
      path: "/division/:provinceId",
      method: "GET",
      description: "Fetch divisions by province ID",
      params: [
        { name: "provinceId", type: "number", required: true, description: "ID of the province" }
      ],
      response: {
        example: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Lahore Division",
      "provinceId": 1
    },
    {
      "id": 2,
      "name": "Rawalpindi Division",
      "provinceId": 1
    }
  ]
}`
      }
    },
    {
      name: "Get Districts by Division",
      path: "/district/:divisionId",
      method: "GET",
      description: "Fetch districts by division ID",
      params: [
        { name: "divisionId", type: "number", required: true, description: "ID of the division" }
      ],
      response: {
        example: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Lahore",
      "divisionId": 1,
      "population": "11,126,285"
    },
    {
      "id": 2,
      "name": "Kasur",
      "divisionId": 1,
      "population": "3,454,000"
    }
  ]
}`
      }
    },
    {
      name: "Get Cities by District",
      path: "/city/:districtId",
      method: "GET",
      description: "Fetch cities by district ID",
      params: [
        { name: "districtId", type: "number", required: true, description: "ID of the district" }
      ],
      response: {
        example: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Lahore City",
      "districtId": 1,
      "isCapital": true
    },
    {
      "id": 2,
      "name": "Model Town",
      "districtId": 1,
      "isCapital": false
    }
  ]
}`
      }
    },
    {
      name: "Get Areas by City",
      path: "/area/:cityId",
      method: "GET",
      description: "Fetch areas by city ID",
      params: [
        { name: "cityId", type: "number", required: true, description: "ID of the city" }
      ],
      response: {
        example: `{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Gulberg",
      "cityId": 1,
      "postalCode": "54660"
    },
    {
      "id": 2,
      "name": "DHA",
      "cityId": 1,
      "postalCode": "54792"
    }
  ]
}`
      }
    }
  ]
};

const PakistanLocationAPI = () => {
  return (
    <div className="min-h-screen" data-theme="light">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
            <GlobalOutlined className="mr-2" />
            Pakistan Locations API
          </a>
        </div>
        <div className="flex-none">
          <Button 
            type="primary" 
            icon={<SwitcherOutlined />}
            onClick={() => window.open('/swagger', '_blank')}
          >
            Swagger Documentation
          </Button>
          <label className="swap swap-rotate ml-4">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          </label>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="prose max-w-none">
          <Title level={2} className="text-primary">
            <GlobalOutlined className="mr-2" />
            Pakistan Locations API Documentation
          </Title>
          <Paragraph>
            A comprehensive REST API for accessing geographical data of Pakistan including provinces, divisions, districts, cities, and areas.
          </Paragraph>

          <Divider orientation="left">API Base URL</Divider>
          <div className="card bg-base-200 p-4 mb-6">
            <Text code copyable className="text-lg">
              {API_DOCS.baseUrl}
            </Text>
          </div>

          <Divider orientation="left">API Endpoints</Divider>
          <Tabs defaultActiveKey="0">
            {API_DOCS.endpoints.map((endpoint, index) => (
              <TabPane
                key={index.toString()}
                tab={
                  <span>
                    {endpoint.method === 'GET' ? <DatabaseOutlined /> : <ControlOutlined />}
                    {endpoint.name}
                  </span>
                }
              >
                <div className="card bg-base-100 shadow-md mb-4">
                  <div className="card-body">
                    <div className="flex items-center mb-4">
                      <Tag color={endpoint.method === 'GET' ? 'green' : 'orange'} className="mr-2">
                        {endpoint.method}
                      </Tag>
                      <Text code copyable>
                        {API_DOCS.baseUrl}{endpoint.path}
                      </Text>
                    </div>
                    
                    <Paragraph>{endpoint.description}</Paragraph>
                    
                    {endpoint.params.length > 0 && (
                      <>
                        <Title level={5}>Parameters</Title>
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Required</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.params.map((param, i) => (
                                <tr key={i}>
                                  <td><Tag color="blue">{param.name}</Tag></td>
                                  <td>{param.type}</td>
                                  <td>{param.required ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>}</td>
                                  <td>{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                    
                    <Title level={5}>Response Example</Title>
                    <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto">
                      {endpoint.response.example}
                    </pre>
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>

          <Divider orientation="left">Authentication</Divider>
          <div className="card bg-base-100 shadow-md mb-6">
            <div className="card-body">
              <Title level={4}><SafetyOutlined className="mr-2" />API Keys</Title>
              <Paragraph>
                This API uses JWT for authentication. Include your token in the Authorization header.
              </Paragraph>
              <Text code copyable className="block mb-2">
                Authorization: Bearer YOUR_API_KEY
              </Text>
              <Paragraph>
                You can obtain an API key by registering at our developer portal.
              </Paragraph>
            </div>
          </div>

          <Divider orientation="left">Rate Limits</Divider>
          <div className="card bg-base-100 shadow-md mb-6">
            <div className="card-body">
              <Title level={4}>Request Limits</Title>
              <ul className="list-disc pl-5">
                <li>Free tier: 100 requests per hour</li>
                <li>Basic tier: 1,000 requests per hour</li>
                <li>Pro tier: 10,000 requests per hour</li>
              </ul>
              <Paragraph className="mt-2">
                Exceeding these limits will result in a 429 Too Many Requests response.
              </Paragraph>
            </div>
          </div>

          <Divider orientation="left">Swagger Documentation</Divider>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <Title level={4}>Interactive API Explorer</Title>
              <Paragraph>
                For an interactive experience with our API, check out our Swagger documentation:
              </Paragraph>
              <Button 
                type="primary" 
                icon={<SwitcherOutlined />}
                size="large"
                onClick={() => window.open('/swagger', '_blank')}
              >
                Open Swagger UI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PakistanLocationAPI;