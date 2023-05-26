/**
 * @file
 * Dr Finder utility functions.
 */

/** JS for 'Back to Search' button */
function removeParamAndGoBack() {
  // Get params.
  const params = new URLSearchParams(document.referrer.split("?")[1]);
  // Remove page param, so we go back to the beginning if we've scrolled.
  params.delete('page');
  // Redirect to previous page without page param.
  window.location = document.referrer.split("?")[0] + '?' + params;
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
