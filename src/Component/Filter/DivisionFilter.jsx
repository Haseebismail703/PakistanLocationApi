import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js";

const { Option } = Select;

const DivisionFilter = ({ onFilterChange }) => {
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState({ countries: false, provinces: false });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  // 🔹 Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading((prev) => ({ ...prev, countries: true }));
      try {
        const res = await adminInterceptor.get("/admins/country");
        setCountries(res.data?.data ? [res.data?.data] : [] );
      } catch (error) {
        console.error("Error fetching countries", error);
      } finally {
        setLoading((prev) => ({ ...prev, countries: false }));
      }
    };
    fetchCountries();
  }, []);

  // 🔹 Fetch Provinces when country is selected
  useEffect(() => {
    if (selectedCountry) {
      const fetchProvinces = async () => {
        setLoading((prev) => ({ ...prev, provinces: true }));
        try {
          const res = await adminInterceptor.get(`/admins/provinces?country=${selectedCountry._id}`);
          setProvinces(res.data?.data || []);
        } catch (error) {
          console.error("Error fetching provinces", error);
        } finally {
          setLoading((prev) => ({ ...prev, provinces: false }));
        }
      };
      fetchProvinces();
    } else {
      setProvinces([]); // Reset provinces when country is deselected
      setSelectedProvince(null);
    }
  }, [selectedCountry]);

  // 🔹 Send selected province ID to parent
  useEffect(() => {
    onFilterChange(selectedProvince?._id || null);
  }, [selectedProvince, onFilterChange]);

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {/* Select Country */}
      <Select
        placeholder="Select Country"
        style={{ minWidth: "200px" }}
        onChange={(id) => setSelectedCountry(countries.find((c) => c._id === id))}
        value={selectedCountry?._id || undefined}
        allowClear
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        notFoundContent={loading.countries ? <Spin size="small" /> : "No Data"}
      >
        {countries.map((country) => (
          <Option key={country._id} value={country._id}>
            {country.name}
          </Option>
        ))}
      </Select>

      {/* Select Province */}
      <Select
        placeholder="Select Province"
        style={{ minWidth: "200px" }}
        onChange={(id) => setSelectedProvince(provinces.find((p) => p._id === id))}
        value={selectedProvince?._id || undefined}
        allowClear
        showSearch
        disabled={!selectedCountry}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        notFoundContent={loading.provinces ? <Spin size="small" /> : "No Data"}
      >
        {provinces.map((province) => (
          <Option key={province._id} value={province._id}>
            {province.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DivisionFilter;
