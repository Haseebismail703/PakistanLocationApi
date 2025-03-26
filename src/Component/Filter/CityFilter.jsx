import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js";

const { Option } = Select;

const CityFilter = ({ onFilterChange ,onareTypeChange }) => {
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState({
    countries: false,
    provinces: false,
    divisions: false,
    districts: false,
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

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
            `/admins/provinces`
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
      setDistricts([]);
      setSelectedDistrict(null);
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
      setDistricts([]);
      setSelectedDistrict(null);
    }
  }, [selectedProvince]);

  // Fetch Districts when division is selected
  useEffect(() => {
    if (selectedDivision) {
      const fetchDistricts = async () => {
        setLoading((prev) => ({ ...prev, districts: true }));
        try {
          const res = await adminInterceptor.get(
            `/admins/districts/get-by-division/${selectedDivision._id}`
          );
          setDistricts(res.data?.data.districts || []);
        } catch (error) {
          console.error("Error fetching districts", error);
        } finally {
          setLoading((prev) => ({ ...prev, districts: false }));
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
    }
  }, [selectedDivision]);

  // Send selected district ID to parent
  useEffect(() => {
    onFilterChange(selectedDistrict?._id || null);
  }, [selectedDistrict, onFilterChange]);

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

      {/* Select District */}
      <Select
        placeholder="Select District"
        className="select-dropdown"
        onChange={(id) =>
          setSelectedDistrict(districts.find((d) => d._id === id))
        }
        value={selectedDistrict?._id || undefined}
        allowClear
        showSearch
        disabled={!selectedDivision}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        notFoundContent={loading.districts ? <Spin size="small" /> : "No Data"}
      >
        {districts.map((district) => (
          <Option key={district._id} value={district._id}>
            {district.name}
          </Option>
        ))}
      </Select>
      {/* Urban or Roral */}
      <Select
        className="select-dropdown"
        placeholder="Select Area Type"
        disabled={!selectedDivision}
        onChange={(value) => onareTypeChange(value)}
        allowClear
        showSearch
      >
        <Option value="Urban">Urban</Option>
        <Option value="Rural">Rural</Option>
      </Select>


    </div>
  );
};

export default CityFilter;
