import React, { useState } from "react";
import { Table, Select } from "antd";

const { Option } = Select;

// Dummy Data
const allData = [
  { id: 1, division: "Karachi", district: "South", city: "Saddar", area: "Clifton", name: "Location A" },
  { id: 2, division: "Karachi", district: "East", city: "Gulshan", area: "Johar", name: "Location B" },
  { id: 3, division: "Lahore", district: "Lahore", city: "DHA", area: "Phase 6", name: "Location C" },
  { id: 4, division: "Mumbai", district: "Mumbai", city: "Andheri", area: "Lokhandwala", name: "Location D" },
  { id: 5, division: "New Delhi", district: "Central", city: "Connaught", area: "Circle", name: "Location E" },
];

const DivisionFilter = () => {
  // Filters State
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Extract unique values for dropdowns
  const divisions = [...new Set(allData.map((item) => item.division))];

  const districts = selectedDivision
    ? [...new Set(allData.filter((item) => item.division === selectedDivision).map((item) => item.district))]
    : [];

  const cities = selectedDistrict
    ? [...new Set(allData.filter((item) => item.district === selectedDistrict).map((item) => item.city))]
    : [];

  const areas = selectedCity
    ? [...new Set(allData.filter((item) => item.city === selectedCity).map((item) => item.area))]
    : [];

  // Filtered Table Data
  const filteredData = allData.filter((item) => {
    return (
      (!selectedDivision || item.division === selectedDivision) &&
      (!selectedDistrict || item.district === selectedDistrict) &&
      (!selectedCity || item.city === selectedCity)
    );
  });

  // Table Columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Division", dataIndex: "division", key: "division" },
    { title: "District", dataIndex: "district", key: "district" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "Area", dataIndex: "area", key: "area" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Division-based Filtering</h2>

      {/* Dropdown Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <Select
          placeholder="Select Division"
          style={{ width: 200 }}
          onChange={setSelectedDivision}
          value={selectedDivision}
        >
          {divisions.map((division) => (
            <Option key={division} value={division}>
              {division}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Select District"
          style={{ width: 200 }}
          onChange={setSelectedDistrict}
          value={selectedDistrict}
          disabled={!selectedDivision}
        >
          {districts.map((district) => (
            <Option key={district} value={district}>
              {district}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Select City"
          style={{ width: 200 }}
          onChange={setSelectedCity}
          value={selectedCity}
          disabled={!selectedDistrict}
        >
          {cities.map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </div>

      {/* Table */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" bordered />
    </div>
  );
};

export default DivisionFilter;
