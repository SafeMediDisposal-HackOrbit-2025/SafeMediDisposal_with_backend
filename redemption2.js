let totalPoints = 0;
    let selectedOption = null;
    let selectedPayment = null;
    let redemptionAmount = 0;

    // Load points from previous sessions
    function loadBalance() {
      const counts = JSON.parse(sessionStorage.getItem("wasteCounts") || "{}");
      const pointsMap = {
        glove: 10,
        syringe: 15,
        mask: 8,
        bottle: 12,
        needle: 20
      };

      totalPoints = 0;
      for (let item in counts) {
        const count = counts[item];
        const points = (pointsMap[item] || 5) * count;
        totalPoints += points;
      }

      // Load previously accumulated points
      const savedPoints = parseInt(localStorage.getItem('totalAccumulatedPoints') || '0');
      totalPoints += savedPoints;

      document.getElementById('totalPoints').textContent = totalPoints;
      document.getElementById('totalRupees').textContent = `₹${Math.floor(totalPoints / 10)}`;
    }

    function selectOption(type, minPoints) {
      // Remove previous selections
      document.querySelectorAll('.redemption-option').forEach(opt => {
        opt.classList.remove('selected');
      });

      // Check if user has enough points
      if (totalPoints < minPoints) {
        alert(`You need at least ${minPoints} points for this option. You currently have ${totalPoints} points.`);
        return;
      }

      // Select the option
      event.currentTarget.classList.add('selected');
      selectedOption = type;

      // Handle custom amount
      if (type === 'custom') {
        document.getElementById('customAmount').style.display = 'block';
        document.getElementById('redeemBtn').textContent = 'Enter Custom Amount';
        document.getElementById('redeemBtn').disabled = true;
      } else {
        document.getElementById('customAmount').style.display = 'none';
        redemptionAmount = Math.floor(minPoints / 10);
        updateRedeemButton();
      }
    }

    function updateCustomAmount() {
      const customInput = document.getElementById('customInput');
      const amount = parseInt(customInput.value) || 0;
      const requiredPoints = amount * 10;

      document.getElementById('customPoints').textContent = 
        amount > 0 ? `Requires ${requiredPoints} points` : '';

      if (amount > 0 && requiredPoints <= totalPoints) {
        redemptionAmount = amount;
        updateRedeemButton();
      } else {
        document.getElementById('redeemBtn').disabled = true;
        document.getElementById('redeemBtn').textContent = 
          requiredPoints > totalPoints ? 'Insufficient Points' : 'Enter Valid Amount';
      }
    }

    function updateRedeemButton() {
      const btn = document.getElementById('redeemBtn');
      btn.disabled = false;
      btn.innerHTML = `Redeem ₹${redemptionAmount} <span style="opacity: 0.8;">(${redemptionAmount * 10} points)</span>`;
    }

    function resetSelection() {
      document.querySelectorAll('.redemption-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      document.getElementById('customAmount').style.display = 'none';
      document.getElementById('redeemBtn').disabled = true;
      document.getElementById('redeemBtn').textContent = 'Select Option First';
      selectedOption = null;
      redemptionAmount = 0;
    }

    function showPaymentMethods() {
      const paymentMethodsDiv = document.getElementById('paymentMethods');
      let methodsHTML = '';

      switch(selectedOption) {
        case 'paytm':
          methodsHTML = `
            <div class="payment-method" onclick="selectPayment('paytm-phone')">
              <div class="payment-icon">📱</div>
              <div class="payment-info">
                <h4>Paytm Mobile Number</h4>
                <p>Enter your registered mobile number</p>
              </div>
            </div>
          `;
          break;
        
        case 'upi':
          methodsHTML = `
            <div class="payment-method" onclick="selectPayment('upi-id')">
              <div class="payment-icon">🔗</div>
              <div class="payment-info">
                <h4>UPI ID</h4>
                <p>Enter your UPI ID (e.g., user@paytm)</p>
              </div>
            </div>
          `;
          break;
        
        case 'bank':
          methodsHTML = `
            <div class="payment-method" onclick="selectPayment('bank-account')">
              <div class="payment-icon">🏦</div>
              <div class="payment-info">
                <h4>Bank Account</h4>
                <p>Account number and IFSC code required</p>
              </div>
            </div>
          `;
          break;
        
        case 'gift':
          methodsHTML = `
            <div class="payment-method" onclick="selectPayment('amazon')">
              <div class="payment-icon">📦</div>
              <div class="payment-info">
                <h4>Amazon Gift Card</h4>
                <p>Delivered to your email</p>
              </div>
            </div>
            <div class="payment-method" onclick="selectPayment('flipkart')">
              <div class="payment-icon">🛒</div>
              <div class="payment-info">
                <h4>Flipkart Gift Card</h4>
                <p>Delivered to your email</p>
              </div>
            </div>
          `;
          break;
        
        case 'custom':
          // Use the same payment methods as UPI for custom amounts
          methodsHTML = `
            <div class="payment-method" onclick="selectPayment('upi-id')">
              <div class="payment-icon">🔗</div>
              <div class="payment-info">
                <h4>UPI ID</h4>
                <p>Enter your UPI ID for transfer</p>
              </div>
            </div>
            <div class="payment-method" onclick="selectPayment('paytm-phone')">
              <div class="payment-icon">📱</div>
              <div class="payment-info">
                <h4>Paytm Mobile</h4>
                <p>Enter your registered mobile number</p>
              </div>
            </div>
          `;
          break;
      }

      paymentMethodsDiv.innerHTML = methodsHTML;
      document.getElementById('paymentModal').style.display = 'block';
    }

    function selectPayment(method) {
      document.querySelectorAll('.payment-method').forEach(pm => {
        pm.classList.remove('selected');
      });
      event.currentTarget.classList.add('selected');
      selectedPayment = method;
      document.getElementById('confirmBtn').disabled = false;
      document.getElementById('confirmBtn').textContent = 'Confirm Redemption';
    }

    function processRedemption() {
      // Simulate payment processing
      document.getElementById('confirmBtn').innerHTML = '<span class="loading"></span>Processing...';
      document.getElementById('confirmBtn').disabled = true;

      setTimeout(() => {
        // Deduct points from balance
        const pointsToDeduct = redemptionAmount * 10;
        totalPoints -= pointsToDeduct;
        
        // Save updated points
        localStorage.setItem('totalAccumulatedPoints', totalPoints.toString());
        
        // Update display
        document.getElementById('totalPoints').textContent = totalPoints;
        document.getElementById('totalRupees').textContent = `₹${Math.floor(totalPoints / 10)}`;

        // Show success message
        document.getElementById('successMessage').innerHTML = `
          <p style="text-align: center; margin-bottom: 1rem;">
            <strong>₹${redemptionAmount}</strong> has been successfully redeemed!
          </p>
          <p style="text-align: center; color: var(--gray-600); font-size: 0.9rem;">
            ${pointsToDeduct} points deducted from your account.<br>
            Remaining balance: ${totalPoints} points (₹${Math.floor(totalPoints / 10)})
          </p>
          <div style="background: var(--gray-50); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <strong>Transaction Details:</strong><br>
            Amount: ₹${redemptionAmount}<br>
            Method: ${getPaymentMethodName(selectedPayment)}<br>
            Transaction ID: MW${Date.now().toString().slice(-8)}
          </div>
        `;

        closeModal();
        document.getElementById('successModal').style.display = 'block';
      }, 2000);
    }

    function getPaymentMethodName(method) {
      const names = {
        'paytm-phone': 'Paytm Wallet',
        'upi-id': 'UPI Transfer',
        'bank-account': 'Bank Transfer',
        'amazon': 'Amazon Gift Card',
        'flipkart': 'Flipkart Gift Card'
      };
      return names[method] || 'Selected Method';
    }

    function closeModal() {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
      resetSelection();
      selectedPayment = null;
    }

    // Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
      loadBalance();
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    });