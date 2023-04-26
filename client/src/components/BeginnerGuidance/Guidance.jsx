import React, { useState, useContext } from 'react';
import { message } from 'antd';
import { topics } from '../../Category';
import UploadPic from '../Upload/Upload';
import * as UserAction from "../../actions/UserAction"
import { AuthContext } from '../../context/AuthProvider';
import "./Guidance.css"



const Guidance = () => {

    const { isFetching, dispatch, user } = useContext(AuthContext);

    //page control:
    const [page, setPage] = useState(1)
    const goToPage = (page) => { setPage(page) }


    //upload profile pic or skip:
    const [userInfo, setUserinfo] = useState(null)



    //select topic:
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleTopicSelection = (event) => {
        const topic = event.target.value;
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    //submit all
    const handleSubmit = async (event) => {
        event.preventDefault();
        const submitData = {
            likedCategory: selectedTopics,
            icon: userInfo,
            notfirstLogin: true
        }
        console.log(submitData);


        let ifErr;
        ifErr = await UserAction.editProfile(submitData, user._id, dispatch)
        if (ifErr) {
            message.error('Something went wrong, please re-login or try later');
        }
        else {
            window.location.reload()
        }
    };


    return (
        <div className='GTopics'>

            {/* {page === 1 && */}
            <div className={`TopicsContainer ${page === 1 ? 'active' : 'inactive'}`}  >

                <p className='TopicsText'>Upload Your Profile Picture:</p>

                <UploadPic userInfo={userInfo} setUserinfo={setUserinfo} />

                <div className='TopicPageContainer'>
                    <div className='TopicPage PageNext'>
                        <button className='button TopicPageBtn' onClick={() => goToPage(2)}>Next / Skip</button>
                    </div>
                </div>

            </div>
            {/* } */}


            {/* {page === 2 && */}

            < div className={`TopicsContainer ${page === 2 ? 'active' : 'inactive'}`}>

                <p className='TopicsText'>Select interesting topics:</p>
                <div className="GuidTopics">
                    {topics.map((topic) => (
                        <div key={topic.name} className='SingleTopic'>

                            <label htmlFor={topic.name} className='TopicInfo'>
                                <img className='TopicPic' src={topic.image} alt={topic.name} />
                                <span className='TopicDesc'>{topic.name}</span>
                                <input
                                    id={topic.name}
                                    type="checkbox"
                                    value={topic.name}
                                    checked={selectedTopics.includes(topic.name)}
                                    onChange={handleTopicSelection}
                                />
                            </label>

                        </div>
                    ))}
                </div>


                <div className='TopicPageContainer'>
                    <div className='TopicPage'>
                        <button className='button TopicPageBtn' onClick={() => goToPage(1)}>Back</button>
                        <button className='button TopicPageBtn' type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>

            </div>
            {/* } */}

        </div >
    );
};

export default Guidance;
