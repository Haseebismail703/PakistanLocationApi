import React, { useState, useEffect } from "react";
import { Button, Table, Input, message, Typography, Modal } from "antd";
import { CopyOutlined, KeyOutlined, EyeInvisibleOutlined, EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import userInterceptor from "../../Api/userInterceptor.js";

const { Title } = Typography;
const { confirm } = Modal;

const GenerateApiKey = () => {
  const [apiKey, setApiKey] = useState(null);
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch API Key from Profile
  const fetchApiKey = async () => {
    try {
      setLoading(true);
      const res = await userInterceptor.get("/users/profile");
      if (res?.data?.data?.apiKey) {
        setApiKey(res.data.data.apiKey);
      } else {
        setApiKey(null);
      }
    } catch (error) {
      message.error("Failed to fetch API key");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  // Confirm before generating new API Key
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

  // Generate API Key and Refresh Profile
  const generateKey = async () => {
    try {
      setLoading(true);
      const res = await userInterceptor.get("/users/generate-api-key");
      if (res) {
        message.success(res.data?.message);
        fetchApiKey(); // Refresh API key after generation
      }
    } catch (error) {
      message.error("Something went wrong");
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
      <Title level={3} className="text-center">API Key</Title>

      <Button
        type="primary"
        onClick={apiKey ? showConfirm : generateKey}
        icon={<KeyOutlined />}
        loading={loading}
        className="mb-4"
      >
        {loading ? "Getting API Key..." : apiKey ? "Regenerate API Key" : "Generate Now"}
      </Button>

      <Table
        dataSource={apiKey ? [{ key: 1, apiKey }] : []}
        columns={columns}
        pagination={false}
        bordered
        scroll={{x : "100%"}}
      />
    </div>
  );
};

export default GenerateApiKey;