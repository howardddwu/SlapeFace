import React from 'react'
import { useState, useEffect, useContext, } from 'react'
import { useNavigate } from "react-router-dom";


import UserProfile from './UserProfile'
import Prophecy from "../../components/Prophecy/Prophecy.js"
import { getData, getUserProphecy,getUserVotedProphecy, sortByParticipated, sortByTime } from '../../API/ProphecyAPI';
import "./Profile.css"
import { AuthContext } from '../../context/AuthProvider';

import {
    IdcardOutlined,
    HomeOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Posts', '1', <FileTextOutlined />),
    getItem('Profile', '2', <IdcardOutlined />),
    getItem('Home', '3', <HomeOutlined />),
];


const Profile = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [postType,setPostType] = useState('posted')

    //======================== Page Decision ==============================
    const [page, setPage] = useState("1")
    const handlePage = ({ item, key, keyPath, domEvent }) => {
        setPage(key)
    }

    useEffect(() => {
        if (page === "3") {
            navigate("/");
        }
    }, [page])

    //======================== Menu UI ==============================
    const [collapsed, setCollapsed] = useState(false);
    const showMenu = () => {
        window.innerWidth <= 910 ? setCollapsed(true) : setCollapsed(false);
    };
    window.addEventListener("resize", showMenu);
    React.useEffect(() => showMenu(), []);



    const [prophecies, setProphecies] = useState([])

    const [sortByCreateTime, setSortByCreateTime] = useState(false)
    // Get All comments from DB
    useEffect(() => {
        
        if(postType==='posted'){
            getUserProphecy(user._id, setProphecies)
            
        }
        else{
            getUserVotedProphecy(user._id, setProphecies)
        }
        
    }, [postType])

    // sort prophecies by created time
    function ByTime() {
        sortByTime(prophecies, setProphecies, setSortByCreateTime)
    }


    return (
        <div className='ProfileContainer'>


            {page === "1" &&
                <div className='ProfileProphecy' style={{ marginBottom: "30px" }}>

                    
                    <div className='postNavigation'>
                        <div onClick={()=>setPostType('posted')}>Posted</div>
                        <div>|</div>
                        <div onClick={()=>setPostType('voted')}>Voted</div>
                    </div>
                    
                    <div>
                        {prophecies.map((item) => (
                            <Prophecy key={item._id} data={item}></Prophecy>
                        ))}
                    </div>
                </div>
            }
            {page === "2" && <UserProfile className='ProfileProphecy' />}



            <div className="ProfileMenuWrapper" >
                <Menu
                    className="ProfileMenu"
                    defaultSelectedKeys={[page]}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={handlePage}
                />
            </div>

        </div>
    )
}

export default Profile



{/* <div style={{ marginBottom: "30px" }}>

<button onClick={ByParticipated}>HOT</button>
<button onClick={ByTime}>NEW</button>
<div>
    {prophecies.map((item) => (
        <Prophecy key={item._id} data={item}></Prophecy>
    ))}
</div>
</div> */}