document.addEventListener('DOMContentLoaded', () => {
    const colors = {
        primary: '#50c2c9', // Teal color from HealthWaste
        primaryDark: '#028090', // Darker teal for emphasis
        secondary: '#DFE3E8',
        secondary1: '#CADBDB',
        text: '#2C3E50',
        textLight: '#808B96',
        white: '#FFFFFF',
        success: '#27AE60',
        danger: '#E74C3C',
    };

    // Chart 1: Performance and Rewards (Radial Bar)
    const performanceChartOptions = {
        series: [80], // Initial value
        chart: {
            height: 200,
            type: 'radialBar',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '55%',
                },
                dataLabels: {
                    name: { show: false },
                    value: {
                        show: true,
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: colors.text,
                        offsetY: 8,
                        formatter: (val) => `${val}%`,
                    },
                },
                track: {
                    background: colors.secondary,
                    strokeWidth: '97%',
                }
            },
        },
        colors: [colors.primary],
        stroke: { lineCap: 'round' },
        labels: ['Progress'],
    };

    const performanceChart = new ApexCharts(document.querySelector("#performance-chart"), performanceChartOptions);
    performanceChart.render();

    // --- Dynamic functionality for Performance and Rewards Chart ---
    setInterval(() => {
        const newPercentage = Math.floor(Math.random() * 30) + 60; // Random percentage between 60-90
        performanceChart.updateSeries([newPercentage]);

        const growthElement = document.querySelector('.performance-rewards .growth');
        if (growthElement) {
            const randomGrowth = Math.floor(Math.random() * 20) + 10; // Random growth %
            const isPositive = Math.random() > 0.5; // Randomly make it positive or negative
            growthElement.textContent = `Reward growth: ${isPositive ? 'Up' : 'Down'} by ${randomGrowth}% from last month`;
            growthElement.style.color = isPositive ? colors.success : colors.danger;
        }

    }, 3000); // Update every 5 seconds



    // Chart 2: Hospital Engagement (Area Chart)
    const engagementChartOptions = {
        series: [{
            name: 'Active Hospitals',
            data: [120, 150, 100, 280, 250, 480, 430, 400, 410, 350, 320, 280]
        }],
        chart: {
            height: 250,
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2, colors: [colors.primary] },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: { style: { colors: colors.textLight, fontSize: '12px' } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: { style: { colors: colors.textLight, fontSize: '12px' } }
        },
        grid: {
            show: true,
            borderColor: '#EAF0F1',
            strokeDashArray: 4,
        },
        tooltip: {
            theme: 'light',
            x: { show: true },
        },
        markers: {
            size: 5,
            colors: [colors.white],
            strokeColors: colors.primary,
            strokeWidth: 2,
            hover: { size: 7 }
        },
    };

    const engagementChart = new ApexCharts(document.querySelector("#engagement-chart"), engagementChartOptions);
    engagementChart.render();


    // Chart 3: Pickup Fulfillment (Area Chart)
    const fulfillmentChartOptions = {
        series: [{
            name: 'Last Month',
            data: [31, 40, 28, 51, 42, 109, 100, 110]
        }, {
            name: 'This Month',
            data: [11, 32, 45, 32, 34, 52, 41, 60]
        }],
        chart: {
            height: 150, 
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        colors: [colors.secondary, colors.primaryDark],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false }
        },
        yaxis: { show: false },
        grid: { show: false },
        tooltip: { enabled: false },
        legend: { show: false },
    };

    const fulfillmentChart = new ApexCharts(document.querySelector("#fulfillment-chart"), fulfillmentChartOptions);
    fulfillmentChart.render();

    // --- Dynamic functionality for Pickup Fulfillment Chart (Wave Graph) ---
    function updateFulfillmentData() {
        // Simulate new data for the fulfillment chart
        const newLastMonthData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 10);
        const newThisMonthData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 10);

        fulfillmentChart.updateSeries([
            {
                name: 'Last Month',
                data: newLastMonthData
            },
            {
                name: 'This Month',
                data: newThisMonthData
            }
        ]);

        // Also update the total text based on the new 'This Month' data
        const newThisMonthTotal = newThisMonthData.reduce((sum, value) => sum + value, 0);
        document.querySelector('.fulfillment-total h4').textContent = `₹${newThisMonthTotal.toFixed(0)}`;
    }

    // Uncomment the line below to make the fulfillment chart update every 3 seconds
    setInterval(updateFulfillmentData, 3000);


    // --- Dynamic functionality for Pickup Updates (Timeline) ---
    let currentPickupStateIndex = 0;
    const allPickupStates = ['Pickup Scheduled', 'In Transit', 'Waste Disposal'];

    function updatePickupStatus(currentStatus) {
        const steps = document.querySelectorAll('.stepper .step');
        const statuses = ['Pickup Scheduled', 'In Transit', 'Waste Disposal'];

        steps.forEach((step) => {
            const stepContent = step.querySelector('.step-content').textContent;

            step.classList.remove('active', 'completed');

            const statusIndex = statuses.indexOf(stepContent);
            const currentStatusGlobalIndex = statuses.indexOf(currentStatus);

            if (statusIndex < currentStatusGlobalIndex) {
                step.classList.add('completed');
            } else if (statusIndex === currentStatusGlobalIndex) {
                step.classList.add('active');
            }
        });
    }

    updatePickupStatus(allPickupStates[currentPickupStateIndex]);

    // Uncomment the line below to make the timeline advance every 3 seconds
    setInterval(() => {
        currentPickupStateIndex = (currentPickupStateIndex + 1) % allPickupStates.length;
        updatePickupStatus(allPickupStates[currentPickupStateIndex]);
    }, 3000);


    // --- Chart: Waste Distribution by Type (Column Chart) ---
    const distributionChartOptions = {
        series: [{
            name: 'Kilograms',
            data: [34, 25, 20, 9] 
        }],
        chart: {
            height: 250,
            type: 'bar', 
            toolbar: { show: false },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false, 
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Sharps', 'Infectious', 'Hazardous', 'Pharma'],
            labels: {
                style: {
                    colors: colors.textLight,
                    fontSize: '12px'
                }
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            title: {
                text: 'Kilograms (kg)',
                style: {
                    color: colors.textLight
                }
            },
            labels: {
                style: {
                    colors: colors.textLight,
                    fontSize: '12px'
                }
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " kg"
                }
            }
        },
        
        colors: [colors.primaryDark], 
        grid: {
            show: true,
            borderColor: '#EAF0F1',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: false
                }
            }
        },
    };

    const distributionChart = new ApexCharts(document.querySelector("#distribution-chart"), distributionChartOptions);
    distributionChart.render();

    // Simulate new data for the distribution chart
    setInterval(() => {
        const newSharps = Math.floor(Math.random() * 20) + 25;
        const newInfectious = Math.floor(Math.random() * 15) + 15; 
        const newHazardous = Math.floor(Math.random() * 10) + 10; 
        const newPharma = Math.floor(Math.random() * 8) + 5; 

        distributionChart.updateSeries([{
            data: [newSharps, newInfectious, newHazardous, newPharma]
        }]);
    }, 3000); 

});