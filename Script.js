function switchMode(role) {
    const caBox = document.getElementById("ca-metrics");
    const araBox = document.getElementById("ara-metrics");
    const caBtn = document.querySelector(".ca-btn");
    const araBtn = document.querySelector(".ara-btn");

    if(role === 'CA') {
        resetARAValues();
        caBtn.classList.add("active-mode");
        araBtn.classList.remove("active-mode");
        caBox.classList.remove("hidden");
        araBox.classList.add("hidden");
    } else if (role === 'ARA') {
        resetCAValues();
        araBtn.classList.add("active-mode");
        caBtn.classList.remove("active-mode");
        araBox.classList.remove("hidden");
        caBox.classList.add("hidden");
    }
}

function calculateCAPerformance() {
    checkMembershipPerformance();
    checkISPPerformance();
    checkTagsPerHourPerformance();
}

function calculateARAPerformance() {
    checkUtilization();
    checkTurnTime();
}

function checkMembershipPerformance() {
    const enteredMembershipValue = document.getElementById("membershipCount").value;
    const enteredHoursValue = document.getElementById("hoursInput").value;

    const greenGoal = 0.125;
    const higherYellowGoal = 0.0833;

    const performance = enteredMembershipValue / enteredHoursValue;
    membershipInput.value = performance.toFixed(3);

    if(performance >= greenGoal) {
        membershipInput.style.backgroundColor = "#3be33b";
    }

    else if(performance >= higherYellowGoal) {
        membershipInput.style.backgroundColor = "#fffb00";
    }

    else {
        membershipInput.style.backgroundColor = "#fb3b3b";
    }
}

function checkISPPerformance() {
    const enteredISPValue = document.getElementById("ISPInput").value;

    const greenGoal = 30;
    const yellowGoal = 25;

    if(enteredISPValue >= greenGoal) {
        ISPInput.style.backgroundColor = "#3be33b";
    } else if (enteredISPValue >= yellowGoal) {
        ISPInput.style.backgroundColor = "#fffb00";
    } else {
        ISPInput.style.backgroundColor = "#fb3b3b";
    }
}

function checkTagsPerHourPerformance() {
    const enteredTagValue = document.getElementById("tagInput").value;

    const greenGoal = 1.0;
    const yellowGoal = 0.9;

    if(enteredTagValue >= greenGoal) {
        tagInput.style.backgroundColor = "#3be33b";
    } else if (enteredTagValue >= yellowGoal) {
        tagInput.style.backgroundColor = "#fffb00";
    } else {
        tagInput.style.backgroundColor = "#fb3b3b";
    }
}

function decreaseHours() {
    if(hoursInput.value == 0){
        return;
    }

    hoursInput.value = hoursInput.value - 1;
}

function increaseHours() {
    let currentValue = parseInt(hoursInput.value) || 0;
    hoursInput.value = currentValue + 1;
}

function decreaseMemberships() {
    if(membershipCount.value == 0) {
        return;
    }

    membershipCount.value = membershipCount.value - 1;
}

function increaseMemberships() {
    let currentValue = parseInt(membershipCount.value) || 0;
    membershipCount.value = currentValue + 1;
}

function checkUtilization() {
    const utilization = document.getElementById("utilizationInput").value;

    const greenGoal = 77;
    const yellowGoal = 70;

    if(utilization >= greenGoal) {
        utilizationInput.style.backgroundColor = "#3be33b";
    } else if(utilization >= yellowGoal) {
        utilizationInput.style.backgroundColor = "#fffb00";
    } else {
        utilizationInput.style.backgroundColor = "#fb3b3b";
    }
}

function checkTurnTime() {
    const turnTime = document.getElementById("turnTimeInput").value;

    const greenGoal = 2;
    const yellowGoal = 3;

    if(turnTime <= greenGoal) {
        turnTimeInput.style.backgroundColor = "#3be33b";
    } else if(turnTime <= yellowGoal) {
        turnTimeInput.style.backgroundColor = "#fffb00";
    } else {
        turnTimeInput.style.backgroundColor = "#fb3b3b";
    }
}

function resetCAValues() {
    membershipInput.style.backgroundColor = "white";
    ISPInput.style.backgroundColor = "white";
    tagInput.style.backgroundColor = "white";
}

function resetARAValues() {
    utilizationInput.style.backgroundColor = "white";
    turnTimeInput.style.backgroundColor = "white";
}

// document.querySelectorAll(".question-btn").forEach(button => {
//     button.addEventListener("click", () => {

//         // close all first
//         document.querySelectorAll(".tooltip-box").forEach(t => {
//             t.style.display = "none";
//         });

//         const tooltip = button.parentElement.querySelector(".tooltip-box");

//         if (tooltip) {
//             tooltip.style.display = "flex";
//         }
//     });
// });

// 1. Function to close all tooltips
function closeAllTooltips() {
    document.querySelectorAll(".tooltip-box").forEach(t => {
        t.style.display = "none";
    });
}

// 2. Button Click Listener
document.querySelectorAll(".question-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        // This is the magic line! It stops the click from reaching the "body" 
        // and immediately triggering the close function below.
        event.stopPropagation();

        const tooltip = button.parentElement.querySelector(".tooltip-box");
        
        // Check if THIS specific tooltip is already visible
        const isVisible = tooltip && tooltip.style.display === "flex";

        // Close everything first to be safe
        closeAllTooltips();

        // If it wasn't visible before, open it now.
        // If it WAS visible, we leave it hidden (toggling it off).
        if (tooltip && !isVisible) {
            tooltip.style.display = "flex";
        }
    });
});

// 3. Global Click Listener (Click anywhere else to close)
document.addEventListener("click", () => {
    closeAllTooltips();
});