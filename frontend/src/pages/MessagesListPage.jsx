import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useChatContext } from "stream-chat-react";
import { getUserFriends } from "../lib/api";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const MessagesListPage = () => {
  const { client } = useChatContext();
  const { authUser } = useAuthUser();
  const { data: allFriends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const navigate = useNavigate();
  const [channelsCreated, setChannelsCreated] = useState(false);

  useEffect(() => {
    if (!client || !authUser || !allFriends || channelsCreated) return;

    const createChannels = async () => {
      const channelPromises = allFriends.map((friend) => {
        const channelId = [authUser._id, friend._id].sort().join("-");
        const channel = client.channel("messaging", channelId, {
          members: [authUser._id, friend._id],
        });

        return channel.create().catch((err) => {
          if (!err.message.includes("already exists")) {
            console.error("Channel creation error:", err);
          }
        });
      });

      await Promise.all(channelPromises);
      setChannelsCreated(true);
    };

    createChannels();
  }, [client, authUser, allFriends, channelsCreated]);

  if (isLoading || !authUser || !allFriends) return <p>Loading friends...</p>;

  return (
    <main className="container mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your All Friends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allFriends.map((friend) => (
          <div
            key={friend._id}
            onClick={() => {
              const channelId = [authUser._id, friend._id].sort().join("-");
              navigate(`/messages/${channelId}`);
            }}
            className="cursor-pointer bg-base-200 rounded-xl p-4 shadow hover:bg-base-300 transition"
          >
            <div className="font-semibold text-lg">{friend.fullName}</div>
            <p className="text-sm text-gray-500">{friend.username}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MessagesListPage;
