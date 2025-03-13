import React, { useEffect, useState } from "react";
import { Table, Pagination, message } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js";
import { useNavigate, useSearchParams } from "react-router-dom";

const DivisionList = () => {
  const [divisions, setDivisions] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get currentPage and pageSize from URL or default to 1 and 10
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("size")) || 10;

  const getAlldivisions = async () => {
    setTableLoading(true);
    try {
      console.log(`Fetching divisions: Page ${currentPage}, Limit ${pageSize}`);
      const response = await adminInterceptor.get(
        `/admins/divisions?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`
      );

      const divisionsData = response.data?.data?.map((data, index) => ({
        key: index + 1 + (currentPage - 1) * pageSize,
        id: data._id,
        name: data.name || "N/A",
        createdAt: data.createdAt?.substring(0, 10) || "N/A",
        details: data.details || "N/A",
        countryId: data.countryId || "N/A",
      }));

      console.log("Response Data:", response.data?.data);

      setDivisions(divisionsData);
      setTotalItems(divisionsData?.total || 300);
    } catch (error) {
      message.error("Failed to fetch divisions!");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    getAlldivisions();
  }, [currentPage, pageSize]);

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

      <Table
        loading={tableLoading}
        columns={columns}
        dataSource={divisions}
        pagination={false}
        rowKey="id"
        scroll={{ x: "100" }}
        bordered
        style={{ marginBottom: "16px" }}
      />

      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={(page, size) => {
          if (page < currentPage || divisions.length === pageSize) {
            navigate(`?page=${page}&size=${size}`);
          } else {
            message.warning("No more data to display.");
          }
        }}
        showSizeChanger
        pageSizeOptions={["10", "20", "50", "100"]}
        style={{ textAlign: "center" }}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        hideOnSinglePage={true}
        showLessItems={true}
      />
    </div>
  );
};

export default DivisionList;
