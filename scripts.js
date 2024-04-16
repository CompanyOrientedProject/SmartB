async function loadPage(page) {
    const appContainer = document.querySelector('#app');

    try {
        const response = await fetch(`${page}.html`);
        const htmlContent = await response.text();
        appContainer.innerHTML = htmlContent;

        const containsSlider = htmlContent.includes('id="blindLevelSlider"');
        if (containsSlider) {
            initializeSlider();
        }

    } catch (error) {
        console.error('Error loading page:', error);
        appContainer.innerHTML = '<p>Error loading page. Please try again later.</p>';
    }
}



function initializeSlider() {
    const blindLevelSlider = document.getElementById('blindLevelSlider');

    if (blindLevelSlider) {
        blindLevelSlider.addEventListener('input', () => {
            const value = blindLevelSlider.value;
            const blindLevelValue = document.getElementById('blindLevelValue');
            if (blindLevelValue) {
                blindLevelValue.textContent = `${value}%`;
            } else {
                console.error('Element with ID "blindLevelValue" not found.');
            }
        })
    } else {
        console.error('Element with ID "blindLevelSlider" not found.');
    }
}

function updateSlider(value) {
    const blindLevelSlider = document.getElementById('blindLevelSlider');
    const blindLevelValue = document.getElementById('blindLevelValue');

    if (blindLevelSlider && blindLevelValue) {
        blindLevelSlider.value = value; 
        blindLevelValue.textContent = `${value}%`; 
    } else {
        console.error('Slider or value element not found.');
    }
}

function closeSlider() {
    updateSlider(0);
}


function openSlider() {
    updateSlider(100);
}



function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var content = document.querySelector(".content");

    console.log(sidebar.style.display);
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "block";
        content.style.marginLeft = "200px";
    } else {
        sidebar.style.display = "none"
        content.style.marginLeft = "0";
    }
}

document.addEventListener("click", function(event) {
    var sidebar = document.getElementById("sidebar");
    var menuButton = document.querySelector(".menu-button");

    if (event.target !== sidebar && event.target !== menuButton) {
        sidebar.style.display = "none";
        document.querySelector(".content").style.marginLeft = "0";
    }
});

function updateLabel(scrollContainer, labelId) {
    const label = document.getElementById(labelId);
    if (label) {
        const scrollPercentage = (scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight)) * 100;
        const percentageValue = Math.round(scrollPercentage);
        label.textContent = `${percentageValue}%`;
    } else {
        console.error(`Label element with id "${labelId}" not found.`);
    }
}
