import express from 'express';
import bodyParser from 'body-parser';
import { shortenUrl } from './shared/api/shortenUrl';
import { resolveShortenedUrl } from './shared/api/resolveShortenedUrl';
import { getAllUrls } from './shared/api/getAllUrls';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Endpoint to shorten URL
app.post('/api/shorten', async (req, res) => {
    console.log("API endpoiuh")
    const originalUrl: string = req.body.url;
    const shortenedUrl: string = await shortenUrl(originalUrl);
    res.json({ shortenedUrl });
});

// Endpoint to resolve shortened URL
app.post('/api/urlResolve', async (req, res) => {
    console.log('resolve')
    console.log(req.body)
    const shortenedUrl: string = req.body.shortenedUrl;
    const originalUrl: string = await resolveShortenedUrl(shortenedUrl);
    res.json({ originalUrl });
});

// Endpoint to resolve shortened URL
app.post('/api/resolve', async (req, res) => {
    console.log('resolve')
    console.log(req.body)
    const shortenedUrl: string = req.body.shortenedUrl;
    const originalUrl: string = await resolveShortenedUrl(`http://localhost:3000/${shortenedUrl}`);
    res.json({ originalUrl });
});

// Endpoint to get all shortened URLs
app.get('/api/all', async (req, res) => {
    const urls: any[] = await getAllUrls();
    res.json({ urls });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
