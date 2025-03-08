import React, { useEffect, useState } from "react";
import { Table, Pagination, message, Spin } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js"; // Replace with your actual interceptor path

const DivisionList = () => {
  // State Initialization
  const [divisions, setDivisions] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Default page 1
  const [pageSize, setPageSize] = useState(10); // Default limit 10
  const [totalItems, setTotalItems] = useState(0); // Total items for pagination

  // Fetch Data Function
  const getAlldivisions = async () => {
    setTableLoading(true);
    try {
      console.log(`Fetching divisions: Page ${currentPage}, Limit ${pageSize}`);
      const response = await adminInterceptor.get(
        `/admins/divisions?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`
      );

      // Map response to table data format
      const divisionsData = response.data?.data?.map((data, index) => ({
        key: index + 1,
        id: data._id,
        name: data.name || "N/A",
        createdAt: data.createdAt?.substring(0, 10) || "N/A",
        details: data.details || "N/A",
        countryId: data.countryId || "N/A",
      }));

      console.log("Response Data:", response.data?.data);
      
      setDivisions(divisionsData);
      setTotalItems(response.data?.total || 100); // Set total items for pagination (Default: 100)
    } catch (error) {
      message.error("Failed to fetch divisions!");
    } finally {
      setTableLoading(false);
    }
  };

  // Fetch data on page or page size change
  useEffect(() => {
    getAlldivisions();
  }, [currentPage, pageSize]);

  // Ant Design Table Columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "Country ID", dataIndex: "countryId", key: "countryId" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Division List</h2>
      
      <Spin spinning={tableLoading}>
        <Table
          columns={columns}
          dataSource={divisions}
          pagination={false} // Disable default pagination
          rowKey="id"
          bordered
          style={{ marginBottom: "16px" }}
        />
      </Spin>

      {/* Custom Pagination */}
      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
        showSizeChanger
        pageSizeOptions={["10", "20", "50", "100"]}
        style={{ textAlign: "center" }}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        hideOnSinglePage={true} // Hide pagination if there's only one page
        showLessItems={true} // Show fewer page numbers in pagination
      />
    </div>
  );
};

export default DivisionList;
