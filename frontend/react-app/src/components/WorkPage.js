import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import '../components/styles/work.css';
import '../components/styles/modal.css';
import { useRole } from './RoleContext';

const WorkPage = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [reviewDetails, setReviewDetails] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { role } = useRole();

  useEffect(() => {
    axios
      .get(`http://localhost:4040/projects/${id}`)
      .then((response) => {
        setProjectDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching project details:', error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:4040/review/${id}`)
      .then((response) => {
        setReviewDetails(response.data.review);
        setClientDetails(response.data.client);
      })
      .catch((error) => {
        console.error('Error fetching review details:', error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:4040/comment/${id}`)
      .then((response) => {
        setComments(response.data.comments || []);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const handleUpdateProject = () => {
    navigate(`/update-project/${id}`);
  };

  const handleUpdateClient = () => {
    navigate(`/update-client/${id}`);
  };

  const handleUpdateReview = () => {
    const clientId = clientDetails.ID;
    navigate(`/update-review/${id}/${clientId}`);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    if (role !== 'user') {
      alert('Only users can add comments');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4040/comment/${id}`, {
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, response.data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4040/projects/${id}`);
      setIsDeleteModalOpen(true);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const closeDeleteModal = () => {
    navigate('/portfolio');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="work-page">
      <h1 className="page-title">Project Details</h1>
      <div className="main-container">
        <div className="info-container">
          {projectDetails ? (
            <div className="project-container">
              <div className="image-container">
                <img
                  src={`${process.env.PUBLIC_URL}/project_images/project${id}.jpg`}
                  alt={id}
                  className="project-image"
                />
              </div>
              <div className="details-container">
                <h2 className="project-title">{projectDetails.Opis}</h2>
                <p><strong>Deadline:</strong> {projectDetails.Termin}</p>
                <p><strong>Status:</strong> {projectDetails.Status_pr}</p>
                <p><strong>Price:</strong> {projectDetails.Cena} PLN</p>
              </div>
            </div>
          ) : (
            <p>Loading project details...</p>
          )}

          {reviewDetails ? (
            <div className="review-container">
              <h3>Review</h3>
              <p><strong>Requirements Rating:</strong> {reviewDetails.Ocena_wymagan}</p>
              <p><strong>Time Rating:</strong> {reviewDetails.Ocena_czasu}</p>
              <p><strong>Impression:</strong> {reviewDetails.Wrazenie}</p>
            </div>
          ) : (
            <p>Loading review...</p>
          )}

          {clientDetails ? (
            <div className="client-container">
              <h3>Client Details</h3>
              <p><strong>Name:</strong> {clientDetails.Imie} {clientDetails.Nazwisko}</p>
              <p><strong>Contact:</strong> {clientDetails.Kontakt}</p>
            </div>
          ) : (
            <p>Loading client details...</p>
          )}

          {role === 'admin' && (
            <div className="buttons-container">
              <button onClick={handleUpdateProject} className="update-button">Update Project</button>
              <button onClick={handleUpdateClient} className="update-button">Update Client</button>
              <button onClick={handleUpdateReview} className="update-button">Update Review</button>
              <button onClick={handleDelete} className="delete-button">Delete Project</button>
            </div>
          )}
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          <div className="comments-list">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.ID} className="comment-item">
                  <p><strong>{new Date(comment.date_added).toLocaleString()}</strong></p>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
          {role === 'user' && (
            <>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
              />
              <button onClick={handleAddComment} className="add-comment-button">Add Comment</button>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        ariaHideApp={false}
        contentLabel="Project Deleted"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Project Deleted Successfully!</h2>
        <button onClick={closeDeleteModal}>Close</button>
      </Modal>
    </div>
  );
};

export default WorkPage;