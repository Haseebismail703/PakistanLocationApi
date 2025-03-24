import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import Filter from "../../Component/AdminCom/Filter.jsx";
import adminInterceptor from "../../Api/adminInterceptor.js";

const DivisionList = () => {
  const [divisions, setDivisions] = useState([]);
  const [allDivisions, setAllDivisions] = useState([]); // Store all data
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch all divisions
  const getAllDivisions = async () => {
    setTableLoading(true);
    try {
      const response = await adminInterceptor.get(`/admins/divisions?limit=0`);
      let divisionsData = response.data?.data?.divisions.map((data, index) => ({
        key: index + 1,
        id: data._id,
        name: data.name || "N/A",
        createdAt: data.createdAt?.substring(0, 10) || "N/A",
        details: data.details || "N/A",
        provinceId: data.province?._id || null,
        province: data.province?.name || "N/A",
      }));

      setAllDivisions(divisionsData);
      setDivisions(divisionsData);
    } catch (error) {
      message.error("Failed to fetch divisions!");
    } finally {
      setTableLoading(false);
    }
  };

  // Filter divisions when selectedProvinceId changes
  useEffect(() => {
    if (selectedProvinceId) {
      const filteredDivisions = allDivisions.filter(
        (division) => division.provinceId === selectedProvinceId
      );
      setDivisions(filteredDivisions);
    } else {
      setDivisions(allDivisions);
    }
  }, [selectedProvinceId, allDivisions]);

  
console.log(selectedProvinceId)
  useEffect(() => {
    getAllDivisions();
  }, []);

  return (
    <div>
      <Filter  onFilterChange={(provinceId) => setSelectedProvinceId(provinceId)} />

      <Table
        dataSource={divisions}
        loading={tableLoading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
          { title: "Details", dataIndex: "details", key: "details" },
          { title: "Province", dataIndex: "province", key: "province" },
        ]}
      />
    </div>
  );
};

export default DivisionList;
