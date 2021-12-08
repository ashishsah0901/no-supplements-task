import "./App.css";
import "antd/dist/antd.css";
import { Row, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import placeholderInstance from "./axios/axios";
import Card from "./components/Card";

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fields, setFields] = useState();
    const [edittingPerson, setEdittingPerson] = useState(-1);
    const [windowWidth, setWindowWidth] = useState(null);

    const handleOk = () => {
        setData(
            data.map((item) =>
                item.id === edittingPerson
                    ? {
                          ...item,
                          name: fields[0].value,
                          email: fields[1].value,
                          phone: fields[2].value,
                          website: fields[3].value,
                      }
                    : item
            )
        );
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        placeholderInstance({
            mathod: "get",
            url: "/users",
        }).then((response) => {
            setData(
                response.data.map((person) => ({
                    id: person.id,
                    name: person.name,
                    email: person.email,
                    website: person.website,
                    phone: person.phone,
                    imageUrl: `https://avatars.dicebear.com/v2/avataaars/${person.username}.svg?options[mood][]=happy`,
                }))
            );
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDelete = (id) => {
        setData(data.filter((value) => value.id !== id));
    };

    return (
        <div
            className="app"
            style={{
                margin: "10px",
                paddingBottom: "10px",
                height: "100%",
                boxSizing: "border-box",
            }}
        >
            {loading ? (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            ) : (
                <div className="app_container">
                    <Row gutter={[16, 24]}>
                        {data.map((person) => (
                            <Card
                                key={person.id}
                                person={person}
                                setIsModalVisible={setIsModalVisible}
                                setFields={setFields}
                                handleDelete={handleDelete}
                                setEdittingPerson={setEdittingPerson}
                                windowWidth={windowWidth}
                            />
                        ))}
                    </Row>
                    <Modal
                        title="Basic Modal"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            autoComplete="off"
                            fields={fields}
                            onFieldsChange={(_, allFields) => {
                                setFields(allFields);
                            }}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Website"
                                name="website"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default App;
