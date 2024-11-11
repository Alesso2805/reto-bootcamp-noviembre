const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

async function scrapeCategories() {
    const categoriesFourth: { name: string; sellerName: string; salePrice: string }[] = [];
    await delay(3000);
    const productElements = document.querySelectorAll('div.showcase-grid > div > .Showcase__content');
    console.log('Product elements found:', productElements.length);

    productElements.forEach(el => {
        const nameElement = el.querySelector('.Showcase__name');
        const sellerNameElement = el.querySelector('.Showcase__SellerName');
        const salePriceElement = el.querySelector('.Showcase__salePrice');

        const name = nameElement ? nameElement.textContent!.trim() : 'No name';
        const sellerName = sellerNameElement ? sellerNameElement.textContent!.trim() : 'No seller';
        const salePrice = salePriceElement ? salePriceElement.textContent!.trim() : 'No price';

        console.log('Product details:', { name, sellerName, salePrice });

        categoriesFourth.push({ name, sellerName, salePrice });
    });

    return { categoriesFourth };
}

chrome.runtime.onMessage.addListener((request: any, _sender: any, sendResponse: any) => {
    if (request.action === 'scrapeCategories') {
        scrapeCategories().then(data => {
            console.log('Scraped data:', data);
            sendResponse(data);
        });
        return true; // Keep the message channel open for sendResponse
    }
});