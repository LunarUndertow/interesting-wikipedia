# Interesting-Wikipedia

[Try it out](https://lunarundertow.github.io/interesting-wikipedia/)

A React app to show fun stuff from Wikipedia. Shows a random selection of articles fetched from [Unusual articles](https://en.wikipedia.org/wiki/Wikipedia:Unusual_articles) as summary cards, and lets the user to view the articles in a modal view. Uses [Axios](https://axios-http.com/), [Cheerio](https://cheerio.js.org/), [DOMPurify](https://github.com/cure53/DOMPurify/), and [html-react-parser](https://github.com/remarkablemark/html-react-parser) to fetch and process pages from the [Wikipedia API](https://en.wikipedia.org/api/rest_v1/).

At the moment the styling of the article view is very questionable, because I used DOMPurify to sanitize the fetched articles. I'm debating whether to go through the trouble of reimplementing the styling or just decide we're going to trust Wikipedia, render the articles as they are, and call it a day.