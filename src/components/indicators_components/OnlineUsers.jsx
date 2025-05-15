import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useSocket } from '../SocketContext';

const OnlineUsers = () => {
  const { onlineCount } = useSocket(); // ✅ Get it from context
  console.log(" users testing")
  console.log("users count:",onlineCount);
  console.log("users count typeof:",typeof(onlineCount));


  return (
    <div className="online items-center space-x-2 bg-white px-3 py-1 rounded-full shadow text-sm text-gray-700">
      <FontAwesomeIcon icon={faCircle} className="text-green-500" style={{ fontSize: '0.75rem' }} />
      <span className="font-medium" style={{ fontFamily: "Poppins", color: "black" }}>
        Online Users: {onlineCount}
      </span>
    </div>
  );
};

export default OnlineUsers;
