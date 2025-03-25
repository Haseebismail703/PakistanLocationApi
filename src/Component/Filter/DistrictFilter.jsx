import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js";

const { Option } = Select;

const DistrictFilter = ({ onFilterChange }) => {
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState({
    countries: false,
    provinces: false,
    divisions: false,
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);

  // Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading((prev) => ({ ...prev, countries: true }));
      try {
        const res = await adminInterceptor.get("/admins/country");
        setCountries([res.data?.data] || []);
      } catch (error) {
        console.error("Error fetching countries", error);
      } finally {
        setLoading((prev) => ({ ...prev, countries: false }));
      }
    };
    fetchCountries();
  }, []);

  // Fetch Provinces when country is selected
  useEffect(() => {
    if (selectedCountry) {
      const fetchProvinces = async () => {
        setLoading((prev) => ({ ...prev, provinces: true }));
        try {
          const res = await adminInterceptor.get(
            `/admins/provinces?country=${selectedCountry._id}`
          );
          setProvinces(res.data?.data || []);
        } catch (error) {
          console.error("Error fetching provinces", error);
        } finally {
          setLoading((prev) => ({ ...prev, provinces: false }));
        }
      };
      fetchProvinces();
    } else {
      setProvinces([]);
      setSelectedProvince(null);
      setDivisions([]);
      setSelectedDivision(null);
    }
  }, [selectedCountry]);

  // Fetch Divisions when province is selected
  useEffect(() => {
    if (selectedProvince) {
      const fetchDivisions = async () => {
        setLoading((prev) => ({ ...prev, divisions: true }));
        try {
          const res = await adminInterceptor.get(
            `/admins/divisions/get-by-province/${selectedProvince._id}`
          );
          setDivisions(res.data?.data.divisions || []);
        //   console.log(res.data)
        } catch (error) {
          console.error("Error fetching divisions", error);
        } finally {
          setLoading((prev) => ({ ...prev, divisions: false }));
        }
      };
      fetchDivisions();
    } else {
      setDivisions([]);
      setSelectedDivision(null);
    }
  }, [selectedProvince]);

  // Send selected division ID to parent
  useEffect(() => {
    onFilterChange(selectedDivision?._id || null);
  }, [selectedDivision, onFilterChange]);

  return (
    <div className="filter-container">
      {/* Select Country */}
      <Select
        placeholder="Select Country"
        className="select-dropdown"
        onChange={(id) =>
          setSelectedCountry(countries.find((c) => c._id === id))
        }
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
        className="select-dropdown"
        onChange={(id) =>
          setSelectedProvince(provinces.find((p) => p._id === id))
        }
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

      {/* Select Division */}
      <Select
        placeholder="Select Division"
        className="select-dropdown"
        onChange={(id) =>
          setSelectedDivision(divisions.find((d) => d._id === id))
        }
        value={selectedDivision?._id || undefined}
        allowClear
        showSearch
        disabled={!selectedProvince}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        notFoundContent={loading.divisions ? <Spin size="small" /> : "No Data"}
      >
        {divisions.map((division) => (
          <Option key={division._id} value={division._id}>
            {division.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DistrictFilter;
