import React from 'react';
import './App.css';
import { useQuery } from 'urql';


function App() {
  const projectId = '5e4f5899d64a57009b000bc8'
  const snapshotId = '5e4f589a83434e000100583f'
  const [{fetching, data, error}] = useQuery({
    query: `
      {
        project(projectId: "${projectId}", snapshotId: "${snapshotId}"){
          id
          name
          grade
        }
      }
    `
  });

  return (
    
    <div className='App'>
      <h1>Mission Control</h1>
    {fetching ? <div>Loading...</div> :
        <div className='App-projects'>
          <h2>Projects:</h2>
          <div className='App-data'>
          {/* {JSON.stringify({fetching, data, error}, null, 2)} */}
          <p>Id: <span>{data.project.id}</span></p>
          <p>Name: <span>{data.project.name}</span></p>
          <p>Grade: <span id='Grade'>{data.project.grade}</span></p>
          </div>
        </div>
    }

    </div>
  );
}

export default App;
