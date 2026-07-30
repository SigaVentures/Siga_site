# Search-engine launch checklist

The source bundle now exposes consistent canonical URLs, XML sitemaps, crawl rules, social metadata, Organization/WebSite structured data, and an IndexNow key. These are deployable technical SEO foundations; they do not by themselves force any search engine to index or rank the website.

After deploying the whole folder to `https://www.sigaventures.com/`, complete these account-level steps:

1. Verify the exact `https://www.sigaventures.com/` property in Bing Webmaster Tools and submit `https://www.sigaventures.com/sitemap-index.xml`. Yahoo search uses Bing's index, so this is the required submission path for Yahoo visibility as well.
2. In Bing Webmaster Tools, use URL Inspection to request crawling for the homepage, service pages, location pages, and the Ather case study. Confirm that Bing can fetch the canonical HTTPS URLs.
3. Submit updated URLs through IndexNow whenever a page is published or materially changed. Use the deployed `indexnow.json` values and the IndexNow endpoint; retain the key file at the site root.
4. Verify the domain in Yandex Webmaster and submit the same sitemap. For DuckDuckGo, Ecosia and many smaller engines, indexing is primarily inherited from Bing and/or Google; no separate submission is normally available.
5. Keep business name, phone number, email, website URL and category identical across Google Business Profile, Bing Places, Apple Business Connect and reputable local citations. Add the real profile URLs to the `sameAs` array in the Organization schema once available.
6. Monitor Bing Webmaster Tools for crawl errors, blocked URLs and index status after deployment. Rankings cannot be guaranteed and normally take time to change.

## IndexNow request example

Use this after deployment for a changed public URL (replace `urlList` with the changed canonical URLs):

```bash
curl -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" -d '{"host":"www.sigaventures.com","key":"e6f1a6b8c5d34954a7a9c3d2f1b8e6a4","keyLocation":"https://www.sigaventures.com/e6f1a6b8c5d34954a7a9c3d2f1b8e6a4.txt","urlList":["https://www.sigaventures.com/"]}'
```
