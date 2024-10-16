async function loadMetrics() {
    try {
        const response = await fetch('list.csv');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.text();
        const rows = data.split('\n');

        const metricSelect = document.getElementById('metriselect');

      
        rows.forEach(row => {
            const options = row.split(','); 
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.trim();
                opt.textContent = option.trim();
                metricSelect.appendChild(opt); 
            });
        });

     
        $(metricSelect).select2();
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
    }
}


loadMetrics();
