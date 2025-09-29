// This file contains TypeScript type definitions for the application, defining the structure of the data being handled, such as the air quality data records.

export interface AirQualityRecord {
    sitename: string;
    county: string;
    aqi: string;
    status: string;
    publishtime: string;
    longitude: string;
    latitude: string;
}

export type AirQualityData = AirQualityRecord[];