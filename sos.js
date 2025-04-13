<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reminder App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    #togglePanelBtn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: #4CAF50;
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 24px;
      cursor: pointer;
    }
    .side-panel {
      position: fixed;
      top: 0;
      right: -350px;
      width: 320px;
      height: 100vh;
      background: white;
      padding: 20px;
      box-shadow: -4px 0 20px rgba(0,0,0,0.1);
      transition: right 0.3s ease-in-out;
    }
    .side-panel.open {
      right: 0;
    }
    .reminder-item.done {
      text-decoration: line-through;
      color: gray;
    }
    .reminder-list {
      list-style: none;
      padding: 0;
    }
    .sos-btn {
      position: fixed;
      bottom: 40px;
      left: 40px;
      width: 150px;
      height: 150px;
      background-color: #ff3b30;
      color: white;
      font-size: 1.7em;
      font-weight: bold;
      border: none;
      border-radius: 50%;
      cursor: pointer;
    }
    .location-output {
      position: fixed;
      bottom: 160px;
      left: 40px;
      background: #fff;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
    }
  </style>
</head>
<body>
  <h1>Reminder App</h1>

  <button id="togglePanelBtn">🔔</button>

  <div class="side-panel" id="sidePanel">
    <button id="closePanelBtn">×</button>
    <h2>📝 Reminder</h2>
    <input type="text" id="task" placeholder="Enter task">
    <input type="datetime-local" id="time">
    <button id="setReminder">Set Reminder</button>
    <ul class="reminder-list" id="reminderList"></ul>
  </div>

  <button id="sosButton" class="sos-btn">SOS</button>
  <div id="locationDisplay" class="location-output"></div>

  <script>
    const toggleBtn = document.getElementById('togglePanelBtn');
    const closeBtn = document.getElementById('closePanelBtn');
    const sidePanel = document.getElementById('sidePanel');
    const reminderList = document.getElementById('reminderList');
    const reminders = [];

    toggleBtn.addEventListener('click', () => {
      sidePanel.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
      sidePanel.classList.remove('open');
    });

    document.getElementById('setReminder').addEventListener('click', () => {
      const task = document.getElementById('task').value.trim();
      const time = document.getElementById('time').value;

      if (!task || !time) {
        alert('Please enter both task and time.');
        return;
      }

      const reminderTime = new Date(time).getTime();
      const now = Date.now();

      if (reminderTime <= now) {
        alert('Please choose a future time.');
        return;
      }

      const reminder = { task, time: reminderTime, done: false };
      reminders.push(reminder);
      updateReminderList();

      setTimeout(() => {
        alert(`🔔 Reminder: ${task}`);
        reminder.done = true;
        updateReminderList();
      }, reminderTime - now);

      document.getElementById('task').value = '';
      document.getElementById('time').value = '';
    });

    function updateReminderList() {
      reminderList.innerHTML = '';
      reminders.forEach((reminder) => {
        const li = document.createElement('li');
        li.className = `reminder-item ${reminder.done ? 'done' : ''}`;
        li.textContent = `${reminder.task} - ${new Date(reminder.time).toLocaleString()}`;
        reminderList.appendChild(li);
      });
    }

    document.getElementById('sosButton').addEventListener('click', () => {
      alert("🚨 SOS Activated! Help is on the way.");
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locationDiv = document.getElementById('locationDisplay');
          locationDiv.innerHTML = `
            <strong>📍 Location:</strong><br>
            Latitude: ${lat.toFixed(4)}<br>
            Longitude: ${lon.toFixed(4)}<br>
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">Open in Maps</a>
          `;
        },
        (error) => {
          alert("❌ Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  </script>
</body>
</html>
