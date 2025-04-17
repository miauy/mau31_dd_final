// You can add any client-side JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Example: Add confirmation for delete actions
    const deleteForms = document.querySelectorAll('form[action*="/delete/"]');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!confirm('Are you sure you want to delete this item?')) {
                e.preventDefault();
            }
        });
    });
});