import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCheckIcon } from "lucide-react";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";

const FriendRequests = () => {
  const queryClient = useQueryClient();

  const {
    data: friendRequests = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequest, isLoading: isAccepting } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"]);
      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["notifications"]);
    },
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
      <div className="text-red-600 p-4">Failed to load friend requests.</div>
    );
  }

  const incomingRequests = friendRequests.incomingReqs || [];

  if (incomingRequests.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <UserCheckIcon className="h-5 w-5 text-primary" />
        Friend Requests
        <span className="badge badge-primary ml-2">
          {incomingRequests.length}
        </span>
      </h2>

      <div className="space-y-3">
        {incomingRequests.map((request) => (
          <div
            key={request._id}
            className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar w-14 h-14 rounded-full bg-base-300 overflow-hidden">
                    <img
                      src={request.sender.profilePic}
                      alt={request.sender.fullName}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{request.sender.fullName}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="badge badge-secondary badge-sm">
                        Native: {request.sender.nativeLanguage}
                      </span>
                      <span className="badge badge-outline badge-sm">
                        Learning: {request.sender.learningLanguage}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => acceptRequest(request._id)}
                  disabled={isAccepting}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FriendRequests;
