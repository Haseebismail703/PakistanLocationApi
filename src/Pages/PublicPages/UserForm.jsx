import React, { useState, useEffect } from "react";
import { Input, Button, Card, Typography, Spin } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import api from '../../Api/api.js'
const { Title } = Typography;
const API_BASE = `${api}/public`;

const LocationForm = () => {
  const [step, setStep] = useState("province");
  const [location, setLocation] = useState({
    province: "",
    division: "",
    district: "",
    city: "",
    area: "",
  });
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [step, location]);

  const fetchData = async () => {
    setLoading(true);
    let url = "";
  
    const API_KEY = "YZ4iC85hw2GZzcKzkLm2lC6pKffs3c0S"; // API Key
  
    if (step === "province") 
      url = `${API_BASE}/provinces?limit=5&apiKey=${API_KEY}`;
    else if (step === "division" && location.province)
      url = `${API_BASE}/divisions/${location.province}?apiKey=${API_KEY}`;
    else if (step === "district" && location.division)
      url = `${API_BASE}/districts/${location.division}?apiKey=${API_KEY}`;
    else if (step === "city" && location.district)
      url = `${API_BASE}/cities/${location.district}?apiKey=${API_KEY}`;
    else if (step === "area" && location.city)
      url = `${API_BASE}/areas/${location.city}?limit=5&apiKey=${API_KEY}`;
  
    if (!url) {
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.get(url);
      setOptions(Array.isArray(response.data?.data) ? response.data?.data : []);
    } catch (error) {
      console.error(`Error fetching ${step} data:`, error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleNext = (field, value, id) => {
    setLocation((prev) => ({ ...prev, [field]: id })); // Store ID
    setSearch("");

    if (field === "province") setStep("division");
    else if (field === "division") setStep("district");
    else if (field === "district") setStep("city");
    else if (field === "city") setStep("area");
    else setStep("submit");
  };

  const handleBack = () => {
    if (step === "division") setStep("province");
    else if (step === "district") setStep("division");
    else if (step === "city") setStep("district");
    else if (step === "area") setStep("city");

    setSearch("");
  };

  const filteredOptions = options?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "white",
      }}
    >
      <Card
        style={{
          width: 350,
          padding: 20,
          background: "#ffffff",
          textAlign: "center",
          border: "1px solid black",
        }}
      >
        <Title level={3} style={{ marginBottom: 15 }}>
          Select {step.charAt(0).toUpperCase() + step.slice(1)}
        </Title>

        {step !== "submit" ? (
          <>
            <Input
              placeholder={`Search ${step}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                marginBottom: 10,
                background: "#f0f0f0",
                border: "1px solid black",
              }}
            />

            {loading ? (
              <Spin size="large" />
            ) : (
              filteredOptions.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleNext(step, item.name, item._id)}
                    block
                    style={{
                      marginBottom: 5,
                      background: "#f0f0f0",
                      color: "black",
                      border: "1px solid black",
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))
            )}

            {step !== "province" && (
              <Button
                onClick={handleBack}
                block
                style={{
                  marginTop: 10,
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                }}
              >
                Back
              </Button>
            )}
          </>
        ) : (
          <>
            <Title level={4} style={{ color: "black" }}>
              Review Your Selection
            </Title>
            <p>
              <strong>Province:</strong> {location.province}
            </p>
            <p>
              <strong>Division:</strong> {location.division}
            </p>
            <p>
              <strong>District:</strong> {location.district}
            </p>
            <p>
              <strong>City:</strong> {location.city}
            </p>
            <p>
              <strong>Area:</strong> {location.area}
            </p>
            <Button type="primary" block style={{ marginTop: 10 }}>
              Submit
            </Button>
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default LocationForm;
