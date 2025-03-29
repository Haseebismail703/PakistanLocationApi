import React from 'react';
import {  Typography, Divider, Button } from 'antd';
import {
  GlobalOutlined,
  FilterOutlined
} from '@ant-design/icons';
import ApiEndPoint from '../../Component/ApiDoc/ApiEndPoint';
import HomeNavbar from '../../Component/PublicCom/HomeNavbar';
import Footer from '../../Component/PublicCom/Footer'
const { Title, Text, Paragraph } = Typography;

const PakistanLocationAPI = () => {
return (
    <>
    
    <HomeNavbar />
    <div className="bg-base-100 text-base-content mt-20">
        
        <div className="container mx-auto px-4 py-8">
            <div className="prose max-w-none">
                <Title level={2} className="text-primary text-base-content">
                    <GlobalOutlined className="mr-2 text-base-content" />
                    <span className="text-base-content">Pakistan Locations API Documentation</span>
                </Title>
                <Paragraph className="text-base-content">
                    A comprehensive REST API for accessing geographical data of Pakistan including provinces, divisions, districts, cities, and areas.
                </Paragraph>

                <Divider orientation="left" className="text-base-content">
                    <span className="text-base-content">API Base URL</span>
                </Divider>
                <div className="card bg-base-200 p-4 mb-6">
                    <Text code copyable className="text-lg text-base-content">
                        {"https://pola-api.vercel.app/api/v1/public"}
                    </Text>
                </div>

                {/* Api end point */}
                <ApiEndPoint />

                <Divider orientation="left" className="text-base-content">
                    <span className="text-base-content">Pagination & Limits</span>
                </Divider>
                <div className="card bg-base-100 shadow-md mb-6">
                    <div className="card-body">
                        <Title level={4} className="text-base-content">
                            <FilterOutlined className="mr-2 text-base-content" />
                            <span className="text-base-content">Result Limiting</span>
                        </Title>
                        <Paragraph className="text-base-content">
                            You can limit the number of results returned using the <code>limit</code> parameter:
                        </Paragraph>
                        <div className="card bg-base-200 p-4 mb-4">
                            <Text code copyable className="text-lg text-base-content">
                                {"https://pola-api.vercel.app/api/v1/public/areas?limit=10&apiKey=YOUR_API_KEY"}
                            </Text>
                        </div>
                        <Paragraph className="text-base-content">
                            This will return only 10 area records. You can also use the <code>limit</code> parameter for other endpoints like <code>provinces</code>, <code>divisions</code>, <code>districts</code>, and <code>cities</code> if you can use <code>limit=0</code> you can get all the data.
                        </Paragraph>

                        <Title level={4} className="text-base-content mt-6">
                            <FilterOutlined className="mr-2 text-base-content" />
                            <span className="text-base-content">Pagination</span>
                        </Title>
                        <Paragraph className="text-base-content">
                            For paginated results, use the <code>page</code> parameter:
                        </Paragraph>
                        <div className="card bg-base-200 p-4 mb-4">
                            <Text code copyable className="text-lg text-base-content">
                                {"https://pola-api.vercel.app/api/v1/public/areas?limit=10&page=2&apiKey=YOUR_API_KEY"}
                            </Text>
                        </div>
                        <Paragraph className="text-base-content">
                            This will return the second page of results with 10 items per page.
                        </Paragraph>
                    </div>
                </div>
                
                <Divider orientation="left" className="text-base-content">
                    <span className="text-base-content">Rate Limits</span>
                </Divider>
                <div className="card bg-base-100 shadow-md mb-6">
                    <div className="card-body">
                        <Title level={4} className="text-base-content">
                            <span className="text-base-content">Request Limits</span>
                        </Title>
                        <ul className="list-disc pl-5 text-base-content">
                            <li className="text-base-content">Free tier: 1000 requests per Day</li>
                            <li className="text-base-content">Pro tier: Unlimited requests</li>
                        </ul>
                        <Paragraph className="mt-2 text-base-content">
                            Exceeding these limits will result Rate limit exceeded. Free users can make up to 1000 requests per day.
                        </Paragraph>
                    </div>
                </div>

                <Divider orientation="left" className="text-base-content">
                    <span className="text-base-content">Swagger Documentation</span>
                </Divider>
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <Title level={4} className="text-base-content">
                            <span className="text-base-content">Interactive API Explorer</span>
                        </Title>
                        <Paragraph className="text-base-content">
                            For an interactive experience with our API, check out our Swagger documentation:
                        </Paragraph>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
);
};

export default PakistanLocationAPI;