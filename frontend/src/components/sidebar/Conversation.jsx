import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { fullName, profilePic, _id } = conversation;

  const { selectedConversation, setSelectedConversation } = useAuthContext();

  const isSelected = selectedConversation?._id === _id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? 'bg-sky-500' : ''
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
          <div className='w-12 rounded-full'>
            <img src={profilePic} alt={fullName} />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{fullName}</p>
            <span className='text-xl'> {emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;
