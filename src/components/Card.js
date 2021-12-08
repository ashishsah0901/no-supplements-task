import React, { useState } from "react";
import {
    DeleteFilled,
    EditOutlined,
    GlobalOutlined,
    HeartFilled,
    HeartOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { Card, Col } from "antd";

const Person = ({
    person,
    setIsModalVisible,
    handleDelete,
    setFields,
    setEdittingPerson,
    windowWidth,
}) => {
    const [liked, setLiked] = useState(false);

    const showModal = () => {
        setFields([
            {
                name: ["name"],
                value: person.name,
            },
            {
                name: ["email"],
                value: person.email,
            },
            {
                name: ["phone"],
                value: person.phone,
            },
            {
                name: ["website"],
                value: person.website,
            },
        ]);
        setEdittingPerson(person.id);
        setIsModalVisible(true);
    };

    return (
        <Col
            className="gutter-row"
            span={windowWidth > 1200 ? 6 : windowWidth > 768 ? 8 : 24}
        >
            <Card
                cover={
                    <img
                        alt="example"
                        src={person.imageUrl}
                        style={{
                            height: "200px",
                            objectFit: "contain",
                            backgroundColor: "#F5F5F5",
                        }}
                    />
                }
                actions={[
                    !liked ? (
                        <HeartOutlined
                            style={{
                                fontSize: "20px",
                                color: "#FF0000",
                                cursor: "pointer",
                                zIndex: "1",
                            }}
                            onClick={() => setLiked(!liked)}
                        />
                    ) : (
                        <HeartFilled
                            style={{
                                fontSize: "20px",
                                color: "#FF0000",
                            }}
                            onClick={() => setLiked(!liked)}
                        />
                    ),
                    <EditOutlined
                        style={{ fontSize: "18px" }}
                        key="edit"
                        onClick={showModal}
                    />,
                    <DeleteFilled
                        type="message"
                        style={{
                            fontSize: "20px",
                        }}
                        theme="outlined"
                        onClick={() => handleDelete(person.id)}
                    />,
                ]}
            >
                <Meta title={person.name} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        margin: "15px 0 0 0",
                        alignItems: "flex-start",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <MailOutlined
                            style={{
                                fontSize: "16px",
                                marginRight: "10px",
                                alignItems: "center",
                            }}
                        />
                        <p style={{ marginBottom: "3px" }}>{person.email}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <PhoneOutlined
                            style={{
                                fontSize: "16px",
                                marginRight: "10px",
                                alignItems: "center",
                            }}
                        />
                        <p style={{ marginBottom: "3px" }}>{person.phone}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <GlobalOutlined
                            style={{
                                fontSize: "16px",
                                marginRight: "10px",
                                alignItems: "center",
                            }}
                        />
                        <p style={{ marginBottom: "3px" }}>{person.website}</p>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default Person;
