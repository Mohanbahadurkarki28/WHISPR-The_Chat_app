import NotificationsList from "../components/NotificationList";
import AcceptedRequests from "../components/AcceptedRequests";
import FriendRequests from "../components/FriendRequests";

const NotificationsPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-1xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>
        <NotificationsList />

        <FriendRequests />
        <AcceptedRequests />
      </div>
    </div>
  );
};

export default NotificationsPage;
