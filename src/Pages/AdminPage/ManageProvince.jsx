import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Upload, message, Select, Image } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import adminInterceptor from "../../Api/adminInterceptor";
import usePermission from "../../Hooks/usePermission";

const { TextArea } = Input;
const { Option } = Select;
const ManageProvince = () => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateDetailsModalVisible, setUpdateDetailsModalVisible] = useState(false);
    const [updateImagesModalVisible, setUpdateImagesModalVisible] = useState(false);
    const [deleteImagesModalVisible, setDeleteImagesModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [countries, setCountries] = useState('');
    const [fileList,setFileList] = useState([])
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [form] = Form.useForm();
    const [updateDetailsForm] = Form.useForm();
    const [updateImagesForm] = Form.useForm();
    const getAdmin = JSON.parse(localStorage.getItem("admin"));

    let canRead = usePermission("read-operations")
    let canCreate = usePermission("create-operations")
    let canUpdate = usePermission("update-operations")
    let canDelete = usePermission("delete-operations")
    useEffect(() => {
        getCountries();
        getAllProvinces();
    }, []);

    const getCountries = async () => {
        try {
            const response = await adminInterceptor.get(`/admins/country`);
            setCountries(response.data?.data);
        } catch (error) {
            message.error("Failed to fetch countries!");
        }
    };

    const getAllProvinces = async () => {
        setTableLoading(true);
        try {
            const response = await adminInterceptor.get(`/admins/provinces`);
            const provincesData = response.data?.data?.map((data, index) => ({
                key: index + 1,
                id: data._id,
                name: data.name,
                createdAt: data.createdAt?.substring(0, 10),
                pictures: data.pictures,
                details: data.details,
                countryId: data.countryId,
            }));
            setProvinces(provincesData);
        } catch (error) {
            message.error("Failed to fetch provinces!");
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
        formData.append("countryId", values.countryId);

        try {
            const response = await adminInterceptor.post(`/admins/provinces/create`, formData);

            if (response.status === 201) {
                message.success("Province added successfully!");
                setCreateModalVisible(false);
                getAllProvinces();
            } else {
                message.error("Failed to add province!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error submitting data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (values) => {
        if (!selectedProvince) return;

        setLoading(true);
        try {
            const response = await adminInterceptor.put(
                `/admins/provinces/update-details/${selectedProvince.id}`,
                { name: values.name, details: values.details },
               
            );

            if (response.status === 200) {
                message.success("Province details updated successfully!");
                setUpdateDetailsModalVisible(false);
                getAllProvinces();
            } else {
                message.error("Failed to update province details!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error updating data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateImages = async (values) => {
        if (!selectedProvince) return;

        setLoading(true);
        const formData = new FormData();

        if (values.pictures?.fileList) {
            values.pictures.fileList.forEach((file) => {
                formData.append("pictures", file.originFileObj);
            });
        }

        try {
            const response = await adminInterceptor.put(
                `/admins/provinces/add-pictures/${selectedProvince.id}`,
                formData,
               
            );

            if (response.data) {
                message.success("Province images updated successfully!");
                setUpdateImagesModalVisible(false);
                getAllProvinces();
            } else {
                message.error("Failed to update province images!");
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
                `/admins/provinces/delete-pictures/${selectedProvince.id}`,
                { picturesToDelete: [item] },
            );

            if (response.status === 200) {
                message.success("Province image deleted successfully!");
                getAllProvinces();
                setDeleteImagesModalVisible(false)
            } else {
                message.error("Failed to delete province image!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Error deleting province image. Please try again.");
        }
    };

    const columns = [
        { title: "No", dataIndex: "key", key: "key" },
        { title: "Name", dataIndex: "name", key: "name",
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
                    <Button disabled={!canRead} icon={<EyeOutlined />} onClick={() => { setSelectedProvince(record); setViewModalVisible(true); }}>View</Button>
                    <Button disabled={!canUpdate} icon={<EditOutlined />} onClick={() => { setSelectedProvince(record); setUpdateDetailsModalVisible(true); updateDetailsForm.setFieldsValue({ name: record.name, details: record.details }); }}>Update Details</Button>
                    <Button disabled={!canUpdate} icon={<PlusOutlined />} onClick={() => { setSelectedProvince(record); setUpdateImagesModalVisible(true); }}>Add Images</Button>
                    <Button disabled={!canDelete} icon={<DeleteOutlined />} danger onClick={() => { setSelectedProvince(record); setDeleteImagesModalVisible(true); }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: 20 }}>
                <center><h1 style={{ fontSize: 30 }}>Manage Provinces</h1></center>
                <Button disabled={canCreate ? false : true} type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>Create Province</Button>
                <Table locale={{ emptyText: "No data available" }} loading={tableLoading} columns={columns} dataSource={provinces} pagination={{ pageSize: 5 }} scroll={{"x" : "100%"}} style={{ marginTop: 20 }} />
            </div>

            {/* Create Province Modal */}
            <Modal
                title="Create Province"
                open={createModalVisible}
                onCancel={() => setCreateModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Details" name="details" rules={[{ required: true, message: "Please enter details!" }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Country" name="countryId" rules={[{ required: true, message: "Please select a country!" }]}>
                        <Select placeholder="Select a country">
                        <Option key={"2"} value={"67b72539ee82dd269e9c2b40"}>{"pakistan"}</Option>
                            {/* <Option key={countries._id} value={countries._id && countries._id}>{countries.name ? countries.name : "pakistan"}</Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Upload Images" name="pictures">
                        <Upload
                            multiple
                            fileList={fileList}
                            listType="picture-card"
                            beforeUpload={() => false}
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

            {/* Update Details Modal */}
            <Modal
                title="Update Province Details"
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

            {/* Update Images Modal */}
            <Modal
                title="Add Province Images"
                open={updateImagesModalVisible}
                onCancel={() => setUpdateImagesModalVisible(false)}
                footer={null}
            >
                <Form form={updateImagesForm} layout="vertical" onFinish={handleUpdateImages}>
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
                title="Province Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={null}
            >
                {selectedProvince && (
                    <div>
                        <h3>Name: {selectedProvince.name}</h3>
                        <p><strong>Details:</strong> {selectedProvince.details}</p>
                        <h4>Images:</h4>
                        {selectedProvince.pictures?.length > 0 ? (
                            selectedProvince.pictures.map((pic, index) => (
                                <Image key={index} width={200} src={pic} alt={`Province ${index}`} />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                )}
            </Modal>


            {/* Delete model  */}
            <Modal
                title="Delete Province Images"
                open={deleteImagesModalVisible}
                onCancel={() => setDeleteImagesModalVisible(false)}
                footer={null}
            >
                {selectedProvince?.pictures?.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
                        {selectedProvince.pictures.map((imgUrl, index) => (
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

export default ManageProvince;