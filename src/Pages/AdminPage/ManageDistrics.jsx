import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import adminInterceptor from "../../Api/adminInterceptor";
import usePermission from "../../Hooks/usePermission";
import DistrictFilter from '../../Component/Filter/DistrictFilter'
const { TextArea } = Input;
const { Option } = Select;

const ManageDistrics = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [districts, setdistricts] = useState([]);
    const [selectdistrict, setselectdistrict] = useState(null);
    const [divisions, setdivisions] = useState('');
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    // filter
    const [selectedDivisionId, setselectedDivisionId] = useState(null);
    const [allDistrict, setallDistrict] = useState([]);
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
        getdivisions();
        getAlldistricts();
    }, [currentPage, pageSize, selectedDivisionId]);

    const getdivisions = async () => {
        try {
            const response = await adminInterceptor.get(`/admins/divisions?limit=0`);
            // console.log(response.data?.data.divisions);
            setdivisions(response.data?.data.divisions);
        } catch (error) {
            message.error("Failed to fetch divisions!");
        }
    };


    // Filter districts when selectedDivisionId changes
    useEffect(() => {
        if (selectedDivisionId) {
            // Filter only for UI
            const filteredDistricts = allDistrict.filter(
                (district) => district.divisionId === selectedDivisionId
            );
            setdistricts(filteredDistricts);
        } else {
            setdistricts(allDistrict);
        }
    }, [selectedDivisionId, allDistrict]);

    const getAlldistricts = async () => {
        setTableLoading(true);
        setdistricts([]);

        try {
            const response = await adminInterceptor.get(
                `/admins/districts${selectedDivisionId ? `/get-by-division/${selectedDivisionId}` : ""}?skip=${selectedDivisionId ? 0 : (currentPage - 1) * pageSize}&limit=${selectedDivisionId ? 0 : pageSize}`
            );

            console.log("Response in districts:", response?.data.data.districts);

            const districtsData = response.data?.data?.districts?.map((data, index) => ({
                key: index + 1 + (currentPage - 1) * pageSize,
                id: data._id,
                name: data.name,
                createdAt: data.createdAt?.substring(0, 10),
                pictures: data.pictures,
                details: data.details,
                divisionId: data.division?._id || null, 
                divisionName: data.division?.name || null, 
            }));

            setallDistrict(districtsData);
            setdistricts(districtsData);
            setTotalItems(response.data?.data.totalItems || 1000);
        } catch (error) {
            message.error("Failed to fetch districts!");
        } finally {
            setTableLoading(false);
        }
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
        formData.append("divisionId", values.divisionId);

        try {
            const response = await adminInterceptor.post(`/admins/districts/create`, formData);

            if (response.status === 201) {
                message.success("District added successfully!");
                setCreateModalVisible(false);
                getAlldistricts();
                setFileList([])
                createForm.resetFields();
            } else {
                message.error("Failed to add District!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (values) => {
        if (!selectdistrict) return;
        setLoading(true);
        try {
            const response = await adminInterceptor.put(
                `/admins/districts/update-details/${selectdistrict.id}`,
                { name: values.name, details: values.details },

            );
            if (response.status === 200) {
                message.success("District updated successfully!");
                setUpdateDetailsModalVisible(false);
                getAlldistricts();
            } else {
                message.error("Failed to update District details!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = async (values) => {
        if (!selectdistrict) return;

        setLoading(true);
        const formData = new FormData();

        if (values.pictures?.fileList) {
            values.pictures.fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        try {
            const response = await adminInterceptor.put(
                `/admins/districts/add-pictures/${selectdistrict.id}`,
                formData,

            );

            if (response.data) {
                message.success("District images updated successfully!");
                setUpdateImagesModalVisible(false);
                getAlldistrictss();
                setFileList([])
            } else {
                message.error("Failed to update District images!");
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
                `/admins/districts/delete-pictures/${selectdistrict.id}`,
                { picturesToDelete: [item] },

            );

            if (response.status === 200) {
                message.success("District image deleted successfully!");
                getAlldistrictss();
                setDeleteImagesModalVisible(false)
            } else {
                message.error("Failed to delete District image!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error deleting District image. Please try again.");
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
        { title: "Division Name", dataIndex: "divisionName", key: "divisionName" },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button disabled={!canRead} icon={<EyeOutlined />} onClick={() => { setselectdistrict(record); setViewModalVisible(true); }}>View</Button>
                    <Button disabled={!canUpdate} icon={<EditOutlined />} onClick={() => { setselectdistrict(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button disabled={!canUpdate} icon={<PlusOutlined />} onClick={() => { setselectdistrict(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button disabled={!canDelete} icon={<DeleteOutlined />} danger onClick={() => { setselectdistrict(record); setDeleteImagesModalVisible(true); }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: 20 }}>
                <center><h1 style={{ fontSize: 30 }}>Manage Districs</h1></center>
                <Button disabled={!canCreate} type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create Districs</Button>
                <br /><br />
                <DistrictFilter onFilterChange={(provinceId) => setselectedDivisionId(provinceId)} />
                <Table pagination={false} locale={{ emptyText: "No data available" }} loading={tableLoading} columns={columns} dataSource={districts} scroll={{ "x": "100%" }} style={{ marginTop: 20 }} />
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={(page, size) => {
                        if (page < currentPage || districts.length === pageSize) {
                            navigate(`?page=${page}&size=${size}`);
                        } else {
                            message.warning("No more data to display.");
                        }
                    }}
                    showSizeChanger
                    pageSizeOptions={["10", "20", "50", "100", totalItems.toString()]}
                    className="responsive-pagination"
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    hideOnSinglePage={true}
                    showLessItems={true}
                    responsive // ✅ Automatically adjusts layout for smaller screens
                    simple={window.innerWidth < 768} // ✅ Shows compact pagination on small screens
                />
            </div>

            { /* Create Districs Modal */}
            <Modal
                title="Create Districs"
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
                    <Form.Item label="Select a divisions" name="divisionId" rules={[{ required: true, message: "Please select a country!" }]}>
                        <Select placeholder="Select a divisions">
                            {divisions && divisions.map((data) => (
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
            </Modal>

            {/* Update Details Modal */}
            <Modal
                title="Update District"
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
            </Modal>

            {/* Add Images Modal */}
            <Modal
                title="Add District Images"
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
            </Modal>

            {/* View Modal */}
            <Modal
                title="District Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
            >
                {selectdistrict && (
                    <div>
                        <h3>Name: {selectdistrict.name}</h3>
                        <p><strong>Details:</strong> {selectdistrict.details}</p>
                        <h4>Images:</h4>
                        {selectdistrict.pictures?.length > 0 ? (
                            selectdistrict.pictures.map((pic, index) => (
                                <Image key={index} width={200} src={pic} alt={`District ${index}`} />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                )}
            </Modal>


            {/* Delete model  */}
            <Modal
                title="Delete District Images"
                open={deleteImagesModalVisible}
                onCancel={() => setDeleteImagesModalVisible(false)}
                footer={null}
            >
                {selectdistrict?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
                        {selectdistrict.pictures.map((imgUrl, index) => (
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
            </Modal>

        </>
    );
};

export default ManageDistrics;