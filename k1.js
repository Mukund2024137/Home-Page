const toggleBtn = document.getElementById('togglePanelBtn');
const closeBtn = document.getElementById('closePanelBtn');
const sidePanel = document.getElementById('sidePanel');
const reminderList = document.getElementById('reminderList');
const reminders = [];

// Show Panel
toggleBtn.addEventListener('click', () => {
  sidePanel.classList.add('open');
});

// Hide Panel
closeBtn.addEventListener('click', () => {
  sidePanel.classList.remove('open');
});

// Set Reminder
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

  // Clear input
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

// SOS Button
document.getElementById('sosButton').addEventListener('click', () => {
  alert("🚨 SOS Activated! Help is on the way.");
});

// Get current location
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
