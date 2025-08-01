const pointsMap = {
      glove: 10,
      syringe: 15,
      mask: 8,
      bottle: 12,
      needle: 20
    };

    const counts = JSON.parse(sessionStorage.getItem("wasteCounts") || "{}");
    const scoreBoard = document.getElementById("scoreBoard");

    // Simulate loading for better UX
    setTimeout(() => {
      if (Object.keys(counts).length === 0) {
        scoreBoard.innerHTML = `
          <div class="no-data">
            No waste detection data found. Please detect waste items first to see your score.
          </div>
          <div class="button-container">
            <button class="btn-secondary" onclick="window.location.href='detection2.html'">
              🔍 Start Detection
            </button>
          </div>
        `;
      } else {
        let totalPoints = 0;
        let breakdownHTML = "";
        let itemCount = 0;

        for (let item in counts) {
          const count = counts[item];
          const points = (pointsMap[item] || 5) * count;
          totalPoints += points;
          itemCount += count;
          breakdownHTML += `<li><strong>${item}:</strong> ${count} items × ${pointsMap[item] || 5} pts = <span style="color: var(--primary); font-weight: 700;">${points} points</span></li>`;
        }

        // Calculate rupee equivalent
        const rupeeAmount = Math.floor(totalPoints / 10);

        // Determine feedback and achievement
        let feedback = "";
        let achievement = "";
        
        if (totalPoints >= 200) {
          feedback = "🌟 Outstanding! You're a medical waste detection champion!";
          achievement = "🏆 Champion Badge Earned!";
        } else if (totalPoints >= 100) {
          feedback = "🎉 Excellent work! You're making hospitals safer.";
          achievement = "🥇 Expert Badge Earned!";
        } else if (totalPoints >= 50) {
          feedback = "👍 Great job! You're contributing to healthcare safety.";
          achievement = "🥈 Contributor Badge Earned!";
        } else {
          feedback = "📈 Good start! Keep detecting to earn more rewards.";
          achievement = "🥉 Beginner Badge Earned!";
        }

        // Save points for redemption (accumulate with previous points)
        const previousPoints = parseInt(localStorage.getItem('totalAccumulatedPoints') || '0');
        const newTotalPoints = previousPoints + totalPoints;
        localStorage.setItem('totalAccumulatedPoints', newTotalPoints.toString());

        scoreBoard.innerHTML = `
          <div class="achievement-badge">
            ${achievement}
          </div>
          
          <h3 style="color: var(--primary-dark); font-size: 1.4rem; margin-bottom: 1rem;">
            📊 Detection Breakdown
          </h3>
          <ul>${breakdownHTML}</ul>
          
          <div class="score">Session Score: ${totalPoints} pts</div>
          
          <div class="conversion-info">
            <h3>💰 Reward Conversion</h3>
            <div class="rupee-amount">₹${rupeeAmount}</div>
            <div class="conversion-rate">Exchange Rate: 10 Points = ₹1 INR</div>
            ${previousPoints > 0 ? `<div style="margin-top: 1rem; color: var(--gray-600);">Previous Balance: ${previousPoints} points<br>New Total: ${newTotalPoints} points (₹${Math.floor(newTotalPoints / 10)})</div>` : ''}
          </div>
          
          <div class="feedback">${feedback}</div>
          
          <div class="button-container">
            <button class="btn-secondary" onclick="window.location.href='detection2.html'">
              🔍 Detect More Items
            </button>
            ${totalPoints > 0 ? `
              <button class="btn-success" onclick="window.location.href='redemption2.html'">
                💰 Redeem Points (${newTotalPoints} pts available)
              </button>
            ` : ''}
          </div>
        `;
      }
    }, 1500);