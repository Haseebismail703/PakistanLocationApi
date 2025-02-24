import React, { useState } from "react";
import { Button, Card, Input, message, Typography, Modal, Table, Switch } from "antd";
import { CopyOutlined, KeyOutlined, EyeInvisibleOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const GenerateApiKey = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isApiKeyVisible, setIsApiKeyVisible] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to generate API Key
  const generateKey = () => {
    if (password === "12345") { // Replace with real authentication logic
      const newKey = `sk-${Math.random().toString(36).substr(2, 24)}`;
      const newApiKey = {
        key: newKey,
        status: "Active",
        id: apiKeys.length + 1,
      };
      setApiKeys([...apiKeys, newApiKey]);
      message.success("API Key generated successfully!");
      setIsModalOpen(false);
      setPassword("");
    } else {
      message.error("Incorrect password!");
    }
  };

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
    <div className="flex flex-col items-center justify-center  p-6 ">
      <Title level={2} className="mb-6">Generate API Key</Title>

      <Card className="shadow-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <Text strong>Generate a New API Key:</Text>
          <Button type="primary" onClick={() => setIsModalOpen(true)} icon={<KeyOutlined />} block className="mt-3">
            Generate API Key
          </Button>
        </div>
      </Card>

      {/* API Keys Table */}
      <div className="w-full max-w-3xl mt-6">
        <Table dataSource={apiKeys} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      </div>

      {/* Password Modal */}
      <Modal
        title="Enter Password to Generate API Key"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>Cancel</Button>,
          <Button key="generate" type="primary" onClick={generateKey}>Generate</Button>,
        ]}
      >
        <Input.Password
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          prefix={<LockOutlined />}
          visibilityToggle={{ visible: isPasswordVisible, onVisibleChange: setIsPasswordVisible }}
        />
      </Modal>
    </div>
  );
};

export default GenerateApiKey;
