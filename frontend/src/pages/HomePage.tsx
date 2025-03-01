import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to Task Management</h1>
        <p>Organize your tasks efficiently and boost your productivity</p>
      </section>
      
      <section className="features">
        <div className="feature-grid">
          <div className="feature">
            <h3>Create Tasks</h3>
            <p>Create and organize your tasks with priorities and deadlines.</p>
          </div>
          <div className="feature">
            <h3>Track Progress</h3>
            <p>Monitor your task completion and track your productivity.</p>
          </div>
          <div className="feature">
            <h3>Collaborate</h3>
            <p>Share tasks with team members and collaborate effectively.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;