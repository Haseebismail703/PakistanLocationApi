import React, { useState, useEffect } from "react";
import { Button, Card, Input, message, Typography, Space } from "antd";
import { CopyOutlined, KeyOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../Api/api.js";

const { Title, Text } = Typography;

const GenerateApiKey = () => {
  const [apiKey, setApiKey] = useState(null);
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch API Key from Profile
  const fetchApiKey = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      const res = await axios.get(`${api}/users/profile`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

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

  // Generate API Key and Refresh Profile
  const generateKey = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      const res = await axios.get(`${api}/users/generate-api-key`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

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

  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      <Card className="shadow-lg p-6 w-full max-w-lg bg-white rounded-xl">
        <Title level={3} className="text-center">API Key</Title>
        <Text type="secondary" className="block text-center mb-4">
          Generate, view, and copy your API key securely.
        </Text>

        {/* Generate API Key Button */}
        <Button
          type="primary"
          onClick={generateKey}
          icon={<KeyOutlined />}
          block
          loading={loading}
        >
          Generate API Key
        </Button>

        {/* API Key Display Section */}
        {apiKey && (
          <Card className="shadow-md p-4 mt-6 border rounded-lg">
            <Text strong>API Key</Text>
            <div className="flex items-center gap-2 mt-2">
              <Input
                value={apiKey}
                readOnly
                type={isApiKeyVisible ? "text" : "password"}
                className="flex-1"
              />
              <Button
                type="text"
                icon={isApiKeyVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                onClick={() => setIsApiKeyVisible((prev) => !prev)}
              />
            </div>

            <Button
              type="default"
              onClick={copyToClipboard}
              icon={<CopyOutlined />}
              block
              className="mt-3"
            >
              Copy API Key
            </Button>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default GenerateApiKey;
