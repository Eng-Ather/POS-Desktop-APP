let tableBody = document.getElementById("tableBody");

// Function to handle the Add Product modal
document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const addProductModal = document.getElementById("add-product-modal");
  const addProductBtn = document.getElementById("add-product-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const productForm = document.getElementById("product-form");
  const modalOverlay = document.getElementById("modal-overlay");

  // Open modal when Add Product button is clicked
  if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
      addProductModal.classList.add("active");
      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    });
  }

  // Close modal when close button is clicked
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
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
    if (e.key === "Escape" && addProductModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Handle form submission
  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const formData = {
        name: document.getElementById("product-name").value,
        category: document.getElementById("product-category").value,
        stockKG: Number.parseFloat(
          document.getElementById("product-stock").value
        ),
        purchasePrice: Number.parseFloat(
          document.getElementById("purchase-price").value
        ),
        sellingPrice: Number.parseFloat(
          document.getElementById("selling-price").value
        ),
        addedOn: new Date(),
        barcode: document.getElementById("product-barcode").value,
      };

      // Here you would typically send this data to your backend
      console.log("Product data:", formData);
      window.electronAPI.addProduct(formData);
      window.electronAPI.receiveproductResponse((res) => {
        console.log(res);
      });

      // Show success message
      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "block";

      // Hide success message after 3 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
        closeModal();

        // Optional: Reset form
        productForm.reset();
      }, 9000);

    });
  }

  // Function to close the modal
  function closeModal() {
    addProductModal.classList.remove("active");
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scrolling
  }

  // Generate barcode button functionality
  const generateBarcodeBtn = document.getElementById("generate-barcode");
  if (generateBarcodeBtn) {
    generateBarcodeBtn.addEventListener("click", () => {
      // Generate a random SKU/barcode
      const randomSKU = "CW" + Math.floor(Math.random() * 10000);
      document.getElementById("product-barcode").value = randomSKU;
    });
  }

  // Calculate profit margin when prices change
  const purchasePriceInput = document.getElementById("purchase-price");
  const sellingPriceInput = document.getElementById("selling-price");
  const profitMarginSpan = document.getElementById("profit-margin");

  function updateProfitMargin() {
    if (purchasePriceInput && sellingPriceInput && profitMarginSpan) {
      const purchasePrice = Number.parseFloat(purchasePriceInput.value) || 0;
      const sellingPrice = Number.parseFloat(sellingPriceInput.value) || 0;

      if (purchasePrice > 0 && sellingPrice > 0) {
        const profit = sellingPrice - purchasePrice;
        const margin = (profit / sellingPrice) * 100;
        profitMarginSpan.textContent = margin.toFixed(2) + "%";

        // Change color based on margin
        if (margin < 10) {
          profitMarginSpan.className = "margin-low";
        } else if (margin < 20) {
          profitMarginSpan.className = "margin-medium";
        } else {
          profitMarginSpan.className = "margin-high";
        }
      } else {
        profitMarginSpan.textContent = "0.00%";
        profitMarginSpan.className = "";
      }
    }
  }

  if (purchasePriceInput)
    purchasePriceInput.addEventListener("input", updateProfitMargin);
  if (sellingPriceInput)
    sellingPriceInput.addEventListener("input", updateProfitMargin);
});


window.electronAPI.getProducts().then((products) => {
  console.log("All products:", products);

  // Show products in DOM
  // products.forEach((product) => {
  //   const card = document.createElement("div");
  //   card.innerHTML = `
  //     <h3>${product.name}</h3>
  //     <img src="${product.image}" width="100"/>
  //   `;
  //   document.body.appendChild(card);
  // });
  
});