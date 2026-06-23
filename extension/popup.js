const stats = document.getElementById("stats");

chrome.storage.local.get(null, (data) => {

    let html = "";
    let totalSeconds = 0;

    let productiveSeconds = 0;
    let unproductiveSeconds = 0;

    const productiveSites = [
        "github.com",
        "chatgpt.com",
        "leetcode.com",
        "stackoverflow.com"
    ];

    const unproductiveSites = [
        "youtube.com",
        "instagram.com",
        "facebook.com",
        "tiktok.com"
    ];

    for (let site in data) {

        const seconds = data[site];

        totalSeconds += seconds;

        if (productiveSites.includes(site)) {
            productiveSeconds += seconds;
        }

        if (unproductiveSites.includes(site)) {
            unproductiveSeconds += seconds;
        }

        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        html += `
        <div class="site-card">
            <div class="site-name">
                ${site}
            </div>

            <div class="site-time">
                ${mins} min ${secs} sec
            </div>
        </div>
        `;
    }

    stats.innerHTML = html;

    document.getElementById("score").innerHTML =
        `Total Time: ${Math.floor(totalSeconds / 60)} mins`;

    document.getElementById("productiveTime").innerHTML =
        `Productive Time: ${Math.floor(productiveSeconds / 60)} mins`;

    document.getElementById("unproductiveTime").innerHTML =
        `Unproductive Time: ${Math.floor(unproductiveSeconds / 60)} mins`;

    let productivityScore = 0;

    if (totalSeconds > 0) {
        productivityScore =
            Math.round(
                (productiveSeconds / totalSeconds) * 100
            );
    }

    document.getElementById("productivityScore").innerHTML =
        `Productivity Score: ${productivityScore}%`;
});

document
    .getElementById("resetBtn")
    .addEventListener("click", () => {

        chrome.storage.local.clear(() => {

            alert("Data Reset Successfully");

            location.reload();
        });

    });