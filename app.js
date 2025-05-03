document.getElementById('download-btn').addEventListener('click', () => {
    const url = document.getElementById('url-input').value;
    const format = document.getElementById('format-select').value;
    const quality = document.getElementById('quality-select').value;
    
    if (!url) {
      updateStatus('Please enter a YouTube URL', 'error');
      return;
    }
    
    updateStatus('Processing...', 'info');
    
    // In a real app, you would call your backend API here
    // This is just a mock implementation
    setTimeout(() => {
      updateStatus('Download started!', 'success');
      addToDownloadsList(url, format, quality);
    }, 2000);
  });
  
  function updateStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = type;
  }
  
  function addToDownloadsList(url, format, quality) {
    const downloadsList = document.getElementById('downloads-list');
    const item = document.createElement('div');
    item.className = 'download-item';
    item.innerHTML = `
      <p>${extractVideoId(url)}</p>
      <p>Format: ${format.toUpperCase()} | Quality: ${quality}</p>
      <progress value="0" max="100"></progress>
    `;
    downloadsList.prepend(item);
    
    // Simulate download progress
    const progress = item.querySelector('progress');
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 5;
      progress.value = progressValue;
      if (progressValue >= 100) clearInterval(interval);
    }, 200);
  }
  
  function extractVideoId(url) {
    // Basic URL parsing - in a real app you'd need more robust parsing
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }