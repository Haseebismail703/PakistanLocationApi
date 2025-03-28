import React, { useState } from 'react';
import { Tabs, Card, Collapse, Button, message, Tag } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const ApiDocumentation = () => {
  const [activeTab, setActiveTab] = useState('country');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard!');
  };

  const formatResponse = (data) => {
    return {
      message: `${data.title}(s) fetched successfully`,
      data: Array.isArray(data.example) ? data.example : [data.example],
      statusCode: 200,
      success: true
    };
  };

  const endpoints = [
    {
      key: 'country',
      title: 'Country',
      methods: [
        {
          method: 'GET',
          path: '/country',
          description: 'Get all countries',
          response: formatResponse({
            title: 'Country',
            example: {
              _id: "--",
              name: "Pakistan",
              pictures: ["https://example.com/pakistan.jpg"],
              details: "Islamic Republic of Pakistan",
            }
          })
        }
      ]
    },
    {
      key: 'province',
      title: 'Province',
      methods: [
        {
          method: 'GET',
          path: '/provinces',
          description: 'Get all provinces',
          response: formatResponse({
            title: 'Province',
            example: {
              _id: "---",
              name: "Sindh",
              countryId: "---",
              pictures: ["https://example.com/sindh.jpg"],
              details: "Sindh province of Pakistan",
            }
          })
        }
      ]
    },
    {
      key: 'division',
      title: 'Division',
      methods: [
        {
          method: 'GET',
          path: '/divisions',
          description: 'Get all divisions',
          response: formatResponse({
            title: 'Division',
            example: {
              _id: "---",
              name: "Karachi",
              provinceId: "---",
              pictures: ["https://example.com/karachi.jpg"],
              details: "Karachi Division",
            }
          })
        },
        {
          method: 'GET',
          path: '/divisions/:provinceId',
          description: 'Get divisions by province ID',
          response: formatResponse({
            title: 'Division',
            example: {
              _id: "---",
              name: "Karachi",
              provinceId: "---",
              pictures: ["https://example.com/karachi.jpg"],
              details: "Karachi Division",
            }
          })
        }
      ]
    },
    {
      key: 'district',
      title: 'District',
      methods: [
        {
          method: 'GET',
          path: '/districts',
          description: 'Get all districts',
          response: formatResponse({
            title: 'District',
            example: {
              _id: "---",
              name: "Karachi South",
              divisionId: "---",
              pictures: ["https://example.com/karachi_south.jpg"],
              details: "Karachi South District",
            }
          })
        },
        {
          method: 'GET',
          path: '/districts/:divisionId',
          description: 'Get districts by division ID',
          response: formatResponse({
            title: 'District',
            example: {
              _id: "---",
              name: "Karachi South",
              divisionId: "---",
              pictures: ["https://example.com/karachi_south.jpg"],
              details: "Karachi South District",

            }
          })
        }
      ]
    },
    {
      key: 'city',
      title: 'City',
      methods: [
        {
          method: 'GET',
          path: '/cities',
          description: 'Get all cities',
          response: formatResponse({
            title: 'City',
            example: {
              _id: "---",
              name: "Karachi",
              districtId: "---",
              pictures: ["https://example.com/karachi_city.jpg"],
              details: "Karachi City",
            }
          })
        },
        {
          method: 'GET',
          path: '/cities/:districtId',
          description: 'Get cities by district ID',
          response: formatResponse({
            title: 'City',
            example: {
              _id: "---",
              name: "Karachi",
              districtId: "---",
              pictures: ["https://example.com/karachi_city.jpg"],
              details: "Karachi City",
            }
          })
        }
      ]
    },
    {
      key: 'area',
      title: 'Area',
      methods: [
        {
          method: 'GET',
          path: '/areas',
          description: 'Get all areas',
          response: formatResponse({
            title: 'Area',
            example: {
              _id: "---",
              name: "Clifton",
              cityId: "---",
              pictures: ["https://example.com/clifton.jpg"],
              details: "Clifton is a major area in South Karachi",
            }
          })
        },
        {
          method: 'GET',
          path: '/areas/:cityId',
          description: 'Get areas by city ID',
          response: formatResponse({
            title: 'Area',
            example: {
              _id: "---",
              name: "Clifton",
              pictures: ["https://example.com/clifton.jpg"],
              details: "Clifton is a major area in South Karachi",
              cityId: "---"
            }
          })
        }
      ]
    }
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'blue';
      case 'POST': return 'green';
      case 'PUT': return 'orange';
      case 'DELETE': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-base-100 text-base-content">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-base-content font-bold">Location API Documentation</h1>
        </div>

        <Card className="bg-base-100 border-gray-200 text-base-content">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabPosition="top"
            type="line"
            style={{ overflowX: 'auto' }}
            className="text-base-content bg-base-100"
          >
            {endpoints.map(endpoint => (
              <TabPane className='bg-base-100' tab={<span className="text-base-content">{endpoint.title}</span>} key={endpoint.key}>
                <div className="mb-4">
                  <h3 className="text-lg font-medium">{endpoint.title} Endpoints</h3>
                </div>

                <Collapse accordion>
                  {endpoint.methods.map((method, index) => (
                    <Panel
                      header={
                        <div className="flex items-center flex-wrap gap-2 text-base-content">
                          <Tag color={getMethodColor(method.method)} className="text-base-content">
                            {method.method}
                          </Tag>
                          <span className="text-base-content">{method.path}</span>
                          {method.path.includes(':') && (
                            <Tag color="purple" className="text-base-content">Dynamic</Tag>
                          )}
                        </div>
                      }
                      key={`${endpoint.key}-${index}`}
                    >
                      <div className="space-y-4 text-base-content bg-base-100" >
                        <div>
                          <h4 className="font-medium">Description</h4>
                          <p>{method.description}</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Endpoint</h4>
                            <Button
                              icon={<CopyOutlined />}
                              onClick={() => copyToClipboard(method.path)}
                              size="small"
                              className="text-base-content hover:text-base-content"
                            />
                          </div>
                          <div className="p-2 rounded bg-base-200">
                            <code className="text-base-content">{method.path}</code>
                          </div>
                        </div>

                        {method.path.includes(':') && (
                          <div>
                            <h4 className="font-medium">Path Parameters</h4>
                            <div className="p-2 rounded bg-base-200 text-base-content">
                              <div className="grid grid-cols-3 gap-2">
                                <div className="font-semibold">Parameter</div>
                                <div className="font-semibold">Type</div>
                                <div className="font-semibold">Description</div>
                                {method.path.match(/:\w+/g)?.map(param => (
                                  <React.Fragment key={param}>
                                    <div>{param.replace(':', '')}</div>
                                    <div>string</div>
                                    <div>ID of the {param.replace(':', '').replace('Id', '')}</div>
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium">Response Example</h4>
                          <pre className="p-2 rounded overflow-auto bg-base-200 text-base-content">
                            {JSON.stringify(method.response, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ApiDocumentation;