// Updated AddHorse.js with enhanced error handling and form validation

// ... existing imports and code

function AddHorse() {
  // ... existing state and functions

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation logic here
    if (!name || !breed || age <= 0 || !medicalDocuments.length) {
      alert('Please fill in all fields correctly.');
      return;
    }

    try {
      // Existing axios POST request code
    } catch (error) {
      alert('Error submitting the form. Please try again.');
    }
  };

  // ... existing JSX
}

export default AddHorse;
