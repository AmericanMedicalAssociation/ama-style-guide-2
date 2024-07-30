(function (Drupal) {
    // Define a new behavior for Drupal
    Drupal.behaviors.ama_tableStyling = {
        attach: function (context, settings) {
            // Object to store original data-th values
            var originalDataThValues = {};
            console.log('script loaded');

            // Function to update table headers based on window width
            function updateTableHeaders() {
                console.log('script is here');
                var windowWidth = window.innerWidth; // Get current window width
                var tableCells = document.querySelectorAll('td[data-th]'); // Select all td elements with data-th attribute

                // Iterate over each table cell
                tableCells.forEach(function (cell) {
                    var dataTh = cell.getAttribute('data-th'); // Get the data-th attribute value

                    // If window width is less than 1200px
                    if (windowWidth < 1200) {
                        // Check if data-th contains "Sort ascending" or "Sort descending"
                        if (dataTh.includes('Sort ascending') || dataTh.includes('Sort descending')) {
                            originalDataThValues[cell] = dataTh; // Store the original data-th value
                            var newDataTh = dataTh.replace('Sort ascending', '').replace('Sort descending', '').trim(); // Remove "Sort ascending" and "Sort descending" and trim
                            cell.setAttribute('data-th', newDataTh); // Set the new data-th value
                            cell.setAttribute('data-changed', 'true'); // Mark the cell as changed
                        }
                    } else {
                        // If window width is 1200px or more
                        if (cell.getAttribute('data-changed') === 'true') {
                            cell.setAttribute('data-th', originalDataThValues[cell]); // Restore the original data-th value
                            cell.removeAttribute('data-changed'); // Remove the data-changed attribute
                        }
                    }
                });
            }

            // Add event listeners for load and resize events
            window.addEventListener('load', updateTableHeaders);
            window.addEventListener('resize', updateTableHeaders);
        }
    };
})(Drupal);