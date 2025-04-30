import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2'; // Import Pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Register chart components
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import html2canvas from 'html2canvas'; // Import html2canvas for capturing the chart
import * as XLSX from 'xlsx'; // Import the xlsx library
import { FaUserShield, FaUserTie, FaUserCog, FaHotel, FaUsers, FaChartPie, FaBars } from 'react-icons/fa'; // Import icons for roles and menu items
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './AdminDashboard.css';
import profilePic from '../assets/admin_profile.jpg'; // Corrected to use admin_profile.jpg
import defaultProfilePic from '../assets/default_profile.jpg'; // Import a default profile picture
import logo from '../assets/logo.png'; // Import the website logo

ChartJS.register(ArcElement, Tooltip, Legend); // Register chart components

function AdminDashboard() {
    const navigate = useNavigate();
    const chartRef = useRef(null); // Reference for the chart container
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State for collapsible sidebar

    // Dummy data for hotels
    const hotels = [
        { id: 1, name: 'Hotel Paradise', location: 'Colombo', rating: 4.5 },
        { id: 2, name: 'Ocean View', location: 'Galle', rating: 4.2 },
        { id: 3, name: 'Mountain Retreat', location: 'Kandy', rating: 4.8 },
        { id: 4, name: 'City Lights', location: 'Colombo', rating: 4.0 },
        { id: 5, name: 'Beach Haven', location: 'Trincomalee', rating: 4.6 },
        { id: 6, name: 'Hilltop Resort', location: 'Nuwara Eliya', rating: 4.7 },
        { id: 7, name: 'Jungle Escape', location: 'Yala', rating: 4.3 },
        { id: 8, name: 'Luxury Stay', location: 'Negombo', rating: 4.9 },
        { id: 9, name: 'Cultural Bliss', location: 'Anuradhapura', rating: 4.4 },
        { id: 10, name: 'Serene Lake', location: 'Polonnaruwa', rating: 4.5 },
    ];

    // Predefined names and addresses for generating realistic users
    const names = [
        'John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis', 'Chris Wilson',
        'Sarah Johnson', 'David Lee', 'Sophia Martinez', 'James Anderson', 'Olivia Taylor',
        'Daniel Harris', 'Emma Thomas', 'Matthew Clark', 'Isabella Lewis', 'Ethan Walker',
        'Mia Hall', 'Alexander Allen', 'Charlotte Young', 'William King', 'Amelia Wright',
        'Benjamin Scott', 'Ava Green', 'Lucas Adams', 'Harper Baker', 'Henry Nelson',
        'Ella Carter', 'Jack Mitchell', 'Lily Perez', 'Samuel Roberts', 'Grace Turner',
        'Sebastian Phillips', 'Chloe Campbell', 'Elijah Parker', 'Zoe Evans', 'Logan Edwards',
        'Hannah Collins', 'Mason Stewart', 'Victoria Morris', 'Jacob Rogers', 'Scarlett Reed',
        'Owen Cook', 'Aria Morgan', 'Caleb Bell', 'Layla Murphy', 'Nathan Bailey',
        'Ellie Rivera', 'Ryan Cooper', 'Lillian Richardson', 'Isaac Cox', 'Nora Howard',
        'Gabriel Ward', 'Lucy Brooks', 'Julian Torres', 'Violet Foster', 'Levi Gray',
        'Aurora Hughes', 'Dylan Bryant', 'Penelope Simmons', 'Wyatt Fisher', 'Stella Butler'
    ];

    const addresses = [
        '123 Main St, Colombo', '456 Elm St, Galle', '789 Pine St, Kandy', '321 Oak St, Nuwara Eliya',
        '654 Maple St, Trincomalee', '987 Cedar St, Negombo', '159 Birch St, Anuradhapura',
        '753 Walnut St, Polonnaruwa', '852 Chestnut St, Yala', '951 Spruce St, Colombo'
    ];

    // Generate 60 users dynamically
    const users = Array.from({ length: 60 }, (_, i) => ({
        id: i + 1,
        name: names[i % names.length],
        email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
        phone: `077-${Math.floor(1000000 + Math.random() * 9000000)}`,
        address: addresses[i % addresses.length],
    }));

    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({
        name: '',
        email: '',
        role: 'Moderator',
        phone: '',
        status: 'Active',
        profilePicture: '',
    });
    const [editAdmin, setEditAdmin] = useState(null); // State for editing an admin
    const [activeTab, setActiveTab] = useState('admins'); // Default to "Admin Management"
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const [searchQuery, setSearchQuery] = useState(''); // State to track the search query
    const [showModal, setShowModal] = useState(false); // State to toggle the modal
    const itemsPerPage = 10; // Number of items per page
    const [errors, setErrors] = useState({}); // State to track validation errors
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to toggle delete confirmation modal
    const [deleteTarget, setDeleteTarget] = useState(null); // Store the admin to be deleted
    const [securityKey, setSecurityKey] = useState(''); // State to track the entered security key

    // Fetch admins from the backend
    useEffect(() => {
        fetch('http://localhost:5000/api/admins') // Ensure this matches the backend API endpoint
            .then((res) => res.json())
            .then((data) => setAdmins(data)) // Set the fetched data to the `admins` state
            .catch((err) => console.error('Error fetching admins:', err));
    }, []);

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]{3,}$/; // Full Name: Min 3 characters, no numbers or special characters
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
        const phoneRegex = /^\d{10}$/; // Phone Number: Exactly 10 digits

        const newErrors = {};

        if (!nameRegex.test(newAdmin.name)) {
            newErrors.name = 'Full Name must be at least 3 characters long and contain only letters and spaces.';
        }
        if (!emailRegex.test(newAdmin.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!phoneRegex.test(newAdmin.phone)) {
            newErrors.phone = 'Phone Number must be exactly 10 digits.';
        }
        if (!newAdmin.role) {
            newErrors.role = 'Please select a role.';
        }
        if (!newAdmin.status) {
            newErrors.status = 'Please select a status (Active/Inactive).';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission for adding or editing an admin
    const handleSubmitAdmin = (e) => {
        e.preventDefault();

        // Validate form fields before submitting
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', newAdmin.name);
        formData.append('email', newAdmin.email);
        formData.append('role', newAdmin.role);
        formData.append('phone', newAdmin.phone);
        formData.append('status', newAdmin.status);
        if (newAdmin.profilePicture) {
            formData.append('profilePicture', newAdmin.profilePicture);
        }

        const url = editAdmin ? `http://localhost:5000/api/admins/${editAdmin.id}` : 'http://localhost:5000/api/admins';
        const method = editAdmin ? 'PUT' : 'POST';

        fetch(url, {
            method,
            body: formData,
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        throw new Error(err.message || 'Failed to process request');
                    });
                }
                return res.json();
            })
            .then((data) => {
                if (editAdmin) {
                    setAdmins(admins.map((admin) => (admin.id === data.id ? data : admin)));
                    toast.success('Admin/Moderator updated successfully.'); // Show success toast for edit
                } else {
                    setAdmins([...admins, data]);
                    toast.success('Admin/Moderator added successfully.'); // Show success toast for add
                }
                setEditAdmin(null);
                setNewAdmin({ name: '', email: '', role: 'Moderator', phone: '', status: 'Active', profilePicture: '' });
                setErrors({}); // Clear errors after successful submission
                setShowModal(false);
            })
            .catch((err) => {
                console.error('Error:', err);
                toast.error(`Error: ${err.message}`); // Show error toast
            });
    };

    // Handle admin deletion
    const handleDeleteAdmin = (id, role) => {
        const confirmation = window.confirm(`Are you sure you want to delete this ${role}? For security reasons, you need to enter the security key.`);
        if (confirmation) {
            const securityKey = prompt('Enter the security key to confirm deletion:');
            if (securityKey === 'acer') {
                fetch(`http://localhost:5000/api/admins/${id}`, { method: 'DELETE' })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message === 'Super Admin cannot be deleted') {
                            toast.error(data.message); // Show error toast
                        } else {
                            setAdmins(admins.filter((admin) => admin.id !== id));
                            toast.success('Admin/Moderator deleted successfully.'); // Show success toast
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        toast.error('An error occurred while deleting the admin.'); // Show error toast
                    });
            } else {
                toast.warn('Invalid security key. Deletion canceled.'); // Show warning toast
            }
        }
    };

    // Open modal for editing an admin
    const handleEditAdmin = (admin) => {
        setEditAdmin(admin);
        setNewAdmin({ name: admin.name, email: admin.email, role: admin.role, phone: admin.phone, status: admin.status, profilePicture: admin.profilePicture }); // Populate form with admin details
        setShowModal(true);
    };

    const openDeleteModal = (admin) => {
        setDeleteTarget(admin);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteTarget(null);
        setSecurityKey('');
    };

    const confirmDelete = () => {
        if (securityKey === 'acer') {
            fetch(`http://localhost:5000/api/admins/${deleteTarget.id}`, { method: 'DELETE' })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === 'Super Admin cannot be deleted') {
                        toast.error(data.message); // Show error toast
                    } else {
                        setAdmins(admins.filter((admin) => admin.id !== deleteTarget.id));
                        toast.success('Admin/Moderator deleted successfully.'); // Show success toast for delete
                    }
                    closeDeleteModal();
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('An error occurred while deleting the admin.'); // Show error toast
                });
        } else {
            toast.warn('Invalid security key. Deletion canceled.'); // Show warning toast
        }
    };

    // Filter data based on the active tab and search query
    const filteredData = activeTab === 'hotels'
        ? hotels.filter((hotel) => hotel.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter hotels by name
        : activeTab === 'users'
        ? users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter users by name
        : admins.filter((admin) => admin.name.toLowerCase().includes(searchQuery.toLowerCase())); // Filter admins by name

    // Calculate the data to display based on the current page
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Function to download data as an Excel file
    const downloadExcel = () => {
        let dataToExport;
        let sheetName;

        if (activeTab === 'hotels') {
            dataToExport = hotels;
            sheetName = 'Hotels';
        } else if (activeTab === 'users') {
            dataToExport = users;
            sheetName = 'Users';
        } else if (activeTab === 'admins') {
            dataToExport = admins.map(({ id, name, email, role, phone, status }) => ({
                ID: id,
                Name: name,
                Email: email,
                Role: role,
                Phone: phone,
                Status: status,
            })); // Map admin data to a clean format
            sheetName = 'Admins';
        }

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, `${sheetName}_Data.xlsx`);
    };

    // Data for the pie chart
    const pieChartData = {
        labels: ['Hotels', 'Users', 'Admins'],
        datasets: [
            {
                data: [hotels.length, users.length, admins.length], // Count of hotels, users, and admins
                backgroundColor: ['#6c757d', '#17a2b8', '#ffc107'], // Softer colors for better distinction
                hoverBackgroundColor: ['#5a6268', '#138496', '#e0a800'], // Hover colors
            },
        ],
    };

    // Options for the pie chart
    const pieChartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = pieChartData.labels[tooltipItem.dataIndex];
                        const value = pieChartData.datasets[0].data[tooltipItem.dataIndex];
                        return `${label}: ${value}`;
                    },
                },
            },
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    // Function to download the chart as a PDF
    const downloadChartAsPDF = () => {
        const chartElement = chartRef.current;
        if (!chartElement) return;

        html2canvas(chartElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const timestamp = new Date().toLocaleString(); // Generate a timestamp

            // Add the logo to the PDF
            const logoWidth = 40; // Width of the logo
            const logoHeight = 20; // Height of the logo
            pdf.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight); // Add logo at the top-left corner

            // Add title and timestamp
            pdf.setFontSize(16);
            pdf.text('System Statistics', 10, 40); // Title below the logo
            pdf.setFontSize(10);
            pdf.text(`Generated on: ${timestamp}`, 10, 50); // Add timestamp below the title

            // Add total counts
            pdf.setFontSize(12);
            pdf.text(`Total Hotels: ${hotels.length}`, 10, 60);
            pdf.text(`Total Users: ${users.length}`, 10, 70);
            pdf.text(`Total Admins: ${admins.length}`, 10, 80);

            // Add the chart image
            pdf.addImage(imgData, 'PNG', 10, 90, 190, 100); // Add the chart image below the counts

            // Save the PDF
            pdf.save('System_Statistics.pdf');
        });
    };

    return (
        <div className={`dashboard-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <aside className="sidebar">
                <button
                    className="collapse-btn"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                >
                    <FaBars />
                </button>
                <div
                    className="profile-section"
                    onClick={() => navigate('/profile')} // Navigate to the profile page on click
                    style={{ cursor: 'pointer' }}
                >
                    <div className={`profile-picture-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                        <img
                            src={profilePic} // Use the imported admin profile picture
                            alt="Profile"
                            className={`profile-pic ${isSidebarCollapsed ? 'small' : ''}`} // Adjust size dynamically
                        />
                        <span className="online-status" title="Online">🟢</span> {/* Online status indicator */}
                    </div>
                    {!isSidebarCollapsed && (
                        <>
                            <h3>Ramesh Soyza</h3>
                            <p>Admin</p>
                        </>
                    )}
                </div>
                <nav className="menu">
                    <button
                        className={`menu-item ${activeTab === 'admins' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('admins'); setCurrentPage(1); }}
                    >
                        <FaUserCog className="menu-icon" /> {!isSidebarCollapsed && 'Admin Management'}
                    </button>
                    <button
                        className={`menu-item ${activeTab === 'hotels' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('hotels'); setCurrentPage(1); }}
                    >
                        <FaHotel className="menu-icon" /> {!isSidebarCollapsed && 'Hotels'}
                    </button>
                    <button
                        className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('users'); setCurrentPage(1); }}
                    >
                        <FaUsers className="menu-icon" /> {!isSidebarCollapsed && 'Users'}
                    </button>
                    <button
                        className={`menu-item ${activeTab === 'statistics' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('statistics'); setCurrentPage(1); }}
                    >
                        <FaChartPie className="menu-icon" /> {!isSidebarCollapsed && 'System Statistics'}
                    </button>
                </nav>
                <button className="logout-btn">Logout</button>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>
                        {activeTab === 'admins' && 'Admin Management'}
                        {activeTab === 'hotels' && 'Hotel Management'}
                        {activeTab === 'users' && 'User Management'}
                        {activeTab === 'statistics' && 'System Statistics'}
                    </h1>
                    {activeTab !== 'statistics' && (
                        <div>
                            <button className="add-admin-btn" onClick={() => { setEditAdmin(null); setShowModal(true); }}>
                                {activeTab === 'users' ? 'Add Moderator' : activeTab === 'hotels' ? 'Add Hotel' : 'Add Admin'}
                            </button>
                            <button className="download-btn" onClick={downloadExcel}>Download Excel</button>
                        </div>
                    )}
                </header>
                {activeTab === 'statistics' ? (
                    <div className="statistics-content">
                        <h2>System Statistics</h2>
                        <div ref={chartRef} className="chart-container">
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                        <button className="download-btn" onClick={downloadChartAsPDF}>
                            Download Chart as PDF
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder={`Search ${activeTab === 'hotels' ? 'Hotels' : activeTab === 'users' ? 'Users' : 'Admins'} by Name`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                                className="search-input"
                            />
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    {activeTab === 'hotels' && (
                                        <>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Location</th>
                                            <th>Rating</th>
                                        </>
                                    )}
                                    {activeTab === 'users' && (
                                        <>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                        </>
                                    )}
                                    {activeTab === 'admins' && (
                                        <>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Profile Picture</th>
                                            <th>Actions</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={item.role === 'Super Admin' ? 'super-admin-row' : ''} // Highlight Super Admin row
                                    >
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        {activeTab === 'hotels' && (
                                            <>
                                                <td>{item.location}</td>
                                                <td>{item.rating}</td>
                                            </>
                                        )}
                                        {activeTab === 'users' && (
                                            <>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.address}</td>
                                            </>
                                        )}
                                        {activeTab === 'admins' && (
                                            <>
                                                <td>{item.email}</td>
                                                <td>
                                                    {item.role === 'Super Admin' ? (
                                                        <>
                                                            <FaUserShield title="Super Admin" className="role-icon" /> {item.role}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaUserTie title="Admin/Moderator" className="role-icon" /> {item.role}
                                                        </>
                                                    )}
                                                </td>
                                                <td>{item.phone}</td>
                                                <td>
                                                    <span className={`status-label ${item.status.toLowerCase()}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <img
                                                        src={item.profilePicture ? `http://localhost:5000${item.profilePicture}` : defaultProfilePic} // Use default profile picture if none is uploaded
                                                        alt="Profile"
                                                        className="profile-pic-small"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        className="edit-btn"
                                                        onClick={() => handleEditAdmin(item)}
                                                        disabled={item.role === 'Super Admin'} // Disable Edit for Super Admin
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => openDeleteModal(item)}
                                                        disabled={item.role === 'Super Admin'} // Disable Delete for Super Admin
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>{currentPage} / {totalPages}</span>
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{editAdmin ? 'Edit Admin' : 'Add New Admin'}</h2>
                            <form onSubmit={handleSubmitAdmin}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={newAdmin.name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[a-zA-Z\s]*$/.test(value)) { // Allow only letters and spaces
                                                setNewAdmin({ ...newAdmin, name: value });
                                            }
                                        }}
                                        required
                                    />
                                    {errors.name && <p className="error-message">{errors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newAdmin.email}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                        required
                                    />
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={newAdmin.phone}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                                        required
                                    />
                                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                                </div>
                                <div>
                                    <select
                                        value={newAdmin.role}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Moderator">Moderator</option>
                                    </select>
                                    {errors.role && <p className="error-message">{errors.role}</p>}
                                </div>
                                <div>
                                    <select
                                        value={newAdmin.status}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {errors.status && <p className="error-message">{errors.status}</p>}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewAdmin({ ...newAdmin, profilePicture: e.target.files[0] })}
                                    />
                                </div>
                                <button type="submit" className="add-admin-btn">{editAdmin ? 'Save Changes' : 'Add Admin'}</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Confirm Deletion</h2>
                            <p>Are you sure you want to delete <strong>{deleteTarget?.role}</strong> <strong>{deleteTarget?.name}</strong>? This action cannot be undone.</p>
                            <input
                                type="password"
                                placeholder="Enter security key"
                                value={securityKey}
                                onChange={(e) => setSecurityKey(e.target.value)}
                                className="modal-input"
                            />
                            <div className="modal-actions">
                                <button className="add-admin-btn" onClick={confirmDelete}>Confirm</button>
                                <button className="cancel-btn" onClick={closeDeleteModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            </main>
        </div>
    );
}

export default AdminDashboard;
