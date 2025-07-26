import { useQuery } from "@tanstack/react-query";
import FriendCard from "../components/FriendCard";
import { getUserFriends } from "../lib/api";

const FriendsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <main className="my-10" style={{ marginInline: "1cm" }}>
      <h1 className="text-2xl font-bold mb-6 cls">Your All Friends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {!isLoading &&
          data.map((friend) => <FriendCard key={friend._id} friend={friend} />)}
      </div>
    </main>
  );
};

export default FriendsPage;
