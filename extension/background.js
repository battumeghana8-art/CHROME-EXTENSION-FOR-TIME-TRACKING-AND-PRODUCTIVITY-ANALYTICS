let currentSite = "";
let startTime = Date.now();

chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs) => {

        if (tabs.length > 0 && tabs[0].url) {

            try {

                currentSite =
                    new URL(tabs[0].url).hostname;

                startTime = Date.now();

            } catch (e) {}

        }

    }
);

function saveTime() {

    if (!currentSite) return;

    const seconds =
        Math.floor(
            (Date.now() - startTime) / 1000
        );

    chrome.storage.local.get(
        [currentSite],
        (result) => {

            const old =
                result[currentSite] || 0;

            chrome.storage.local.set({
                [currentSite]:
                    old + seconds
            });

        }
    );

    startTime = Date.now();
}

chrome.tabs.onActivated.addListener(
    async (activeInfo) => {

        saveTime();

        const tab =
            await chrome.tabs.get(
                activeInfo.tabId
            );

        if (!tab.url) return;

        try {

            currentSite =
                new URL(tab.url).hostname;

        } catch (e) {}

        startTime = Date.now();
    }
);

setInterval(saveTime, 5000);