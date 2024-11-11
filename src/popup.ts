document.getElementById('startScraping')?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'scrapeCategories' })
            .then((response: { categoriesFourth: { name: string; sellerName: string; salePrice: string }[] }) => {
                const resultElement = document.getElementById('result');
                if (response) {
                    const { categoriesFourth } = response;

                    // Render categoriesFourth
                    let html = '<ul>';
                    categoriesFourth.forEach((product) => {
                        html += `<li>Name: ${product.name}<br>Seller: ${product.sellerName}<br>Price: ${product.salePrice}</li>`;
                    });
                    html += '</ul>';
                    resultElement!.innerHTML = html;
                } else {
                    resultElement!.innerHTML = 'No data found or an error occurred.';
                }
            })
            .catch((error: any) => {
                console.error('Error:', error);
                document.getElementById('result')!.innerHTML = 'An error occurred while scraping.';
            });
    });
});