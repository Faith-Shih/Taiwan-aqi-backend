import express from 'express';
import axios from 'axios'; // 新增這行

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/aqi', async (req, res) => {
    try {
        const url = 'https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=9e565f9a-84dd-4e79-9097-d403cae1ea75&limit=1000&sort=ImportDate%20desc&format=JSON';
        const response = await axios.get(url);
        const data = response.data;

        const result = data.records.map(row => ({
            sitename: row.sitename || '',
            county: row.county || '',
            aqi: row.aqi || '',
            status: row.status || '',
            publishtime: row.publishtime || '',
            longitude: row.longitude ? parseFloat(row.longitude).toFixed(6) : '',
            latitude: row.latitude ? parseFloat(row.latitude).toFixed(6) : ''
        }));

        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch air quality data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});