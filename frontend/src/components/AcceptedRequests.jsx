import { useQuery } from "@tanstack/react-query";
import { BellIcon, ClockIcon, MessageSquareIcon } from "lucide-react";
import { getFriendRequests } from "../lib/api";

const AcceptedRequests = () => {
  const {
    data: friendRequests = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Failed to load accepted friend requests.
      </div>
    );
  }

  const acceptedRequests = friendRequests.acceptedReqs || [];

  if (acceptedRequests.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <BellIcon className="h-5 w-5 text-success" />
        New Connections
      </h2>

      <div className="space-y-3">
        {acceptedRequests.map((notification) => (
          <div key={notification._id} className="card bg-base-200 shadow-sm">
            <div className="card-body p-4">
              <div className="flex items-start gap-3">
                <div className="avatar mt-1 size-10 rounded-full overflow-hidden">
                  <img
                    src={notification.recipient.profilePic}
                    alt={notification.recipient.fullName}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {notification.recipient.fullName}
                  </h3>
                  <p className="text-sm my-1">
                    {notification.recipient.fullName} accepted your friend
                    request
                  </p>
                  <p className="text-xs flex items-center opacity-70">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    Recently
                  </p>
                </div>
                <div className="badge badge-success flex items-center gap-1">
                  <MessageSquareIcon className="h-3 w-3 mr-1" />
                  New Friend
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AcceptedRequests;
