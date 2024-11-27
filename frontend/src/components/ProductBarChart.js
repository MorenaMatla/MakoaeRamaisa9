// src/components/ProductBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBarChart = ({ products }) => {
    const data = {
        labels: products.map(product => product.name),  // Product names
        datasets: [
            {
                label: 'Product Quantity',
                data: products.map(product => product.quantity), // Corresponding quantities
                backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Bar color white with some transparency
                borderColor: 'rgba(255, 255, 255, 1)',          // Bar border color white
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#ffffff',  // Y-axis labels color white
                },
            },
            x: {
                ticks: {
                    color: '#ffffff',  // X-axis labels color white
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Product Quantity Overview',
                color: '#ffffff',  // Title color white
            },
            legend: {
                labels: {
                    color: '#ffffff', // Legend label color white
                },
            },
        },
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            {/* Background Video */}
            <video
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
                autoPlay
                loop
                
            >
                <source src="/res.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Chart Component */}
            <Bar data={data} options={options} />
        </div>
    );
};

export default ProductBarChart;
