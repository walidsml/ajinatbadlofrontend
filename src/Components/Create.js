import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserService from '../services/UserService';
import "../Assets/Styles/create.css"

import Info from '../Assets/Images/info.svg';


// Assuming UserService is defined elsewhere in your application
// This is a placeholder for the actual implementation


function Create() {
    const [userId, setUserId] = useState(UserService.getUserId());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [preferences, setPreferences] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({type: '', message: ''});

    // Configure axios with auth interceptor
    useEffect(() => {
        // Add a request interceptor
        const interceptor = axios.interceptors.request.use(
            config => {
                const token = UserService.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );


        // Clean up interceptor when component unmounts
        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    useEffect(() => {
        // Create object URLs for preview
        const objectUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviews(objectUrls);

        // Clean up object URLs to avoid memory leaks
        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);


    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles(e.target.files);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback({type: '', message: ''});

        const token = UserService.getToken();
        if (!token) {
            setFeedback({type: 'error', message: 'Authentication token not found. Please log in.'});
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();

        // Make sure to match your backend DTO field names exactly
        const itemData = {
            userId: userId,
            title: title,
            description: description,
            category: category,
            preferences: preferences
        };

        formData.append('item', new Blob([JSON.stringify(itemData)], {type: 'application/json'}));

        // Append each file to formData
        for (let i = 0; i < files.length; i++) {
            formData.append('pictures', files[i]);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log('Item created successfully:', response.data);
            setFeedback({
                type: 'success',
                message: `Item "${response.data.title}" created successfully with ID: ${response.data.id}`
            });

            // Reset form fields
            setUserId('');
            setTitle('');
            setDescription('');
            setCategory('');
            setPreferences('');
            setFiles([]);
            setPreviews([]);


        } catch (error) {
            console.error('Error creating item:', error.response?.data || error.message);
            if (error.response?.status === 401 || error.response?.status === 403) {
                setFeedback({type: 'error', message: 'Authentication failed. Please log in again.'});
            } else {
                setFeedback({
                    type: 'error',
                    message: `Error: ${error.response?.data?.message || error.message}`
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    return (

    <section className="sect">
        <div className="sep">
        </div>

        <h1 className="title-create">Create New Item</h1>

        <div className="create-wrapper">

            <div className="create-form-wrap">
                <div className="container-info ">
                    <img src={Info} className="info-img" alt=""/>
                    <h3 className="InfoToFollow">Info To Follow</h3>
                    <hr/>
                    <h4 className="info-create">&ordm; Title : Pick a Short Obv Title</h4>
                    <hr/>
                    <h4 className="info-create">&ordm; Pictures : Add high Quality Picture</h4>
                    <hr/>
                    <h4 className="info-create">&ordm; Description : Pick a Formal description to describe your item</h4>
                    <hr/>
                    <h4 className="info-create">&ordm; Category : Pick a Category for your item</h4>

                </div>
            </div>

            <div>
                <div className="container">
                    {feedback.message && (
                        <div
                            className={`feedback-message ${feedback.type === 'success' ? 'success' : 'error'}`}>
                            {feedback.message}
                        </div>
                    )}

                    <h1 className="title">Item Form</h1>

                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="input-group">
                            <div className="file-input">
                                <label className="label" htmlFor="pictures">Pictures:</label>
                                <input
                                    id="pictures"
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="input"
                                    accept="image/*"
                                />

                                {previews.length > 0 && (
                                    <div className="preview-container">
                                        {previews.map((src, index) => (
                                            <div key={index} className="preview-item">
                                                <img
                                                    src={src}
                                                    alt={`Preview ${index}`}
                                                    className="preview-image"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="text-inputs">
                                <div className="input-item">
                                    <label className="label" htmlFor="title">Title:</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="textarea-input">
                                <label className="label" htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea"
                                    required
                                />
                            </div>

                            <div className="select-group">
                                <div className="select-item">
                                    <label className="label" htmlFor="category">Category:</label>
                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="input"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Home">Home & Garden</option>
                                        <option value="Sports">Sports & Outdoors</option>
                                        <option value="Books">Books & Media</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="select-item">
                                    <label className="label" htmlFor="preferences">Preferences:</label>
                                    <input
                                        id="preferences"
                                        type="text"
                                        value={preferences}
                                        onChange={(e) => setPreferences(e.target.value)}
                                        className="input"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Item'}
                            </button>
                        </div>
                    </form>


                </div>

            </div>
        </div>


    </section>

    );
}

export default Create;