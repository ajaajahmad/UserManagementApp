import React from 'react';
const LandingPage = () => {
  return (
    <div>
      <main>
        <section className="text-center mt-5">
          <h1>Welcome to API Testing Platform</h1>
          <p>
            This is a platform where you can test and manage your APIs. 
            Use the login and registration features to interact with the API and explore its capabilities.
          </p>
          <p>
            <a href="/login">Login</a> | <a href="/register">Register</a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;