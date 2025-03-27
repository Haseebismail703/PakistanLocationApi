import React, { useState, useEffect } from "react";
import { Table, Button, Spin, Typography, Input, Form } from "antd";
import axios from "axios";
import api from "../../Api/api.js";

const { Title } = Typography;
const { Search } = Input;
const API_BASE = `${api}/public`;
const API_KEY = "YZ4iC85hw2GZzcKzkLm2lC6pKffs3c0S";

const AdminForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("country");
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedNames, setSelectedNames] = useState({
    country: "",
    province: "",
    division: "",
    district: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    if (currentStep !== "address") fetchData();
  }, [currentStep, selectedId]);

  const fetchData = async () => {
    setLoading(true);
    let url = "";

    if (currentStep === "country") url = `${API_BASE}/country?apiKey=${API_KEY}`;
    else if (currentStep === "province") url = `${API_BASE}/provinces?limit=0&apiKey=${API_KEY}`;
    else if (currentStep === "division" && selectedId) url = `${API_BASE}/divisions/${selectedId}?limit=0&apiKey=${API_KEY}`;
    else if (currentStep === "district" && selectedId) url = `${API_BASE}/districts/${selectedId}?limit=0&apiKey=${API_KEY}`;
    else if (currentStep === "city" && selectedId) url = `${API_BASE}/cities/${selectedId}?limit=0&apiKey=${API_KEY}`;
    else if (currentStep === "area" && selectedId) url = `${API_BASE}/areas/${selectedId}?limit=0&apiKey=${API_KEY}`;

    if (!url) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(url);
      // console.log("API Response:", response.data);
      
      let mappedData = [];

      if (currentStep === "country") {
        const country = response.data?.data;
        if (country && typeof country === "object") {
          mappedData = [{
            key: country._id,
            no: 1,
            name: country.name,
            id: country._id,
          }];
        }
      } else {
        mappedData = Array.isArray(response.data?.data) ?
          response.data.data.map((item, index) => ({
            key: item._id,
            no: index + 1,
            name: item.name,
            id: item._id,
          })) : [];
      }

      setData(mappedData);
    } catch (error) {
      console.error(`Error fetching ${currentStep} data:`, error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (record) => {
    setHistory([...history, { step: currentStep, id: selectedId }]);
    setSelectedNames({ ...selectedNames, [currentStep]: record.name });
    setSelectedId(record.id);

    const steps = ["country", "province", "division", "district", "city", "area", "address"];
    const nextStepIndex = steps.indexOf(currentStep) + 1;
    setCurrentStep(steps[nextStepIndex] || "address");
  };

  const handleBack = () => {
    if (history.length > 0) {
      const lastStep = history.pop();
      setCurrentStep(lastStep.step);
      setSelectedId(lastStep.id);
      setHistory([...history]);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "No", dataIndex: "no", key: "no", render: (_, __, index) => index + 1 },
    { title: "Name", dataIndex: "name", key: "name" },
    ...(currentStep === "city" ? [{ title: "Area Type", dataIndex: "areaType", key: "areaType" }] : []),
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        {currentStep.charAt(0).toUpperCase() + currentStep.slice(1)} Table
      </Title>

      {history.length > 0 && (
        <Button onClick={handleBack} style={{ marginBottom: 10 }}>Back</Button>
      )}

      {currentStep !== "address" && (
        <>
          <Search
            placeholder={`Search ${currentStep}`}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 10, width: "100%" }}
          />

          {loading ? (
            <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
                style: { cursor: "pointer" },
              })}
              pagination={{ pageSize: 5 }}
            />
          )}
        </>
      )}

      {currentStep === "address" && (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #ccc", borderRadius: 5 }}>
          <Title level={4}>Selected Address</Title>
          <Form layout="vertical">
            {Object.keys(selectedNames).map((key) => (
              <Form.Item label={key.charAt(0).toUpperCase() + key.slice(1)} key={key}>
                <Input value={selectedNames[key]} disabled />
              </Form.Item>
            ))}
          </Form>
        </div>
      )}
    </div>
  );
};

export default AdminForm;