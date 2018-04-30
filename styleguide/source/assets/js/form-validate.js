$('#test-form').validate({
  rules: {
    textfield: "required",
    dob: "required"
  },
  messages: {
    textfield: "This field is required",
    dob: "Date of birth is required"
  }
})
