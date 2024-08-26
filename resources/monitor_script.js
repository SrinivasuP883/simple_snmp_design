
// ==========================================================================================================================



// let lastFetchTime = null; // Variable to store the last fetch time

// function updateButtonColors(data) {

//     // Update button 1
//     const bt1 = document.getElementById('bt1');
//     const value1 = data['1.3.6.1.4.1.29686.1.1.4.1.2.0'];
//     if (value1 === '0') {
//         bt1.style.backgroundColor = 'green';
//     } else if (value1 === '1') {
//         bt1.style.backgroundColor = 'red';
//     } else {
//         bt1.style.backgroundColor = 'grey';
//     }

//     // Update button 2
//     const bt2 = document.getElementById('bt2');
//     const value2 = data['1.3.6.1.4.1.29686.1.1.5.1.3.0'];
//     if (value2 === '0') {
//         bt2.style.backgroundColor = 'green';
//     } else if (value2 === '1') {
//         bt2.style.backgroundColor = 'red';
//     } else {
//         bt2.style.backgroundColor = 'grey';
//     }

//     // Update button 3
//     const bt3 = document.getElementById('bt3');
//     const value3 = data['1.3.6.1.4.1.29686.1.1.5.1.4.0'];
//     if (value3 === '0') {
//         bt3.style.backgroundColor = 'green';
//     } else if (value3 === '1') {
//         bt3.style.backgroundColor = 'red';
//     } else {
//         bt3.style.backgroundColor = 'grey';
//     }

//     // Update button 4
//     const bt4 = document.getElementById('bt4');
//     const value4 = data['1.3.6.1.4.1.29686.1.1.3.1.4.0'];
//     if (value4 === '0') {
//         bt4.style.backgroundColor = 'green';
//     } else if (value4 === '1') {
//         bt4.style.backgroundColor = 'red';
//     } else {
//         bt4.style.backgroundColor = 'grey';
//     }

//     // Update button 5
//     const bt5 = document.getElementById('bt5');
//     const value5 = data['1.3.6.1.4.1.29686.1.1.3.1.5.0'];
//     if (value5 === '0') {
//         bt5.style.backgroundColor = 'green';
//     } else if (value5 === '1') {
//         bt5.style.backgroundColor = 'red';
//     } else {
//         bt5.style.backgroundColor = 'grey';
//     }

//     // Update button 6
//     const bt6 = document.getElementById('bt6');
//     const value6 = data['1.3.6.1.4.1.29686.1.1.3.1.6.0'];
//     if (value6 === '0') {
//         bt6.style.backgroundColor = 'green';
//     } else if (value6 === '1') {
//         bt6.style.backgroundColor = 'red';
//     } else {
//         bt6.style.backgroundColor = 'grey';
//     }

    
//     // Update button 7
//     const bt7 = document.getElementById('bt7');
//     const value7 = data['1.3.6.1.4.1.29686.1.1.3.1.9.0'];
//     if (value7 === '0') {
//         bt7.style.backgroundColor = 'green';
//     } else if (value7 === '1') {
//         bt7.style.backgroundColor = 'red';
//     } else {
//         bt7.style.backgroundColor = 'grey';
//     }


//      // Update button 8
//      const bt8 = document.getElementById('bt8');
//      const value8 = data['1.3.6.1.4.1.29686.1.1.3.1.7.0'];
//      if (value8 === '0') {
//          bt8.style.backgroundColor = 'green';
//      } else if (value8 === '1') {
//          bt8.style.backgroundColor = 'red';
//      } else {
//          bt8.style.backgroundColor = 'grey';
//      }

//    // Update button 9
//    const bt9 = document.getElementById('bt9');
//    const value9 = data['1.3.6.1.4.1.29686.1.1.3.1.8.0'];
//    if (value9 === '0') {
//     bt9.style.backgroundColor = 'green';
//    } else if (value9 === '1') {
//     bt9.style.backgroundColor = 'red';
//    } else {
//     bt9.style.backgroundColor = 'grey';
//    }
   

//    // Update button 10
//    const bt10 = document.getElementById('bt10');
//    const value10 = data['1.3.6.1.4.1.29686.1.1.3.1.2.0'];
//    if (value10 === '0') {
//     bt10.style.backgroundColor = 'green';
//    } else if (value10 === '1') {
//     bt10.style.backgroundColor = 'red';
//    } else {
//     bt10.style.backgroundColor = 'grey';
//    }
    

// }

// function updateCurrentTime() {
//     if (!lastFetchTime) return; // Do nothing if no fetch time is available

//     // Use the stored fetch time
//     const now = lastFetchTime;

//     // Get date components
//     const day = now.getDate().toString().padStart(2, '0');
//     const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//     const year = now.getFullYear();

//     // Get time components
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     const seconds = now.getSeconds().toString().padStart(2, '0');

//     // Format the date and time
//     const dateString = `${day}/${month}/${year}`;
//     const timeString = `${hours}:${minutes}:${seconds}`;
    
//     // Update the DOM element with date and time
//     document.getElementById('current-time').textContent = `${dateString} ${timeString}`;
// }

// function fetchData() {
//     fetch('write.txt')
//         .then(response => response.text())
//         .then(text => {
//             const lines = text.split('\n');
//             const data = {};
//             lines.forEach(line => {
//                 const [oid, value] = line.split(' : ').map(str => str.trim());
//                 if (oid && value) {
//                     data[oid] = value;
//                 }
//             });

