import { useQuery } from "@tanstack/react-query";
import {
    AlertTriangleIcon,
    BellIcon,
    ClockIcon,
    InfoIcon,
    ShieldAlertIcon,
} from "lucide-react";
import { getNotifications } from "../lib/api";

export default function NotificationsList() {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const iconForType = (type) => {
    switch (type) {
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case "alert":
        return <ShieldAlertIcon className="h-5 w-5 text-red-500" />;
      case "system":
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <svg
          className="animate-spin h-8 w-8 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 p-4">Failed to load notifications</div>;
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No notifications found.
      </div>
    );
  }

  return (
    <div >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <BellIcon className="h-6 w-6 text-indigo-600" /> Notifications
      </h2>

      {notifications.map((notif) => (
        <div
          key={notif._id}
          className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm border"
        >
          <div className="mt-1">{iconForType(notif.type)}</div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{notif.title}</h3>
            <p className="text-gray-700 text-sm mt-1">{notif.description}</p>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              {new Date(notif.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
