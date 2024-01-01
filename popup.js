document.addEventListener('DOMContentLoaded', function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function () {
        document.getElementById('lastHourButton').addEventListener('click', onButtonClick);
        document.getElementById('last24HoursButton').addEventListener('click', onButtonClick);
        document.getElementById('last7DaysButton').addEventListener('click', onButtonClick);
        document.getElementById('last4WeeksButton').addEventListener('click', onButtonClick);
        document.getElementById('allTimeButton').addEventListener('click', onButtonClick);
        document.getElementById('historyHyperlink').addEventListener('click', onButtonClick)
    });

    function onButtonClick(event) {
        const button = event.target;
        const buttonId = button.id;

        switch (buttonId) {
            case 'lastHourButton':
                {
                    const endTime = new Date().getTime();
                    const startTime = new Date().getTime() - 60 * 60 * 1000;
                    clearHistory(endTime, startTime);
                }
                break;

            case 'last24HoursButton':
                {
                    const endTime = new Date().getTime();
                    const startTime = new Date().getTime() - 24 * 60 * 60 * 1000;
                    clearHistory(endTime, startTime);
                }
                break;

            case 'last7DaysButton':
                {
                    const endTime = new Date().getTime();
                    const startTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
                    clearHistory(endTime, startTime);
                }
                break;

            case 'last4WeeksButton':
                {
                    const endTime = new Date().getTime();
                    const startTime = new Date().getTime() - 28 * 24 * 60 * 60 * 1000;
                    clearHistory(endTime, startTime);
                }
                break;

            case 'allTimeButton':
                {
                    chrome.history.deleteAll(() => void {});
                }
                break;

                case 'historyHyperlink':
                    {
                        chrome.tabs.create({url: 'chrome://history'});
                    }
                    break;

        }
    }

    function clearHistory(endTime, startTime) {
        chrome.history.deleteRange({ endTime: endTime, startTime: startTime },
            () => void {});
    }

});