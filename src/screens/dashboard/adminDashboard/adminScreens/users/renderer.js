// Function to handle the User Management functionality
document.addEventListener("DOMContentLoaded", () => {
  // Select all users checkbox functionality
  const selectAllCheckbox = document.getElementById("select-all-users");
  const userCheckboxes = document.querySelectorAll(".user-select");
  const selectedCountSpan = document.querySelector(".selected-count");

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      userCheckboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
      updateSelectedCount();
    });
  }

  userCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateSelectedCount();

      // Update select all checkbox state
      const allChecked = Array.from(userCheckboxes).every((cb) => cb.checked);
      const someChecked = Array.from(userCheckboxes).some((cb) => cb.checked);

      selectAllCheckbox.checked = allChecked;
      selectAllCheckbox.indeterminate = someChecked && !allChecked;
    });
  });

  function updateSelectedCount() {
    const checkedCount = document.querySelectorAll(
      ".user-select:checked"
    ).length;
    selectedCountSpan.textContent = checkedCount + " users selected";
  }

  // Filter functionality
  const filterBtn = document.querySelector(".filter-btn");
  const resetFilterBtn = document.querySelector(".reset-filter-btn");

  if (filterBtn) {
    filterBtn.addEventListener("click", applyFilters);
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", resetFilters);
  }

  function applyFilters() {
    const roleFilter = document.getElementById("role-filter").value;
    const statusFilter = document.getElementById("status-filter").value;
    const locationFilter = document.getElementById("location-filter").value;

    // Here you would typically filter the data based on the selected filters
    console.log("Applying filters:", {
      roleFilter,
      statusFilter,
      locationFilter,
    });

    // For demonstration purposes, we'll just show an alert
    alert(
      `Filters applied: Role: ${roleFilter}, Status: ${statusFilter}, Location: ${locationFilter}`
    );
  }

  function resetFilters() {
    document.getElementById("role-filter").value = "all";
    document.getElementById("status-filter").value = "all";
    document.getElementById("location-filter").value = "all";

    // Here you would typically reset the table to show all data
    console.log("Filters reset");

    // For demonstration purposes, we'll just show an alert
    alert("Filters have been reset");
  }

  // Action buttons functionality
  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.getAttribute("title");
      const userRow = this.closest("tr");
      const userName = userRow.querySelector(".user-name").textContent;

      // For demonstration purposes, we'll just show an alert
      alert(`${action} for user: ${userName}`);
    });
  });

  // Bulk action buttons functionality
  const bulkButtons = document.querySelectorAll(".bulk-btn");

  bulkButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedUsers = document.querySelectorAll(".user-select:checked");

      if (selectedUsers.length === 0) {
        alert("Please select at least one user");
        return;
      }

      const action = this.classList.contains("activate-btn")
        ? "activate"
        : this.classList.contains("deactivate-btn")
        ? "deactivate"
        : "delete";

      // For demonstration purposes, we'll just show an alert
      alert(`${action} ${selectedUsers.length} selected users`);
    });
  });
});

// Function to handle the User Management functionality
document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const addUserModal = document.getElementById("add-user-modal");
  const addUserBtn = document.getElementById("add-user-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const userForm = document.getElementById("user-form");
  const modalOverlay = document.getElementById("modal-overlay");
  const cancelBtn = document.getElementById("cancel-btn");

  // Open modal when Add User button is clicked
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      addUserModal.classList.add("active");
      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    });
  }

  // Close modal when close button is clicked
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal when cancel button is clicked
  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside the modal
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Close modal when ESC key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && addUserModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Handle form submission
  if (userForm) {
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const formData = {
        fullName: document.getElementById("user-fullname").value,
        username: document.getElementById("user-username").value,
        email: document.getElementById("user-email").value,
        phone: document.getElementById("user-phone").value,
        password: document.getElementById("user-password").value,
        role: document.getElementById("user-role").value,
        location: document.getElementById("user-location").value,
        status: document.getElementById("user-status").value,
        notes: document.getElementById("user-notes").value,
        permissions: getSelectedPermissions(),
      };

      // Here you would typically send this data to your backend
      console.log("User data:", formData);

      // Show success message
      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "block";

      // Hide success message after 2 seconds and close modal
      setTimeout(() => {
        successMessage.style.display = "none";
        closeModal();

        // Optional: Reset form
        userForm.reset();
        resetPasswordStrength();
      }, 2000);
    });
  }

  // Function to close the modal
  function closeModal() {
    addUserModal.classList.remove("active");
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scrolling
  }

  // Function to get selected permissions
  function getSelectedPermissions() {
    const checkboxes = document.querySelectorAll(
      'input[name="permissions"]:checked'
    );
    return Array.from(checkboxes).map((checkbox) => checkbox.value);
  }


  // Select all users checkbox functionality
  const selectAllCheckbox = document.getElementById("select-all-users");
  const userCheckboxes = document.querySelectorAll(".user-select");
  const selectedCountSpan = document.querySelector(".selected-count");

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      userCheckboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
      updateSelectedCount();
    });
  }

  userCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateSelectedCount();

      // Update select all checkbox state
      const allChecked = Array.from(userCheckboxes).every((cb) => cb.checked);
      const someChecked = Array.from(userCheckboxes).some((cb) => cb.checked);

      selectAllCheckbox.checked = allChecked;
      selectAllCheckbox.indeterminate = someChecked && !allChecked;
    });
  });

  function updateSelectedCount() {
    const checkedCount = document.querySelectorAll(
      ".user-select:checked"
    ).length;
    selectedCountSpan.textContent = checkedCount + " users selected";
  }

  // Role-based permission presets
  const roleSelect = document.getElementById("user-role");
  if (roleSelect) {
    roleSelect.addEventListener("change", function () {
      const role = this.value;
      const permissionCheckboxes = document.querySelectorAll(
        'input[name="permissions"]'
      );

      // Reset all permissions
      permissionCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Set permissions based on role
      switch (role) {
        case "admin":
          // Admins get all permissions
          permissionCheckboxes.forEach((checkbox) => {
            checkbox.checked = true;
          });
          break;
        case "manager":
          // Managers get most permissions except user deletion and some admin functions
          permissionCheckboxes.forEach((checkbox) => {
            if (checkbox.value !== "users_delete") {
              checkbox.checked = true;
            }
          });
          break;
        case "cashier":
          // Cashiers get sales permissions and view-only for products
          setPermissionsByValues([
            "sales_view",
            "sales_create",
            "products_view",
            "reports_view",
          ]);
          break;
        case "inventory":
          // Inventory clerks get product and inventory permissions
          setPermissionsByValues([
            "products_view",
            "products_create",
            "reports_view",
          ]);
          break;
      }
    });
  }

  function setPermissionsByValues(permissionValues) {
    const permissionCheckboxes = document.querySelectorAll(
      'input[name="permissions"]'
    );
    permissionCheckboxes.forEach((checkbox) => {
      checkbox.checked = permissionValues.includes(checkbox.value);
    });
  }
});
