import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import adminInterceptor from "../../Api/adminInterceptor";
import usePermission from "../../Hooks/usePermission";

const { TextArea } = Input;
const { Option } = Select;

const ManageDivision = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectdivision, setselectdivision] = useState(null);

    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [province, setprovince] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [division, setdivisions] = useState([]);
    const [newDivision, setNewDivisions] = useState([]);

    const [fileList, setFileList] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [createForm] = Form.useForm();
    const [updateDetailsForm] = Form.useForm();
    const [updateImagesForm] = Form.useForm();
    const getAdmin = JSON.parse(localStorage.getItem("admin"));
    let canRead = usePermission("read-operations")
    let canCreate = usePermission("create-operations")
    let canUpdate = usePermission("update-operations")
    let canDelete = usePermission("delete-operations")
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get currentPage and pageSize from URL or default to 1 and 10
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("size")) || 10;

    useEffect(() => {

        console.log("Selected Province:", selectedProvince)

        const getAlldivisions = async () => {
            setTableLoading(true)
            try {
                const response = await adminInterceptor.get(`/admins/divisions${!selectedProvince ? "": `/get-by-province/${selectedProvince}` }?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`);
                console.log("Response in divisions: ", response);
                const divisionsData = response.data?.data?.map((data, index) => ({
                    key: index + 1 + (currentPage - 1) * pageSize,
                    id: data._id,
                    name: data.name,
                    createdAt: data.createdAt?.substring(0, 10),
                    pictures: data.pictures,
                    details: data.details,
                    provinceId: data.province || null,

                }));
                setdivisions(response?.data.data);
                setTotalItems(response?.data.data.total || 1000);
            } catch (error) {
                message.error("Failed to fetch divisions!");
            } finally {
                setTableLoading(false)
            }
        };

        getAlldivisions();
    }, [currentPage, pageSize, selectedProvince]);

    useEffect(() => {

        const getAllCountry = async () => {
            try {
                setTableLoading(true);
                const response = await adminInterceptor.get(`/admins/country`);
                const countryData = [{
                    key: 1,
                    id: response.data.data._id || "",
                    name: response.data.data.name || "N/A",
                    createdAt: response.data.data.createdAt ? response.data.data.createdAt.substring(0, 10) : "N/A",
                    pictures: response.data.data.pictures || [],
                    details: response.data.data.details || "No details available",
                }];
                // console.log("Response country: ", countryData);

                setCountry(countryData);

            } catch (error) {
                message.error("Failed to fetch country!");
            } finally {
                setTableLoading(false);
            }
        };

        getAllCountry()

    }, [])

    // ✅ Handle Country Selection
    const handleCountryChange = async (countryId) => {
        console.log("handleCountryChange: ", countryId);
        const selected = country.find((c) => c.id === countryId);
        //  console.log("handleCountryChange:", selected);

        if (!selected) {
            console.error("Selected country not found!");
            return;
        }

        setSelectedCountry(selected);
        setprovince([]); // Reset previous provinces
        setSelectedProvince(null);


        try {
            setLoading(true);
            try {
                const response = await adminInterceptor.get(`/admins/provinces/?country=${selected._id}`);
                // console.log("Response in provinces: ", response);
                setprovince(response.data?.data);
            } catch (error) {
                message.error("Failed to fetch province!");
            }
        } catch (error) {
            console.error("Error fetching provinces:", error);

        } finally {
            setLoading(false);
        }


    }

    // ✅ Handle Province Selection
    const handleProvinceChange = async (provinceId) => {
        console.log("handleProvinceChange: ", provinceId);


        setSelectedProvince(provinceId);

        // Frontend pe filter karo
        const filteredDivisions = division.filter((div) => {
            return div.province._id === provinceId;
        });
        // console.log("Filtered Divisions: ", filteredDivisions);
        console.log("division: ", division);


        setdivisions(filteredDivisions)
    };

    const handleCreate = async (values) => {
        setLoading(true);
        const formData = new FormData();

        if (fileList) {
            fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        formData.append("name", values.name);
        formData.append("details", values.details);
        formData.append("provinceId", values.provinceId);

        try {
            const response = await adminInterceptor.post(`/admins/divisions/create`, formData);

            if (response.status === 201) {
                message.success("Division added successfully!");
                setCreateModalVisible(false);
                getAlldivisions();
                setFileList([])
                createForm.resetFields();
            } else {
                message.error("Failed to add Division!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (values) => {
        if (!selectdivision) return;
        setLoading(true);
        try {
            const response = await adminInterceptor.put(
                `/admins/divisions/update-details/${selectdivision.id}`,
                { name: values.name, details: values.details },

            );

            if (response.status === 200) {
                message.success("Division details updated successfully!");
                setUpdateDetailsModalVisible(false);
                getAlldivisions()
            } else {
                message.error("Failed to update Division details!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = async (values) => {
        if (!selectdivision) return;

        setLoading(true);
        const formData = new FormData();

        if (values.pictures?.fileList) {
            values.pictures.fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        try {
            const response = await adminInterceptor.put(
                `/admins/divisions/add-pictures/${selectdivision.id}`,
                formData,

            );

            if (response.data) {
                message.success("Division images updated successfully!");
                setUpdateImagesModalVisible(false);
                getAlldivisions();
                setFileList([])
            } else {
                message.error("Failed to update Division images!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating images. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (item) => {
        try {
            const response = await adminInterceptor.put(
                `/admins/divisions/delete-pictures/${selectdivision.id}`,
                { picturesToDelete: [item] },
            );

            if (response.status === 200) {
                message.success("Division image deleted successfully!");
                getAlldivisions();
                setDeleteImagesModalVisible(false)
            } else {
                message.error("Failed to delete Division image!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error deleting Division image. Please try again.");
        }
    };

    const columns = [
        { title: "No", dataIndex: "key", key: "key" },
        {
            title: "Name", dataIndex: "name", key: "name",
            render: (_, record) => (
                <>
                    <span>{canRead ? record.name : "_"}</span>
                </>
            )
        },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button disabled={!canRead} icon={<EyeOutlined />} onClick={() => { setselectdivision(record); setViewModalVisible(true); }}>View</Button>
                    <Button disabled={!canUpdate} icon={<EditOutlined />} onClick={() => { setselectdivision(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button disabled={!canUpdate} icon={<PlusOutlined />} onClick={() => { setselectdivision(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button disabled={!canDelete} icon={<DeleteOutlined />} danger onClick={() => { setselectdivision(record); setDeleteImagesModalVisible(true); }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: 20 }}>
                <center><h1 style={{ fontSize: 30 }}>Manage Division</h1></center>
                <br />
                <br />
                {/* Filter start */}
                <div style={{ width: 400, margin: "20px" }}>
                    <Select
                        placeholder="Select Country"
                        style={{ width: "100%", marginBottom: 10 }}
                        onChange={(value) => handleCountryChange(value)}
                        value={selectedCountry?.id} // Ensure only ID is passed
                        loading={loading}
                    >
                        {country.map((c) => (
                            <Option key={c.id} value={c.id}> {/* Pass only the ID */}
                                {c.name}
                            </Option>
                        ))}
                    </Select>


                    <Select
                        placeholder="Select Province"
                        style={{ width: "100%", marginBottom: 10 }}
                        onChange={handleProvinceChange}
                        value={selectedProvince}
                        disabled={!selectedCountry || loading}
                    >
                        {province.map((c) => (
                            <Option key={c._id} value={c._id}>
                                {c.name}
                            </Option>
                        ))}
                    </Select>

                </div>
                {/* Filter end */}
                <Button disabled={!canCreate} type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create Division</Button>
                <Table locale={{ emptyText: "No data available" }} loading={tableLoading} columns={columns} dataSource={division} scroll={{ "x": "100%" }} style={{ marginTop: 20 }} />
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={(page, size) => {
                        if (page < currentPage || division.length === pageSize) {
                            navigate(`?page=${page}&size=${size}`);
                        } else {
                            message.warning("No more data to display.");
                        }
                    }}
                    showSizeChanger
                    pageSizeOptions={["10", "20", "50", "100"]}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    hideOnSinglePage
                    showLessItems
                    prevIcon={<LeftOutlined />}
                    nextIcon={<RightOutlined />}
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                    }}
                />
            </div >

            { /* Create Division Modal */}
            < Modal
                title="Create Division"
                open={createModalVisible}
                onCancel={() => setCreateModalVisible(false)}
                footer={null}
            >
                <Form form={createForm} layout="vertical" onFinish={handleCreate}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Details" name="details" rules={[{ required: true, message: "Please enter details!" }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Select a Province" name="provinceId" rules={[{ required: true, message: "Please select a country!" }]}>
                        <Select placeholder="Select a Province">
                            {province && province.map((data) => (
                                <Option key={data._id} value={data._id}>{data.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload
                            multiple
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={({ fileList }) => setFileList(fileList)}
                            fileList={fileList}
                        >
                            <Button icon={<PlusOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form>
            </Modal >

            {/* Update Details Modal */}
            < Modal
                title="Update Division Details"
                open={updateDetailsModalVisible}
                onCancel={() => setUpdateDetailsModalVisible(false)}
                footer={null}
            >
                <Form form={updateDetailsForm} layout="vertical" onFinish={handleUpdateDetails}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Details" name="details" rules={[{ required: true, message: "Please enter details!" }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                </Form>
            </Modal >

            {/* Update Images Modal */}
            < Modal
                title="Add Division Images"
                open={updateImagesModalVisible}
                onCancel={() => setUpdateImagesModalVisible(false)}
                footer={null}
            >
                <Form form={updateImagesForm} layout="vertical" onFinish={handleAddImage}>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload
                            multiple
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={({ fileList }) => setFileList(fileList)}
                            fileList={fileList}
                        >
                            <Button icon={<PlusOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                </Form>
            </Modal >

            {/* View Modal */}
            < Modal
                title="Division Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
            >
                {selectdivision && (
                    <div>
                        <h3>Name: {selectdivision.name}</h3>
                        <p><strong>Details:</strong> {selectdivision.details}</p>
                        <h4>Images:</h4>
                        {selectdivision.pictures?.length > 0 ? (
                            selectdivision.pictures.map((pic, index) => (
                                <Image key={index} width={200} src={pic} alt={`Division ${index}`} />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                )}
            </Modal >


            {/* Delete model  */}
            < Modal
                title="Delete Divsion Images"
                open={deleteImagesModalVisible}
                onCancel={() => setDeleteImagesModalVisible(false)}
                footer={null}
            >
                {selectdivision?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectdivision.pictures.map((imgUrl, index) => (
                            <div key={index} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "10px",
                                background: "#f9f9f9"
                            }}>
                                <Image src={imgUrl} width={100} height={100} />
                                <Button
                                    danger
                                    size="small"
                                    style={{ marginTop: 5 }}
                                    onClick={() => handleDelete(imgUrl)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images available.</p>
                )}
            </Modal >

        </>
    );
};

export default ManageDivision;


