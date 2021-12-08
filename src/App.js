import "./App.css";
import "antd/dist/antd.css";
import { Row, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "./axios/axios";
import Card from "./components/Card";

function App() {
    // Data to display
    const [data, setData] = useState([]);

    // Showing progress bar
    const [loading, setLoading] = useState(true);

    // Taking inputs from form and updating them
    const [fields, setFields] = useState();
    const [edittingPerson, setEdittingPerson] = useState(-1);

    // For modal opening
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to handle update of information from modal
    const handleOk = () => {
        // setting up new data after update
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
        // closing modal
        setIsModalVisible(false);
    };

    // Function to close modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Get data from api using axios
    useEffect(() => {
        axios({
            mathod: "get",
            url: "/users",
        }).then((response) => {
            // setting only relevant data
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

            // by default loading is true so after getting all data setting it to false
            setLoading(false);
        });
    }, []);

    // Deleting the item
    const handleDelete = (id) => {
        setData(data.filter((value) => value.id !== id));
    };

    return (
        <div className="app">
            {/* if loading display progress bar else display actual content  */}
            {loading ? (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            ) : (
                <div className="app_container">
                    <Row gutter={[16, 24]}>
                        {/* mapping over each item and passing it to card item  */}
                        {data.map((person) => (
                            <Card
                                key={person.id}
                                person={person}
                                setIsModalVisible={setIsModalVisible}
                                setFields={setFields}
                                handleDelete={handleDelete}
                                setEdittingPerson={setEdittingPerson}
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
                            // setting fields default value and on change
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
