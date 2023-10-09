import React from 'react';
import '../Styles/admin.css'

function DashboardSection({ name }) {
    return (
      <div>
        <h2>Welcome {name}</h2>
        <div className='box-section'>
          <div className='dash-box employee_nos'></div>
          <div className='dash-box leads_nos'></div>
          <div className='dash-box'></div>
        </div>
      </div>
    );
  }

  export default DashboardSection;