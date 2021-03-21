import React from 'react';
import DayCard from './DayCard';
import LogCard from './LogCard';
import WeekCard from './WeekCard';
import '../styles/Layout.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__col"> 
                <DayCard />
                <WeekCard />
            </div>
            <div className="dashboard__col">
                <LogCard />
            </div>
        </div>
    );
}

export default Dashboard;