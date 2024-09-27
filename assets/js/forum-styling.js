(function (Drupal) {

    // Define a new behavior for Drupal
    Drupal.behaviors.ama_tableStyling = {
        attach: function (context, settings) {

            // Object to store original data-th values
            var originalDataThValues = {};

            // Function to update table headers based on window width
            function updateTableHeaders() {

                // Get current window width
                var windowWidth = window.innerWidth;

                // Select all td elements with data-th attribute
                var tableCells = document.querySelectorAll('td[data-th]');

                // Iterate over each table cell
                tableCells.forEach(function (cell) {
                    var dataTh = cell.getAttribute('data-th'); // Get the data-th attribute value

                    // If window width is less than 1200px
                    if (windowWidth < 1200) {

                        // Check if data-th contains "Sort ascending" or "Sort descending"
                        if (dataTh.includes('Sort ascending') || dataTh.includes('Sort descending')) {

                            // Store the original data-th value
                            originalDataThValues[cell] = dataTh;
                            // Remove "Sort ascending" and "Sort descending" and trim
                            var newDataTh = dataTh.replace('Sort ascending', '').replace('Sort descending', '').trim();
                            if(newDataTh === 'Item Type by Item Type') {
                                newDataTh = 'Item Type';
                            }
                            if(newDataTh === 'Item Types by Item Types') {
                                newDataTh = 'Item Types';
                            }
                            if(newDataTh === 'Comment by Comment') {
                                newDataTh = 'Comment';
                            }
                            if(newDataTh === 'Comments by Comments') {
                                newDataTh = 'Comments';
                            }
                            if(newDataTh === 'Recent by Recent') {
                                newDataTh = 'Recent';
                            }
                            // Set the new data-th value
                            cell.setAttribute('data-th', newDataTh);

                            // Mark the cell as changed
                            cell.setAttribute('data-changed', 'true');
                        }
                    } else {

                        // If window width is 1200px or more
                        if (cell.getAttribute('data-changed') === 'true') {

                            // Restore the original data-th value
                            cell.setAttribute('data-th', originalDataThValues[cell]);

                            // Remove the data-changed attribute
                            cell.removeAttribute('data-changed');
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
