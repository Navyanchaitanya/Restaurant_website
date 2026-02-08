document.addEventListener('DOMContentLoaded', function() {
  const reservationForm = document.getElementById('reservationForm');
  
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous errors
      clearErrors();
      
      // Validate form
      const isValid = validateForm();
      
      if (isValid) {
        // Simulate form submission
        submitForm();
      }
    });
  }
  
  function validateForm() {
    let isValid = true;
    
    // Required fields
    const requiredFields = ['name', 'email', 'date', 'time', 'guests'];
    
    requiredFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + 'Error');
      
      if (!field.value.trim()) {
        showError(fieldId, 'This field is required');
        isValid = false;
      } else if (fieldId === 'email' && !isValidEmail(field.value)) {
        showError(fieldId, 'Please enter a valid email address');
        isValid = false;
      } else if (fieldId === 'date') {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          showError(fieldId, 'Please select a future date');
          isValid = false;
        }
      }
    });
    
    return isValid;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const field = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    field.classList.add('error');
    
    // Focus on first error field
    if (!document.querySelector('.error:focus')) {
      field.focus();
    }
  }
  
  function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const fields = document.querySelectorAll('.form-group input, .form-group select');
    
    errorElements.forEach(element => {
      element.textContent = '';
      element.classList.remove('show');
    });
    
    fields.forEach(field => {
      field.classList.remove('error');
    });
  }
  
  function submitForm() {
    // In a real application, this would be an AJAX call to a server
    const formData = new FormData(reservationForm);
    const formObject = {};
    
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    console.log('Form data:', formObject);
    
    // Show success message
    const successElement = document.getElementById('formSuccess');
    successElement.style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(() => {
      reservationForm.reset();
      successElement.style.display = 'none';
    }, 3000);
  }
});