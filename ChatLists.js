import React, { useEffect } from 'react'


const ChatLists = ({ chats }) => {
    const user = localStorage.getItem('user')
    function SenderChat({ message, username, avatar }) {
        return (
            <div className='chat_sender'>
                <img src={avatar} alt="" />
                <p>
                    <strong>{username}</strong> <br/>
                    {message}
                </p>
            </div>
        )
    }
    function ReceiverChat({ message, username, avatar }) {
        return (
            <div className='chat_receiver'>
                <img src={avatar} alt="" />
                <p>
                    <strong>{username}</strong> <br />
                    {message}
                </p>
            </div>
        )
    }

    return (
        <div className='chats_list'>
            {
                chats.map((chating, index) => {
                    if (chating.user === user) {
                        return <SenderChat
                            key={index}
                            message={chating.message}
                            username={chating.user}
                            avatar={chating.avatar} />
                    }
                    else {
                        return <ReceiverChat
                            key={index}
                            message={chating.message}
                            username={chating.user}
                            avatar={chating.avatar} />
                    }
                })
            }
        </div>
    )
}

export default ChatLists