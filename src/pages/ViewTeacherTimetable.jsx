import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from '../config';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;

export default function ViewTeacherTimetable() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [teacher, setTeacher] = useState(null);
    const [timetableData, setTimetableData] = useState([]); // Stores the processed teacher timetable
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeacherDetailsAndTimetable = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Fetch the general timetable document to get the teacher's internal ID
            const ttRes = await axios.get(`${API_BASE_URL}api/timetables`, { headers: { auth: AUTH_HEADER } });
            const selectedTTDoc = ttRes.data.find(t => t._id === id);
            
            if (selectedTTDoc && selectedTTDoc.classteacher) {
                // 2. Fetch teacher details using the clasteacher ID
                const staffDetailsRes = await axios.get(`${API_BASE_URL}api/staff/${selectedTTDoc.classteacher}`, { 
                    headers: { auth: AUTH_HEADER } 
                });
                const staffInfo = staffDetailsRes.data;
                setTeacher(staffInfo);

                // 3. Fetch the specific Teacher-formatted timetable using their Staff ID (e.g., STF-...)
                if (staffInfo.staffid) {
                    const teacherTimetableRes = await axios.get(`${API_BASE_URL}api/staff/${staffInfo.staffid}/timetable`, {
                        headers: { auth: AUTH_HEADER }
                    });
                    setTimetableData(teacherTimetableRes.data || []);
                }
            } else {
                throw new Error("Timetable or Class Teacher reference not found.");
            }
        } catch (err) {
            console.error("Error loading view details:", err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTeacherDetailsAndTimetable();
    }, [fetchTeacherDetailsAndTimetable]);

    // Helper to extract the day's class from the row data (Monday -> Mon)
    const getDayClass = (row, day) => {
        const propName = day.substring(0, 3); 
        return row[propName] || '-';
    };

    if (loading) return <MainLayout><div className="p-10 text-center italic text-blue-500">Loading Teacher Timetable...</div></MainLayout>;
    if (error) return <MainLayout><div className="p-10 text-center text-red-500">Error: {error}</div></MainLayout>;

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-8">
                <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline">← Back</button>
                
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Timetable</h2>
                </div>

                {/* Teacher Name Header as per image */}
                <div className="flex items-center gap-8 mb-10 mt-10">
    <span className="text-xl font-semibold text-gray-700 whitespace-nowrap">Full Name </span>
    <div className="flex gap-4">
        <div className="border border-black px-6 py-2 rounded shadow-sm bg-blue-50 min-w-[250px] text-center font-medium">
            {teacher?.firstname || "First Name"}
        </div>
        <div className="border border-black px-6 py-2 rounded shadow-sm bg-blue-50 min-w-[250px] text-center font-medium">
            {teacher?.middlename || "Middle Name"}
        </div>
        <div className="border border-black px-6 py-2 rounded shadow-sm bg-blue-50 min-w-[250px] text-center font-medium">
            {teacher?.lastname || "Last Name"}
        </div>
    </div>
</div>

                <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-blue-100 text-gray-800">
                            <tr>
                                <th className="border border-gray-300 px-4 py-3 text-left font-bold">Timings</th>
                                {daysOfWeek.map(day => (
                                    <th key={day} className="border border-gray-300 px-4 py-3 text-center font-bold">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timetableData.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-gray-400 italic">No schedule found for this teacher.</td>
                                </tr>
                            ) : (
                                timetableData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="border border-gray-300 px-4 py-3 font-bold bg-blue-50 text-blue-900 whitespace-nowrap">
                                            {row.time || 'N/A'}
                                        </td>
                                        {daysOfWeek.map(day => {
                                            const cellContent = getDayClass(row, day);
                                            return (
                                                <td key={`${day}-${idx}`} className="border border-gray-300 px-4 py-3 text-center">
                                                    <span className={cellContent === "-" ? "text-gray-300" : "font-semibold text-blue-700"}>
                                                        {cellContent}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}