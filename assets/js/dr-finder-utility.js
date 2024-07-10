/**
 * @file
 * Dr Finder utility functions.
 */

/** JS for 'Back to Search' button */
function removeParamAndGoBack() {
  window.location = sessionStorage.getItem('searchPath') || '/search';
}

/** JS for 'Clear Filters' button */
function clearFilters() {
  // Get params.
  const params = new URLSearchParams(window.location.search.split("?")[1]);
  // Remove URL params.
  params.delete('specialityGeneralCatCd');
  params.delete('memberStatus');
  params.delete('degreeType');
  // Go to new url.
  window.location = window.location.search.split("?")[0] + '?' + params;
}
