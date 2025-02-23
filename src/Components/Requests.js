
import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import "../Assets/Styles/request.css";

function Requests() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [completedRequests, setCompletedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);

    useEffect(() => {
        const token = UserService.getToken();
        const userId = UserService.getUserId();
        if (token && userId) {
            fetchRequests(userId, "Pending", setPendingRequests);
            fetchRequests(userId, "Completed", setCompletedRequests);
            fetchRequests(userId, "Rejected", setRejectedRequests);
        }
    }, []);

    const fetchRequests = (userId, status, setState) => {
        fetch(`http://localhost:8080/api/exchanges/sender/${userId}/status/${status}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${UserService.getToken()}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setState(data);
                } else {
                    setState([]);
                }
            })
            .catch(error => {
                console.error(`Error fetching ${status} requests:`, error);
                setState([]);
            });
    };

    const renderTable = (requests, title) => (
        <div className="request-section">
            <h2>{title}</h2>
            {requests.length > 0 ? (
                <table className="request-table">
                    <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Sender Item ID</th>
                        <th>Receiver Item ID</th>
                        <th>Receiver ID</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{req.senderitemId}</td>
                            <td>{req.receiverItemId}</td>
                            <td>{req.receiverId}</td>
                            <td>{req.status}</td>
                            <td>{new Date(req.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No {title.toLowerCase()} available.</p>
            )}
        </div>
    );

    return (
        <div>
            <section className="sect-request">
                <h1 className="rq-title">Requests Page</h1>
                {renderTable(pendingRequests, "Pending Requests")}
                {renderTable(completedRequests, "Completed Requests")}
                {renderTable(rejectedRequests, "Rejected Requests")}
            </section>
        </div>
    );
}

export default Requests;
