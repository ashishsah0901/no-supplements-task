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
import "./Card.css";

const Person = (props) => {
    // maintaning the state whether liked or not
    const [liked, setLiked] = useState(false);

    // Destructuring props
    const {
        person,
        setIsModalVisible,
        handleDelete,
        setFields,
        setEdittingPerson,
    } = props;

    // Function to show modal
    const showModal = () => {
        // set Defalt values of the feilds
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

        // setting the id of the editting elememt for updating the data
        setEdittingPerson(person.id);

        // hiding theb modal
        setIsModalVisible(true);
    };

    return (
        <Col
            className="gutter-row"
            // setting responsive
            span={
                window.innerWidth > 1200 ? 6 : window.innerWidth > 768 ? 8 : 24
            }
        >
            <Card
                // person image
                cover={
                    <img
                        className="card_image"
                        alt="example"
                        src={person.imageUrl}
                    />
                }
                // icon buttons for like edit and delete
                actions={[
                    // show filled icon when liked and outlined when not
                    !liked ? (
                        <HeartOutlined
                            className="card_iconHeart"
                            onClick={() => setLiked(!liked)}
                        />
                    ) : (
                        <HeartFilled
                            className="card_iconHeart"
                            onClick={() => setLiked(!liked)}
                        />
                    ),
                    <EditOutlined
                        className="card_iconEdit"
                        key="edit"
                        onClick={showModal}
                    />,
                    <DeleteFilled
                        type="message"
                        className="card_iconDelete"
                        theme="outlined"
                        onClick={() => handleDelete(person.id)}
                    />,
                ]}
            >
                {/* meta data which includes name email phone and webite  */}
                <Meta title={person.name} />
                <div className="card_personInfo">
                    <div>
                        <MailOutlined className="card_infoIcon" />
                        <p>{person.email}</p>
                    </div>
                    <div>
                        <PhoneOutlined className="card_infoIcon" />
                        <p>{person.phone}</p>
                    </div>
                    <div>
                        <GlobalOutlined className="card_infoIcon" />
                        <p>{person.website}</p>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default Person;
