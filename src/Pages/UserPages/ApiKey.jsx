import React, { useState,useEffect } from "react";
import { Button, Card, Input, message, Typography, Table, Switch } from "antd";
import { CopyOutlined, KeyOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import api from '../../Api/api.js'
const { Title, Text } = Typography;

const GenerateApiKey = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [isApiKeyVisible, setIsApiKeyVisible] = useState({});

  // Function to generate API Key
  const generateKey = async() => { 
    const user = JSON.parse(localStorage.getItem("user")); 
    try {
      let res = await axios.get(`${api}/users/generate-api-key`,{
        headers: {
          "Authorization": `Bearer ${user.accessToken}`
        }
      })
     if(res){
       message.success(res.data?.message);
     }
    } catch (error) {
      message.success("Somthing went wrong");
    }
    // 
  };
  
//   const fetchApiKeys = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     try {
//       let res = await axios.get(`${api}/users/api-keys`, {
//         headers: {
//           "Authorization": `Bearer ${user.accessToken}`
//         }
//       });
//       if (res) {
//         setApiKeys(res.data.apiKeys);
//       }
//     } catch (error) {
//       message.error("Failed to fetch API keys");
//     }
//   };


//  useEffect(() => {
//     fetchApiKeys();
//   }, []);

  // Function to copy API Key
  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key);
    message.success("API Key copied to clipboard!");
  };

  // Function to toggle API Key status
  const toggleStatus = (id) => {
    setApiKeys(apiKeys.map(api => api.id === id ? { ...api, status: api.status === "Active" ? "Inactive" : "Active" } : api));
  };

  // Table columns
  const columns = [
    {
      title: "API Key",
      dataIndex: "key",
      key: "key",
      render: (text, record) => (
        <div className="flex items-center">
          <Input 
            value={text} 
            readOnly 
            type={isApiKeyVisible[record.id] ? "text" : "password"}
            className="mr-2"
          />
          <Button 
            type="text" 
            icon={isApiKeyVisible[record.id] ? <EyeOutlined /> : <EyeInvisibleOutlined />} 
            onClick={() => setIsApiKeyVisible(prev => ({ ...prev, [record.id]: !prev[record.id] }))}
          />
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Switch 
          checked={text === "Active"} 
          onChange={() => toggleStatus(record.id)} 
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="default" onClick={() => copyToClipboard(record.key)} icon={<CopyOutlined />}>
          Copy
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Title level={2} className="mb-6">Generate API Key</Title>

      <Card className="shadow-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <Text strong>Generate a New API Key:</Text>
          <Button type="primary" onClick={generateKey} icon={<KeyOutlined />} block className="mt-3">
            Generate API Key
          </Button>
        </div>
      </Card>

      {/* API Keys Table */}
      <div className="w-full max-w-3xl mt-6">
        <Table dataSource={apiKeys} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default GenerateApiKey;