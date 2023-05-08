import { useEffect, useState, useContext } from 'react';

import { Badge, Popconfirm, Pagination, Spin, Empty, Tag, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

import "./Notification.css"
import { AuthContext } from '../../context/AuthProvider';
import Prophecy from '../../components/Prophecy/Prophecy';

import * as SearchAPI from "../../API/SearchAPI";


const Notification = ({ notifications, setUnread, setMsgList, socket }) => {


    const { dispatch, user } = useContext(AuthContext)


    //============================= Pagination =================================
    var numEachPage = 10;
    const [pageSlice, setPageSlice] = useState(
        {
            minValue: 0,
            maxValue: 10,
        }
    )

    const handlePageChange = value => {
        setPageSlice({
            minValue: (value - 1) * numEachPage,
            maxValue: value * numEachPage
        });
    };


    //============================= Loading anime  =================================
    const [loading, setLoading] = useState(false);


    //============================= Notificaion message list  =================================
    const [messages, setMessages] = useState([])

    // sort messages by created time (new msg at front)
    function sortByTime(notifications, setMessages, ifNewFirst) {

        let notificationsList = ifNewFirst ?
            notifications.sort(
                (objA, objB) =>
                    Number(new Date(objA.createdAt)) - Number(new Date(objB.createdAt))
            )
            :
            notifications.sort(
                (objA, objB) =>
                    Number(new Date(objA.createdAt)) - Number(new Date(objB.createdAt))
            ).reverse()
        setMessages(notificationsList)
    }


    async function fetchMessages() {
        try {
            setLoading(true)
            sortByTime(notifications, setMessages, true)
            setLoading(false)

        } catch (error) {
            console.log("fetch messages error:")
            console.log(error)
        }
    };

    //============================= Delete Msg =================================
    const [deleteID, setDeleteID] = useState("");
    const selectDelete = (e) => {
        setDeleteID(e.currentTarget.id);
    }

    const deleteHandler = async (e) => {
        // alert(deletedPageID)
        try {
            setLoading(true)
            //   const result = await PostAPI.deleteMyPosts(deletedPageID)

            //change db data
            // socket.emit('delete-msg', { userId: user._id, deleteID: deleteID });

            //update msg list after deletion
            setMessages(
                () => {
                    var newItems = messages;
                    newItems = newItems.filter(item => item._id !== deleteID)
                    return newItems;
                }
            )
            setLoading(false)

            //update navbar's 
            let unread = messages.filter(item => item._id !== deleteID)
            setUnread(unread.length)

        } catch (error) {
            console.log(error)
        }
    }

    //============================= Mark Msg =================================
    const handleMark = (e) => {
        const markId = (e.currentTarget.id);


        //find target item by getting its index
        var foundIndex = messages.findIndex(item => item._id == markId);
        // rebuild the target item with updated value
        var temp = messages[foundIndex]
        temp.read = !temp.read;
        // find which item should be replaced and replaced with total new item,
        // so that react will rerender that specific item. 
        setMessages((prev) => prev.map((item, index) => (markId == item._id ? temp : item)));

        //change db data
        socket.emit('read-msg', { userId: user._id, msgId: markId, newUpdate: temp });

        //update navbar's 
        let unread = messages.filter((item) => item.read === false)
        setUnread(unread.length)
    }


    //=========================================================================
    useEffect(
        () => {
            console.log("fetch messagae in notification pages: ")
            fetchMessages();
        }, [notifications]
    );


    //======================== open model of a selected prophecy result =====
    const openModal = async (prophecyId) => {
        console.log(prophecyId)
        if (prophecyId) {

            const item = await SearchAPI.SearchProphecyByID(prophecyId)

            console.log(item)

            Modal.info({
                // title: 'Prophecy',
                content: (
                    <Prophecy data={item} />
                ),
                width: 500

                // onOk() {},
            });
        }
    }

    return (
        <div className="NotificationBigcontainer">
            {loading && <div className="spin"><Spin tip="Loading..."> </Spin></div>}
            <div className="NotificationContainer">

                <div className="cardContainer">
                    {messages && messages.length > 0 ?
                        messages.slice(pageSlice.minValue, pageSlice.maxValue).reverse().map((item, index) => (

                            <div className="card" key={index} >

                                <div className="cardTimeWraper">
                                    <span className='cardTime' >{moment(item.createdAt).fromNow()}</span>

                                    <div className="tagWrapper">
                                        <Tag color="gold" style={{ fontSize: "15px" }}>#{item.sender && item.sender}</Tag>
                                        {/* <Tag color="green" style={{ fontSize: "11px" }}>#{item.isLookForJobs ? "SeekJob" : "HaveJob"}</Tag> */}
                                    </div>
                                </div>

                                <hr className="hr-mid-circle" />



                                <div className="titleWrapper">
                                    <span className="cardTitle" onClick={() => openModal(item.prophecyId)} >{item.content} <span className="cardTitleSub" >(Click to view detail)</span></span>

                                    {item.prophecyInfo && <div className="cardInfo">
                                        <div>
                                            <span className="CardFixText">Your Choice: </span>
                                            <span className="">{item.prophecyInfo.yourChoice}</span>
                                        </div>

                                        <div>
                                            <span className="CardFixText">The Result:   </span>
                                            <span className="">{item.prophecyInfo.result}</span>
                                        </div>

                                        {item.prophecyInfo.ifCorrect ?
                                            <span className="CardRightText">Congratulation! You saved your face. </span>
                                            :
                                            <span className="CardWrongText">Woo... Looks like you are wrong. Is your face ok?  </span>
                                        }
                                        {item.prophecyInfo.ifCorrect ?
                                            // <div style="padding-top:80.000%;position:relative;">
                                            <iframe className='CardImg' src="https://gifer.com/embed/5e1" allowFullScreen ></iframe>
                                            // </div>
                                            :
                                            // <img src="" alt="" />
                                            <iframe className='CardImg' src="https://giphy.com/embed/JXuGatu6v9pUA" allowFullScreen></iframe>
                                        }
                                    </div>}
                                </div>


                                <hr className="hr-mid-circle" />


                                {/* mark or delete message  */}
                                <div className="cardCommentWraper">
                                    {item.read ?
                                        <Button id={item._id} onClick={handleMark}>Mark as Unread</Button>
                                        :
                                        <Badge dot={true}>
                                            <Button id={item._id} type="primary" onClick={handleMark}>Mark as read</Button>
                                        </Badge>
                                    }

                                    <Popconfirm
                                        placement="rightBottom"
                                        title={"Are you sure?"}
                                        onConfirm={deleteHandler}
                                        okText="Yes"
                                        cancelText="No"
                                        className="deleteWrapper"
                                    >
                                        <DeleteOutlined twoToneColor="#ff0e0e" className='deleteImg' id={item._id} onClick={selectDelete} />
                                    </Popconfirm>
                                </div>

                            </div>
                        ))
                        :
                        <div className="EmptyWrapper" style={{ alignSelf: "center", marginTop: "20%" }}><Empty /></div>

                    }

                </div>


            </div>

            <Pagination
                defaultCurrent={1}
                onChange={handlePageChange}
                defaultPageSize={10}
                total={messages ? (messages.length) : 0} style={{ marginBottom: "2rem" }} />

        </div>

    );
}

export default Notification