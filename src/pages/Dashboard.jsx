import {
  faUserGraduate,
  faChalkboardTeacher,
  faBook,
  faUniversity,
  faMoneyBillAlt,
  faClipboardList,
  faCalendarAlt,
  faBullhorn,
  faBus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const cards = [
    { icon: faUserGraduate, title: "Student Management", link: "/students" },
    { icon: faChalkboardTeacher, title: "Staff Management", link: "/staff" },
    { icon: faBook, title: "Classroom Management", link: "/classes" },
    { icon: faUniversity, title: "Academic Management", link: "/academics" },
    { icon: faMoneyBillAlt, title: "Fees Management", link: "/fees" },
    { icon: faClipboardList, title: "Exam Management", link: "/exams" },
    { icon: faCalendarAlt, title: "Event Management", link: "/events" },
    { icon: faBullhorn, title: "Announcement Management", link: "/announcements" },
    { icon: faBus, title: "Transport Management", link: "/transport" },
  ];

  return (
    <MainLayout>
      <div className="h-full w-full flex flex-col p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link
              to={card.link}
              key={index}
              className="flex flex-col items-center group space-y-6"
            >
              {/* Circle Icon - Bigger version */}
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-400 text-white shadow-xl group-hover:bg-blue-700 transition duration-200">
                <FontAwesomeIcon icon={card.icon} className="text-5xl" />
              </div>

              {/* Text inside rounded rectangle - Bigger version */}
              <div className="px-6 py-3 bg-gray-200 rounded-lg shadow-lg w-full text-center group-hover:bg-blue-100 transition duration-200">
                <p className="text-lg font-semibold text-gray-700 group-hover:text-blue-700">
                  {card.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
