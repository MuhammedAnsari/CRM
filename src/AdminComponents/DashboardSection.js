import React, { Component } from 'react';
import '../Styles/admin.css';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DashboardSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyData: [],
      statusData: [], // State to store status data
    };
  }

  componentDidMount() {
    // Fetch lead data API
    fetch('http://localhost:5000/leads')
      .then((response) => response.json())
      .then((data) => {
        const monthlyData = data.reduce((acc, lead) => {
          const addedAt = new Date(lead.addedAt);
          const monthYear = `${addedAt.toLocaleString('en-us', { month: 'long' })} ${addedAt.getFullYear()}`;
          acc[monthYear] = (acc[monthYear] || 0) + 1;
          return acc;
        }, {});

        // Sort data points by month
        const sortedData = Object.entries(monthlyData).sort(
          (a, b) => new Date(a[0]) - new Date(b[0])
        );

        this.setState({ monthlyData: sortedData });

        // Process status data from the leads
        const statusCounts = data.reduce((statusCounts, lead) => {
          const status = lead.status;
          statusCounts[status] = (statusCounts[status] || 0) + 1;
          return statusCounts;
        }, {});

        const statusData = Object.entries(statusCounts).map(([status, count]) => ({
          y: count,
          label: status,
        }));

        this.setState({ statusData });
      });
  }

  render() {
    const { monthlyData, statusData } = this.state;

    const dataPoints = monthlyData.map(([x, y]) => ({
      label: x,
      y,
    }));

    const leadsChartOptions = {
      theme: 'light2',
      title: {
        text: 'Leads',
      },
      axisX: {
        title: 'Month',
        interval: 1,
        labelAngle: 45,
      },
      axisY: {
        title: 'Number of Leads',
        minimum: 0,
      },
      data: [
        {
          type: 'line',
          yValueFormatString: '0',
          dataPoints: dataPoints,
        },
      ],
    };

    const employeeChartOptions = {
      animationEnabled: true,
      exportEnabled: false,
      theme: 'light1',
      title: {
        text: 'Working Stats',
      },
      data: [
        {
          type: 'doughnut',
          indexLabel: '{label}: {y}',
          startAngle: -90,
          dataPoints: statusData, 
        },
      ],
    };

    return (
      <div>
        <div className='box-section d-flex'>
          <div
            className='dash-box'
            style={{ border: 'solid #2a7ed6 1px' }}
          >
            <div className='box_content'>
              <div className='d-flex align-items-center justify-content-between' style={{ width: '175px' }}>
                <i style={{ backgroundColor: '#e4e9ff', color: '#3c5fff', padding: '8px', fontSize: '18px' }} class="fa-regular fa-user"></i>
                <span style={{ fontWeight: '300', color: 'gray' }}>Employees</span>
              </div>
              <span style={{ color: 'black' }}>6/10</span>
            </div>
          </div>
          <div
            className='dash-box'
            style={{ border: 'solid #cd9215 1px' }}
          >
            <div className='box_content'>
            <div className='d-flex align-items-center justify-content-between' style={{ width: '110px' }}>
                <i style={{ backgroundColor: '#fff8dd', color: '#e2bf39', padding: '8px', fontSize: '18px' }} class="fa-regular fa-hourglass"></i>
                <span style={{ fontWeight: '300', color: 'gray' }}>Leads</span>
              </div>
              <span style={{ color: 'black' }}>10</span>
            </div>
          </div>
          <div
            className='dash-box'
            style={{ border: 'solid #bd4448 1px' }}
          >
            <div className='box_content'>
            <div className='d-flex align-items-center justify-content-between' style={{ width: '194px' }}>
                <i style={{ backgroundColor: '#ffe4f9', color: '#ff22cf', padding: '8px', fontSize: '18px' }} class="fa-regular fa-regular fa-bell"></i>
                <span style={{ fontWeight: '300', color: 'gray' }}>Notifications</span>
              </div>
              <span style={{ color: 'black' }}>2</span>
            </div>
          </div>
        </div>

        <div className='chart_section p-4 d-flex justify-content-between'>
          <div className='leads_chart' style={{ width: '50%' }}>
            <CanvasJSChart options={leadsChartOptions} />
          </div>
          <div className='employee_chart' style={{ width: '40%' }}>
            <CanvasJSChart options={employeeChartOptions} />
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardSection;