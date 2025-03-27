import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image, Spin, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import adminInterceptor from "../../Api/adminInterceptor";
import usePermission from "../../Hooks/usePermission";
import AreaFilter from "../../Component/Filter/AreaFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
const { TextArea } = Input;
const { Option } = Select;

const ManageArea = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [area, setArea] = useState([]);
    const [allArea, setAllArea] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectArea, setselectArea] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [fileList, setFileList] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [createForm] = Form.useForm();
    const [updateDetailsForm] = Form.useForm();
    const [updateImagesForm] = Form.useForm();

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
        getCity();
        getAllArea();
    }, [currentPage, pageSize, setSelectedCityId]);

    const getCity = async () => {
        try {
            const response = await adminInterceptor.get(`/admins/cities?limit=0`);
            setCity(response.data?.data?.cities);
        } catch (error) {
            message.error("Failed to fetch divisions!");
        }
    };

    // Filter areas when selectedCityId changes
    useEffect(() => {
        if (selectedCityId) {
            // Filter only for UI
            const filteredAreas = allArea.filter(
                (area) => area.cityId === selectedCityId
            );
            setArea(filteredAreas);
        } else {
            setArea(allArea);
        }
    }, [selectedCityId, allArea]);

    const getAllArea = async () => {
        setTableLoading(true);
        setArea([]);
        try {
            const response = await adminInterceptor.get(
                `/admins/areas${selectedCityId ? `/get-by-city/${selectedCityId}` : ""}?skip=${selectedCityId ? 0 : (currentPage - 1) * pageSize}&limit=${selectedCityId ? 0 : pageSize}`
            );

            console.log("API Response:", response.data); // 🔍 Debugging

            const areaData = response.data?.data?.areas?.map((data, index) => ({
                key: index + 1 + (currentPage - 1) * pageSize,
                id: data._id,
                name: data.name,
                createdAt: data.createdAt?.substring(0, 10),
                pictures: data.pictures,
                details: data.details,
                cityId: data.city?._id || null,
                cityName: data.city?.name || "Unknown"
            }));

            // console.log("Formatted Data:", areaData); // ✅ Check if data is correctly formatted

            setAllArea(areaData);
            setArea(areaData);
            setTotalItems(response.data?.data?.totalAreas || 1000);
        } catch (error) {
            message.error("Failed to fetch areas!");
        } finally {
            setTableLoading(false);
        }
    };


    const handleCreate = async (values) => {
        setLoading(true);
        const formData = new FormData();

        if (values.pictures?.fileList) {
            values.pictures.fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        formData.append("name", values.name);
        formData.append("details", values.details);
        formData.append("cityId", values.cityId);

        try {
            const response = await adminInterceptor.post(`/admins/areas/create`, formData);

            if (response.status === 201) {
                message.success("Area added successfully!");
                setCreateModalVisible(false);
                getAllArea();
                setFileList([])
                createForm.resetFields();
            } else {
                message.error("Failed to add Area!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (values) => {
        if (!selectArea) return;
        setLoading(true);
        try {
            const response = await adminInterceptor.put(
                `/admins/areas/update-details/${selectArea.id}`,
                { name: values.name, details: values.details },

            );
            if (response.status === 200) {
                message.success("Area updated successfully!");
                setUpdateDetailsModalVisible(false);
                getAllArea();
            } else {
                message.error("Failed to update Area details!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = async (values) => {
        if (!selectArea) return;

        setLoading(true);
        const formData = new FormData();

        if (fileList) {
            fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        try {
            const response = await adminInterceptor.put(
                `/admins/areas/add-pictures/${selectArea.id}`,
                formData,

            );

            if (response.data) {
                message.success("Area images add successfully!");
                setUpdateImagesModalVisible(false);
                getAllArea();
                setFileList([])
            } else {
                message.error("Failed to add Area images!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating images. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (item) => {
        if (!selectArea) return;
        setDeleteLoading(true);
        try {
            const response = await adminInterceptor.put(
                `/admins/areas/delete-pictures/${selectArea.id}`,
                { picturesToDelete: [item] }

            );

            if (response.status === 200) {
                message.success("Area image deleted successfully!");
                getAllArea();
                setDeleteImagesModalVisible(false)
            } else {
                message.error("Failed to delete Area image!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error deleting Area image. Please try again.");
        } finally {
            setDeleteLoading(false);
        }
    };

    const columns = [
        { title: "No", dataIndex: "key", key: "key",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.key : "_"}
                    </span>
                </>
            )
         },
        { title: "Name", dataIndex: "name", key: "name",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.name : "_"}
                    </span>
                </>
            )
         },
        { title: "City Name", dataIndex: "cityName", key: "cityName",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.cityName : "_"}
                    </span>
                </>
            )
         },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button disabled={!canRead} icon={<EyeOutlined />} onClick={() => { setselectArea(record); setViewModalVisible(true); }}>View</Button>
                    <Button disabled={!canUpdate} icon={<EditOutlined />} onClick={() => { setselectArea(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button disabled={!canUpdate} icon={<PlusOutlined />} onClick={() => { setselectArea(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button disabled={!canDelete} icon={<DeleteOutlined />} danger onClick={() => { setselectArea(record); setDeleteImagesModalVisible(true); }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: 20 }}>
                <center><h1 style={{ fontSize: 30 }}>Manage Area</h1></center>
                <Button disabled={!canCreate} type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create Area</Button>
                <br /><br />
                {canRead && 
                <AreaFilter onFilterChange={(cityId) => setSelectedCityId(cityId)} />}
                <Table locale={{ emptyText: "No data available" }} loading={tableLoading} columns={columns} dataSource={area} pagination={false} scroll={{ "x": "100%" }} style={{ marginTop: 20 }} />
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={(page, size) => {
                        if (page < currentPage || area.length === pageSize) {
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

            { /* Create Area Modal */}
            <Modal
                title="Create Area"
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
                    <Form.Item label="Select a city" name="cityId" rules={[{ required: true, message: "Please select a country!" }]}>
                        <Select placeholder="Select a Area">
                            {city && city.map((data) => (
                                <Option key={data._id} value={data._id}>{data.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload
                            multiple
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                        >
                            <Button icon={<PlusOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form>
            </Modal>

            {/* Update  Modal */}
            <Modal
                title="Update Area"
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
                title="Add Area Images"
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
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
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
                title="Area Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
            >
                {selectArea && (
                    <div>
                        <h3>Name: {selectArea.name}</h3>
                        <p><strong>Details:</strong> {selectArea.details}</p>
                        <h4>Images:</h4>
                        {selectArea.pictures?.length > 0 ? (
                            selectArea.pictures.map((pic, index) => (
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
                title="Delete Area Images"
                open={deleteImagesModalVisible}
                onCancel={() => setDeleteImagesModalVisible(false)}
                footer={null}
            >
                {selectArea?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectArea.pictures.map((imgUrl, index) => (
                            <div key={index} style={{ textAlign: "center", marginLeft: 20 }}>
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

export default ManageArea;