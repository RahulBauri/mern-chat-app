import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://mern-chat-app-prod-6kj0.onrender.com/api/messages/${selectedConversation._id}`,
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