//             if (Object.keys(data).length > 0) {
//                 // Data is not empty
//                 updateButtonColors(data);
                
//                 // Update fetch time
//                 lastFetchTime = new Date();
//             }

//             // Update the displayed time with the last fetch time
//             updateCurrentTime();
//             updateButtonColors(data);
            
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// // Fetch data every 10 seconds
// setInterval(fetchData, 10000);

// // Initial fetch
// fetchData();

// const offline = document.getElementById('offline');
// offline.style.backgroundColor = 'grey';

// const online = document.getElementById('online');
// online.style.backgroundColor = 'green';

// bt1.style.backgroundColor = 'grey';
// bt2.style.backgroundColor = 'grey';
// bt3.style.backgroundColor = 'grey';
// bt4.style.backgroundColor = 'grey';
// bt5.style.backgroundColor = 'grey';
// bt6.style.backgroundColor = 'grey';
// bt7.style.backgroundColor = 'grey';
// bt8.style.backgroundColor = 'grey';
// bt9.style.backgroundColor = 'grey';
// bt10.style.backgroundColor = 'grey';


let lastFetchTime = null; // Variable to store the last fetch time

function updateButtonColors(data) {
    // List of button IDs and their corresponding OIDs
    const buttonConfigs = [
        // { id: 'bt1', oid: '1.3.6.1.4.1.29686.1.1.4.1.2.0' },
        { id: 'bt1', oid: '1.3.6.1.2.1.1.7.0' },
        { id: 'bt2', oid: '1.3.6.1.4.1.29686.1.1.5.1.3.0' },
        { id: 'bt3', oid: '1.3.6.1.4.1.29686.1.1.5.1.4.0' },
        { id: 'bt4', oid: '1.3.6.1.4.1.29686.1.1.3.1.4.0' },
        { id: 'bt5', oid: '1.3.6.1.4.1.29686.1.1.3.1.5.0' },
        { id: 'bt6', oid: '1.3.6.1.4.1.29686.1.1.3.1.6.0' },
        { id: 'bt7', oid: '1.3.6.1.4.1.29686.1.1.3.1.9.0' },
        { id: 'bt8', oid: '1.3.6.1.4.1.29686.1.1.3.1.7.0' },
        { id: 'bt9', oid: '1.3.6.1.4.1.29686.1.1.3.1.8.0' },
        { id: 'bt10', oid: '1.3.6.1.4.1.29686.1.1.3.1.2.0' }
    ];

    buttonConfigs.forEach(({ id, oid }) => {
        const button = document.getElementById(id);
        const value = data[oid];
        if (value === '0' || value == '76') {
            button.style.backgroundColor = 'green';
        } else if (value === '1') {
            button.style.backgroundColor = 'red';
        } else {
            button.style.backgroundColor = 'grey';
        }
    });
}

function updateCurrentTime() {
    if (!lastFetchTime) return; // Do nothing if no fetch time is available

    // Use the stored fetch time
    const now = lastFetchTime;

    // Get date components
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();

    // Get time components
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Format the date and time
    const dateString = `${day}/${month}/${year}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Update the DOM element with date and time
    document.getElementById('current-time').textContent = `${dateString} ${timeString}`;
}

function warning_hide() {
    const warningElement = document.getElementById('warning');
    if (warningElement) {
        warningElement.style.display = 'none';

        const label = document.getElementById('online_offline_label');
        const button = document.getElementById('online_offline');

         // Update label and button styles for the "ONLINE" state
         label.innerHTML = '<strong>ONLINE</strong>';
         button.style.backgroundColor = 'green'; // Change button color to green
    }
}

function warning_show() {
    const warningElement = document.getElementById('warning');
    if (warningElement) {
        warningElement.style.display = 'block';

        const label = document.getElementById('online_offline_label');
        const button = document.getElementById('online_offline');
        // Update label and button styles for the "OFFLINE" state
        label.innerHTML = '<strong>OFFLINE</strong>';
        button.style.backgroundColor = 'grey'; // Change button color to red
    }
}

function fetchData() {
    fetch('write.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n');
            const data = {};
            lines.forEach(line => {
                const [oid, value] = line.split(' : ').map(str => str.trim());
                if (oid && value) {
                    data[oid] = value;
                }
            });

            if (Object.keys(data).length > 0) {
                // Data is not empty
                updateButtonColors(data);
                lastFetchTime = new Date();
                updateCurrentTime(); // Update the displayed time with the last fetch time
                warning_hide(); // Hide the warning
            } else {
                warning_show(); // Show warning if data is empty
                updateButtonColors(data);

            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            warning_show(); // Show warning if there was an error
        });
}

// Fetch data every 10 seconds
setInterval(fetchData, 10000);

// Initial fetch
fetchData();

// Ensure the elements exist before manipulating them
document.addEventListener('DOMContentLoaded', () => {
    const offline = document.getElementById('offline');
    if (offline) offline.style.backgroundColor = 'grey';

    const online = document.getElementById('online');
    if (online) online.style.backgroundColor = 'green';

    const buttonConfigs = [
        'bt1', 'bt2', 'bt3', 'bt4', 'bt5', 'bt6', 'bt7', 'bt8', 'bt9', 'bt10'
    ];

    buttonConfigs.forEach(id => {
        const button = document.getElementById(id);
        if (button) button.style.backgroundColor = 'grey';
    });

    // Initially show warning if data is not available
    warning_show();
});