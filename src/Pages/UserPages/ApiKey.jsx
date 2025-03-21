import React, { useState, useEffect } from "react";
import { Button, Table, Input, message, Typography, Modal } from "antd";
import {
  CopyOutlined,
  KeyOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import userInterceptor from "../../Api/userInterceptor.js";

const { Title } = Typography;
const { confirm } = Modal;

const GenerateApiKey = () => {
  const [apiKey, setApiKey] = useState(null);
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);


  const fetchApiKey = async () => {
    try {
      setFetching(true);
      const res = await userInterceptor.get("/users/get-api-key");
      console.log(res.data?.data)
      if (res.data?.data) {
        setApiKey(res.data?.data);
        message.success("API Key fetched successfully!");
      } else {
        setApiKey(null);
        message.warning("No API Key found.");
      }
    } catch (error) {
      message.error("Failed to fetch API key");
    } finally {
      setFetching(false);
    }
  };



 
  const showConfirm = () => {
    confirm({
      title: "Are you sure you want to regenerate your API key?",
      icon: <ExclamationCircleOutlined />,
      content: "Your previous API key will no longer work if you have used it elsewhere.",
      okText: "Yes, Regenerate",
      cancelText: "Cancel",
      onOk() {
        generateKey();
      },
    });
  };

  // Generate API Key
  const generateKey = async () => {
    try {
      setLoading(true);
      const res = await userInterceptor.get("/users/generate-api-key");
      if (res?.data?.message) {
        message.success(res.data?.message);
        fetchApiKey(); 
      }
    } catch (error) {
      message.error("Something went wrong while generating API key");
    } finally {
      setLoading(false);
    }
  };

  // Copy API Key to Clipboard
  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      message.success("API Key copied to clipboard!");
    }
  };

  const columns = [
    {
      title: "API Key",
      dataIndex: "apiKey",
      key: "apiKey",
      render: (text) => (
        <Input
          value={text}
          readOnly
          type={isApiKeyVisible ? "text" : "password"}
          className="flex-1"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <>
          <Button
            type="text"
            icon={isApiKeyVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => setIsApiKeyVisible((prev) => !prev)}
          />
          <Button type="default" onClick={copyToClipboard} icon={<CopyOutlined />}>
            Copy
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={3} className="text-center">API Key Management</Title>

      <div className="flex gap-4 mb-4">
        <Button
          type="primary"
          onClick={fetchApiKey}
          icon={<KeyOutlined />}
          loading={fetching}
        >
          {fetching ? "Getting API Key..." : "Get API Key"}
        </Button>

        <Button
          type="danger"
          onClick={showConfirm}
          icon={<KeyOutlined />}
          loading={loading}
        >
          {loading ? "Generating..." : "Generate New API Key"}
        </Button>
      </div>

      <Table
        dataSource={apiKey ? [{ key: 1, apiKey }] : []}
        columns={columns}
        pagination={false}
        bordered
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

export default GenerateApiKey;
