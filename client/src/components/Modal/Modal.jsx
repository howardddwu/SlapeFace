import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import Prophecy from '../Prophecy/Prophecy';



const MyModal = ({ isModalOpen, handleOk, handleCancel,  ProphecyData }) => {

    return (
        <div>

            <Modal title="ProphecyData" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Prophecy data={ProphecyData} ifModal={true}/>
            </Modal>

        </div>
    )
}

export default MyModal