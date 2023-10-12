import React, { Component } from 'react';
import '../Styles/admin.css';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = [];

class DashboardSection extends Component {
  componentDidMount() {
    fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          dataPoints.push({
            x: new Date(data[i].x),
            y: data[i].y,
          });
        }
      });
  }

  render() {
    const leadsChartOptions = {
      theme: 'light2',
      title: {
        text: 'Leads',
      },
      data: [
        {
          type: 'line',
          xValueFormatString: 'MMM YYYY',
          yValueFormatString: '#,##0.00',
          dataPoints: dataPoints,
        },
      ],
    };

    const employeeChartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'light1',
      title: {
        text: 'Working Stats',
      },
      data: [
        {
          type: 'pie',
          indexLabel: '{label}: {y}%',
          startAngle: -90,
          dataPoints: [
            { y: 20, label: 'Airfare' },
            { y: 24, label: 'Food & Drinks' },
            { y: 20, label: 'Accommodation' },
            { y: 14, label: 'Transportation' },
            { y: 12, label: 'Activities' },
            { y: 10, label: 'Misc' },
          ],
        },
      ],
    };

    return (
      <div>
        <div className='box-section d-flex'>
          <div
            className='dash-box'
            style={{ backgroundColor: '#3399ff', border: 'solid #2a7ed6 1px' }}
          >
            <div className='box_content'>
              <span style={{ fontWeight: '300' }}>Admins</span>
              <span>4</span>
            </div>
          </div>
          <div
            className='dash-box'
            style={{ backgroundColor: '#f9b115', border: 'solid #cd9215 1px' }}
          >
            <div className='box_content'>
              <span style={{ fontWeight: '300' }}>Employees</span>
              <span>10</span>
            </div>
          </div>
          <div
            className='dash-box'
            style={{ backgroundColor: '#e55353', border: 'solid #bd4448 1px' }}
          >
            <div className='box_content'>
              <span style={{ fontWeight: '300' }}>Leads</span>
              <span>2</span>
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
