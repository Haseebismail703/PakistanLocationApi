import React, { useState, useEffect } from "react";
import { Button, Table, message, Typography, Modal } from "antd";
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
      content:
        "Your previous API key will no longer work if you have used it elsewhere.",
      okText: "Yes, Regenerate",
      cancelText: "Cancel",
      onOk() {
        generateKey();
      },
    });
  };

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
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {isApiKeyVisible ? text : "•".repeat(16)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={isApiKeyVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => setIsApiKeyVisible((prev) => !prev)}
          />
          <Button type="default" onClick={copyToClipboard} icon={<CopyOutlined />}>
            Copy
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={3} className="text-center">API Key Management</Title>

      {/* Responsive Button Container */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          type="default"
          onClick={fetchApiKey}
          icon={<KeyOutlined />}
          loading={fetching}
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", minWidth: "180px" }}
        >
          {fetching ? "Getting API Key..." : "Get API Key"}
        </Button>

        <Button
          type="dashed"
          onClick={showConfirm}
          icon={<KeyOutlined />}
          loading={loading}
          style={{ minWidth: "220px" }}
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
